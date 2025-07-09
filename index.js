const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 5001;

// Enable CORS for React Native
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import models
const User = require('./models/User');
const Fingerprint = require('./models/Fingerprint');
const FingerprintLog = require('./models/AuthenticationLog');

// Import fingerprint processor
const FingerprintProcessor = require('./utils/fingerprintProcessor');

// Initialize fingerprint processor
const fingerprintProcessor = new FingerprintProcessor();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://minjugattokim123:5yugYeJ9i7X09ZL9@cluster0.gdkazez.mongodb.net/biometrics?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Basic routes for User management

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  try {
    console.log('Creating user with data:', JSON.stringify(req.body, null, 2));
    const user = new User(req.body);
    await user.save();
    console.log('User created successfully:', user.email);
    res.status(201).json(user);
  } catch (error) {
    console.log('Error creating user:', error.message);
    console.log('Error code:', error.code);
    console.log('Error details:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user (soft delete)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ FINGERPRINT AUTHENTICATION ROUTES ============

// Register a fingerprint for a user
app.post('/api/fingerprint/register', async (req, res) => {
  try {
    const { userId, fingerprintImage, fingerPosition } = req.body;

    // Validate required fields
    if (!userId || !fingerprintImage || !fingerPosition) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, fingerprintImage (base64), and fingerPosition' 
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has a fingerprint registered
    const existingFingerprint = await Fingerprint.findOne({ userId, isActive: true });
    if (existingFingerprint) {
      return res.status(400).json({ 
        error: 'User already has a fingerprint registered. Only one fingerprint per user is allowed.' 
      });
    }

    // Process fingerprint image and generate template
    const processingResult = fingerprintProcessor.processForEnrollment(fingerprintImage, {
      fingerPosition,
      userId: userId.toString()
    });

    if (!processingResult.success) {
      return res.status(400).json({ 
        error: `Fingerprint processing failed: ${processingResult.error}`,
        quality: processingResult.quality
      });
    }

    // Create fingerprint record with biometric template
    const fingerprint = new Fingerprint({
      userId,
      fingerprintTemplate: processingResult.template,
      fingerprintImage, // Store original base64 image (optional)
      fingerPosition,
      qualityScore: processingResult.quality,
    });

    await fingerprint.save();

    // Enable fingerprint auth for user
    user.fingerprintEnabled = true;
    await user.save();

    res.status(201).json({
      message: 'Fingerprint registered successfully',
      fingerprintId: fingerprint._id,
      fingerPosition,
      quality: processingResult.quality,
      templateInfo: {
        version: processingResult.template.version,
        algorithm: processingResult.template.algorithm,
        minutiaeCount: processingResult.template.minutiaeCount
      }
    });
  } catch (error) {
    console.error('Fingerprint registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Authenticate with fingerprint
app.post('/api/fingerprint/authenticate', async (req, res) => {
  const startTime = Date.now();
  let authResult = 'failure';
  let failureReason = null;
  let matchedFingerprint = null;

  try {
    const { userId, fingerprintImage, fingerPosition } = req.body;

    // Validate required fields
    if (!userId || !fingerprintImage) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId and fingerprintImage (base64)' 
      });
    }

    // Find user's single fingerprint
    const userFingerprint = await Fingerprint.findOne({ userId, isActive: true });
    if (!userFingerprint) {
      failureReason = 'template_not_found';

      // Log failed attempt
      await new FingerprintLog({
        userId,
        fingerprintId: null,
        authenticationResult: 'failure',
        failureReason,
        fingerprintData: {
          fingerPosition: fingerPosition || 'unknown',
          processingTime: Date.now() - startTime,
          attempts: 1,
        },
        location: {
          ipAddress: req.ip || req.connection.remoteAddress,
          timestamp: new Date(),
        },
      }).save();

      return res.status(404).json({ error: 'No fingerprint registered for this user' });
    }

    // Process input fingerprint and compare with stored template
    const authResult = fingerprintProcessor.processForAuthentication(
      fingerprintImage, 
      userFingerprint.fingerprintTemplate
    );

    if (!authResult.success) {
      failureReason = 'processing_error';

      // Log failed attempt
      await new FingerprintLog({
        userId,
        fingerprintId: userFingerprint._id,
        authenticationResult: 'failure',
        failureReason,
        fingerprintData: {
          fingerPosition: fingerPosition || userFingerprint.fingerPosition,
          processingTime: Date.now() - startTime,
          attempts: 1,
        },
        location: {
          ipAddress: req.ip || req.connection.remoteAddress,
          timestamp: new Date(),
        },
        notes: authResult.error
      }).save();

      return res.status(500).json({ 
        error: `Authentication processing failed: ${authResult.error}` 
      });
    }

    // Check if fingerprint matches
    if (authResult.authenticated) {
      matchedFingerprint = userFingerprint;
      // Authentication successful
      authResult = 'success';
      await matchedFingerprint.recordUsage();

      // Update user's last fingerprint auth
      await User.findByIdAndUpdate(userId, {
        lastFingerprintAuth: new Date(),
      });

      // Log successful attempt
      await new FingerprintLog({
        userId,
        fingerprintId: matchedFingerprint._id,
        authenticationResult: 'success',
        fingerprintData: {
          fingerPosition: fingerPosition || matchedFingerprint.fingerPosition,
          processingTime: Date.now() - startTime,
          attempts: 1,
        },
        location: {
          ipAddress: req.ip || req.connection.remoteAddress,
          timestamp: new Date(),
        },
        notes: `Match score: ${authResult.score}, Confidence: ${authResult.confidence}`
      }).save();

      res.json({
        success: true,
        message: 'Fingerprint authentication successful',
        userId,
        fingerPosition: matchedFingerprint.fingerPosition,
        lastUsed: matchedFingerprint.lastUsed,
        matchDetails: {
          score: authResult.score,
          confidence: authResult.confidence,
          quality: authResult.quality,
          method: authResult.details?.method || 'biometric_comparison'
        }
      });
    } else {
      failureReason = 'fingerprint_mismatch';

      // Log failed attempt
      await new FingerprintLog({
        userId,
        fingerprintId: userFingerprint._id,
        authenticationResult: 'failure',
        failureReason,
        fingerprintData: {
          fingerPosition: fingerPosition || userFingerprint.fingerPosition,
          processingTime: Date.now() - startTime,
          attempts: 1,
        },
        location: {
          ipAddress: req.ip || req.connection.remoteAddress,
          timestamp: new Date(),
        },
        notes: `Match score: ${authResult.score}, Confidence: ${authResult.confidence}, Quality: ${authResult.quality}`
      }).save();

      res.status(401).json({
        success: false,
        error: 'Fingerprint authentication failed',
        details: {
          score: authResult.score,
          confidence: authResult.confidence,
          quality: authResult.quality,
          threshold: 0.7,
          reason: 'Biometric match score below threshold'
        }
      });
    }
  } catch (error) {
    console.error('Fingerprint authentication error:', error);
    
    // Log error
    if (matchedFingerprint) {
      await new FingerprintLog({
        userId: req.body.userId,
        fingerprintId: matchedFingerprint._id,
        authenticationResult: 'failure',
        failureReason: 'device_error',
        fingerprintData: {
          fingerPosition: req.body.fingerPosition || 'unknown',
          processingTime: Date.now() - startTime,
          attempts: 1,
        },
        location: {
          ipAddress: req.ip || req.connection.remoteAddress,
          timestamp: new Date(),
        },
        notes: error.message,
      }).save();
    }

    res.status(500).json({ 
      error: 'Internal server error during authentication',
      details: error.message 
    });
  }
});

// Get user's registered fingerprints
app.get('/api/users/:id/fingerprints', async (req, res) => {
  try {
    const fingerprints = await Fingerprint.findByUser(req.params.id);

    // Return only safe information (not the actual template)
    const safeFingerprints = fingerprints.map((fp) => ({
      id: fp._id,
      fingerPosition: fp.fingerPosition,
      registrationDate: fp.registrationDate,
      lastUsed: fp.lastUsed,
      usageCount: fp.usageCount,
      isActive: fp.isActive,
    }));

    res.json(safeFingerprints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete/disable a fingerprint
app.delete('/api/fingerprint/:id', async (req, res) => {
  try {
    const fingerprint = await Fingerprint.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!fingerprint) {
      return res.status(404).json({ error: 'Fingerprint not found' });
    }

    // Check if user has any active fingerprints left
    const activeFingerprints = await Fingerprint.find({
      userId: fingerprint.userId,
      isActive: true,
    });

    // If no active fingerprints, disable fingerprint auth for user
    if (activeFingerprints.length === 0) {
      await User.findByIdAndUpdate(fingerprint.userId, {
        fingerprintEnabled: false,
      });
    }

    res.json({ message: 'Fingerprint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fingerprint authentication logs for a user
app.get('/api/users/:id/fingerprint-logs', async (req, res) => {
  try {
    const logs = await FingerprintLog.find({ userId: req.params.id })
      .populate('fingerprintId', 'fingerPosition registrationDate')
      .sort({ 'location.timestamp': -1 })
      .limit(100);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fingerprint authentication statistics
app.get('/api/users/:id/fingerprint-stats', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const stats = await FingerprintLog.getFingerprintStats(req.params.id, days);

    // Also get recent failed attempts
    const failedAttempts = await FingerprintLog.findFailedAttemptsForUser(req.params.id, 24);

    res.json({
      stats,
      recentFailedAttempts: failedAttempts.length,
      period: `${days} days`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ END FINGERPRINT ROUTES ============

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Biometrics App API - Fingerprint Authentication Only',
    endpoints: {
      // User management
      users: '/api/users',
      user_by_id: '/api/users/:id',
      create_user: 'POST /api/users',
      update_user: 'PUT /api/users/:id',
      delete_user: 'DELETE /api/users/:id',

      // Fingerprint authentication
      fingerprint_register: 'POST /api/fingerprint/register',
      fingerprint_auth: 'POST /api/fingerprint/authenticate',
      user_fingerprints: '/api/users/:id/fingerprints',
      delete_fingerprint: 'DELETE /api/fingerprint/:id',

      // Fingerprint logs and stats
      fingerprint_logs: '/api/users/:id/fingerprint-logs',
      fingerprint_stats: '/api/users/:id/fingerprint-stats',
    },
    note: 'This API only supports fingerprint authentication. All other authentication methods have been removed.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

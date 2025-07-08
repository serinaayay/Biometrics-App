const User = require('./models/User');
const Fingerprint = require('./models/Fingerprint');

// Example of fingerprint authentication workflow

async function fingerprintAuthExample() {
  try {
    // 1. First, create a user (or use existing user ID)
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+63 912 345 6789',
      gender: 'Male',
      dateOfBirth: new Date('1990-01-01'),
      placeOfBirth: 'Manila',
      nationality: 'Filipino',
      maritalStatus: 'Single',
      temporaryAddress: '123 Sample Street, Manila',
      permanentAddress: '123 Sample Street, Manila',
      educationalAttainment: "Bachelor's Degree",
      degree: 'Information Technology',
      university: 'Sample University',
      skills: ['JavaScript', 'React'],
      currentJobTitle: 'Software Developer',
      workExperience: 5,
      sssNumber: '1234567890',
      isVerified: true,
    });

    await user.save();
    console.log('User created:', user.fullName);

    // 2. Register a fingerprint
    const fingerprint = new Fingerprint({
      userId: user._id,
      fingerprintTemplate: 'sample_fingerprint_hash_123abc', // In real app, this would be biometric data
      fingerPosition: 'rightIndex',
    });

    await fingerprint.save();

    // Enable fingerprint auth for user
    user.fingerprintEnabled = true;
    await user.save();

    console.log('Fingerprint registered for:', fingerprint.fingerPosition);

    // 3. Simulate fingerprint authentication
    const authResult = await authenticateFingerprint(
      user._id,
      'sample_fingerprint_hash_123abc',
      'rightIndex'
    );

    console.log('Authentication result:', authResult);

    return { user, fingerprint, authResult };
  } catch (error) {
    console.error('Error in fingerprint example:', error.message);
  }
}

// Simple fingerprint authentication function
async function authenticateFingerprint(userId, templateToMatch, fingerPosition) {
  try {
    // Find user's fingerprints
    const fingerprints = await Fingerprint.findByUser(userId);

    if (fingerprints.length === 0) {
      return { success: false, message: 'No fingerprints registered' };
    }

    // Find matching fingerprint
    const match = fingerprints.find(
      (fp) => fp.fingerprintTemplate === templateToMatch && fp.fingerPosition === fingerPosition
    );

    if (match) {
      // Record usage
      await match.recordUsage();

      // Update user's last auth
      await User.findByIdAndUpdate(userId, {
        lastFingerprintAuth: new Date(),
      });

      return {
        success: true,
        message: 'Authentication successful',
        fingerPosition: match.fingerPosition,
        usageCount: match.usageCount,
      };
    } else {
      return { success: false, message: 'Fingerprint does not match' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Function to get user's fingerprint status
async function getUserFingerprintStatus(userId) {
  try {
    const user = await User.findById(userId);
    const fingerprints = await Fingerprint.findByUser(userId);

    return {
      userId: user._id,
      name: user.fullName,
      fingerprintEnabled: user.fingerprintEnabled,
      lastFingerprintAuth: user.lastFingerprintAuth,
      registeredFingerprints: fingerprints.map((fp) => ({
        id: fp._id,
        position: fp.fingerPosition,
        registrationDate: fp.registrationDate,
        usageCount: fp.usageCount,
        lastUsed: fp.lastUsed,
      })),
    };
  } catch (error) {
    console.error('Error getting fingerprint status:', error.message);
    return null;
  }
}

module.exports = {
  fingerprintAuthExample,
  authenticateFingerprint,
  getUserFingerprintStatus,
};

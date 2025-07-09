/**
 * Fingerprint Biometric System Example
 * Demonstrates how to use the new biometric algorithms with base64 processing
 */

const FingerprintProcessor = require('../utils/fingerprintProcessor');

// Example usage of the fingerprint processor
async function demonstrateFingerprintProcessing() {
  const processor = new FingerprintProcessor();
  
  console.log('🔬 Fingerprint Biometric System Demo\n');

  // Example base64 fingerprint image (this would come from your camera/scanner)
  // In real usage, you'd get this from FingerprintHelper.captureFingerprint()
  const exampleBase64 = createExampleBase64Image();
  
  console.log('📸 Processing fingerprint image...');
  
  try {
    // Step 1: Process fingerprint for enrollment
    console.log('\n1️⃣ ENROLLMENT PROCESS');
    const enrollmentResult = processor.processForEnrollment(exampleBase64, {
      fingerPosition: 'rightIndex',
      userId: 'user123'
    });

    if (enrollmentResult.success) {
      console.log('✅ Enrollment successful!');
      console.log(`   Quality Score: ${enrollmentResult.quality.toFixed(2)}`);
      console.log(`   Template Version: ${enrollmentResult.template.version}`);
      console.log(`   Algorithm: ${enrollmentResult.template.algorithm}`);
      console.log(`   Minutiae Count: ${enrollmentResult.template.minutiaeCount}`);
      
      // Store this template in your database
      const storedTemplate = enrollmentResult.template;
      
      // Step 2: Simulate authentication with same fingerprint
      console.log('\n2️⃣ AUTHENTICATION PROCESS (Same fingerprint)');
      const authResult1 = processor.processForAuthentication(exampleBase64, storedTemplate);
      
      if (authResult1.success) {
        console.log(`✅ Authentication: ${authResult1.authenticated ? 'SUCCESS' : 'FAILED'}`);
        console.log(`   Match Score: ${authResult1.score.toFixed(2)}`);
        console.log(`   Confidence: ${authResult1.confidence}`);
        console.log(`   Quality: ${authResult1.quality.toFixed(2)}`);
      }
      
      // Step 3: Simulate authentication with different fingerprint
      console.log('\n3️⃣ AUTHENTICATION PROCESS (Different fingerprint)');
      const differentFingerprint = createDifferentExampleBase64();
      const authResult2 = processor.processForAuthentication(differentFingerprint, storedTemplate);
      
      if (authResult2.success) {
        console.log(`❌ Authentication: ${authResult2.authenticated ? 'SUCCESS' : 'FAILED'}`);
        console.log(`   Match Score: ${authResult2.score.toFixed(2)}`);
        console.log(`   Confidence: ${authResult2.confidence}`);
        console.log(`   Quality: ${authResult2.quality.toFixed(2)}`);
      }
      
      // Step 4: Display template details
      console.log('\n4️⃣ TEMPLATE ANALYSIS');
      console.log('Template Structure:');
      console.log(`   Hash: ${storedTemplate.hash.substring(0, 16)}...`);
      console.log(`   Signature: ${storedTemplate.signature.substring(0, 16)}...`);
      console.log(`   Created: ${storedTemplate.createdAt}`);
      console.log(`   Minutiae Sample:`, storedTemplate.minutiae.slice(0, 3));
      
    } else {
      console.log('❌ Enrollment failed:', enrollmentResult.error);
    }
    
  } catch (error) {
    console.error('❌ Processing error:', error.message);
  }
  
  console.log('\n📊 System Features:');
  console.log('   ✅ Device fingerprint hardware integration');
  console.log('   ✅ Secure fingerprint identifier generation');
  console.log('   ✅ Quality scoring');
  console.log('   ✅ Template generation with integrity protection');
  console.log('   ✅ Fingerprint matching with confidence levels');
  console.log('   ✅ One fingerprint per user enforcement');
  console.log('   ✅ Support for fingerprint only');
  console.log('   ✅ Hardware-backed security');
}

// Example React Native usage
function exampleReactNativeUsage() {
  console.log('\n📱 REACT NATIVE USAGE EXAMPLE:\n');
  
  const reactNativeCode = `
import FingerprintHelper from '../utils/fingerprintHelper';

// Initialize the helper
const fingerprintHelper = new FingerprintHelper('http://your-server:5001');

// Enroll a user's fingerprint
async function enrollUser(userId) {
  try {
    const result = await fingerprintHelper.enrollFingerprint(userId, 'rightIndex');
    
    if (result.success) {
      Alert.alert('Success', 'Fingerprint enrolled successfully!');
      console.log('Quality:', result.data.quality);
    } else {
      Alert.alert('Error', result.error);
    }
  } catch (error) {
    Alert.alert('Error', 'Enrollment failed');
  }
}

// Authenticate a user
async function authenticateUser(userId) {
  try {
    const result = await fingerprintHelper.authenticateUser(userId);
    
    if (result.success && result.authenticated) {
      Alert.alert('Success', 'Authentication successful!');
      console.log('Match Score:', result.matchDetails.score);
      console.log('Confidence:', result.matchDetails.confidence);
    } else {
      Alert.alert('Failed', 'Authentication failed');
      console.log('Details:', result.details);
    }
  } catch (error) {
    Alert.alert('Error', 'Authentication error');
  }
}

// Manual fingerprint enrollment
async function manualEnrollment(userId) {
  // Step 1: Check fingerprint support
  const support = await fingerprintHelper.checkFingerprintSupport();
  
  if (!support.isReady) {
    Alert.alert('Error', 'Fingerprint authentication not available');
    return;
  }
  
  // Step 2: Authenticate with device fingerprint
  const authResult = await fingerprintHelper.promptFingerprintAuthentication('enrollment');
  
  if (authResult.success) {
    // Step 3: Register with backend
    const registerResult = await fingerprintHelper.registerFingerprint(
      userId,
      authResult.fingerprint.id,
      'rightIndex',
      authResult.fingerprint.deviceInfo
    );
    
    if (registerResult.success) {
      console.log('Registration successful!');
      console.log('Template info:', registerResult.data.templateInfo);
      console.log('Fingerprint type:', authResult.fingerprint.type);
    }
  }
}
  `;
  
  console.log(reactNativeCode);
}

// API Endpoints example
function exampleAPIUsage() {
  console.log('\n🌐 API ENDPOINTS USAGE:\n');
  
  const apiExamples = `
# 1. Register a fingerprint
POST /api/fingerprint/register
{
  "userId": "user123",
  "fingerprintImage": "secure_fingerprint_identifier_here",
  "fingerPosition": "rightIndex",
  "deviceInfo": {
    "biometricType": "fingerprint",
    "hasFingerprint": true,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}

Response:
{
  "message": "Fingerprint registered successfully",
  "fingerprintId": "603c...",
  "fingerPosition": "rightIndex",
  "quality": 0.87,
  "templateInfo": {
    "version": "1.0",
    "algorithm": "simplified_minutiae",
    "minutiaeCount": 34
  }
}

# 2. Authenticate with fingerprint
POST /api/fingerprint/authenticate
{
  "userId": "user123",
  "fingerprintImage": "secure_fingerprint_identifier_here"
}

Response (Success):
{
  "success": true,
  "message": "Fingerprint authentication successful",
  "userId": "user123",
  "fingerPosition": "rightIndex",
  "matchDetails": {
    "score": 0.95,
    "confidence": "very_high",
    "quality": 0.88,
    "method": "biometric_comparison"
  }
}

Response (Failure):
{
  "success": false,
  "error": "Fingerprint authentication failed",
  "details": {
    "score": 0.45,
    "confidence": "low",
    "quality": 0.82,
    "threshold": 0.7,
    "reason": "Biometric match score below threshold"
  }
}

# 3. Get user fingerprints
GET /api/users/:userId/fingerprints

Response:
[
  {
    "id": "603c...",
    "fingerPosition": "rightIndex",
    "registrationDate": "2024-01-15T10:30:00.000Z",
    "lastUsed": "2024-01-16T14:22:00.000Z",
    "usageCount": 5,
    "isActive": true
  }
]
  `;
  
  console.log(apiExamples);
}

// Helper functions to create example data
function createExampleBase64Image() {
  // Create a simple base64 image for demonstration
  // In real usage, this comes from camera/scanner
  const canvas = Buffer.alloc(100);
  canvas.fill('example_fingerprint_data_12345');
  return canvas.toString('base64');
}

function createDifferentExampleBase64() {
  // Create a different base64 image for comparison
  const canvas = Buffer.alloc(100);
  canvas.fill('different_fingerprint_data_67890');
  return canvas.toString('base64');
}

// Required dependencies for React Native
function showRequiredDependencies() {
  console.log('\n📦 REQUIRED DEPENDENCIES:\n');
  
  const dependencies = `
# Install these packages in your React Native project:

npm install expo-local-authentication

# For the backend:
npm install mongoose express crypto

# Package.json additions:
{
  "dependencies": {
    "expo-local-authentication": "~13.4.1"
  }
}
  `;
  
  console.log(dependencies);
}

// Main demo function
async function runDemo() {
  console.log('🚀 Starting Fingerprint Biometric System Demo...\n');
  
  await demonstrateFingerprintProcessing();
  exampleReactNativeUsage();
  exampleAPIUsage();
  showRequiredDependencies();
  
  console.log('\n✨ Demo completed! Your biometric system is ready to use.');
  console.log('\n🔧 Next Steps:');
  console.log('   1. Install required dependencies');
  console.log('   2. Start your MongoDB server');
  console.log('   3. Run your backend: node index.js');
  console.log('   4. Use FingerprintHelper in your React Native app');
  console.log('   5. For production: Replace simulation with real image processing library');
}

// Export for use
module.exports = {
  demonstrateFingerprintProcessing,
  exampleReactNativeUsage,
  exampleAPIUsage,
  runDemo
};

// Run demo if called directly
if (require.main === module) {
  runDemo().catch(console.error);
} 
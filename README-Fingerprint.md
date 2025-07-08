# Fingerprint Authentication System

**Simplified fingerprint-only authentication** for the Biometrics App. This system ONLY supports fingerprint authentication - all other authentication methods have been removed.

## Overview

The fingerprint authentication system consists of:
- **User Model**: Extended with `fingerprintEnabled` and `lastFingerprintAuth` fields
- **Fingerprint Model**: Stores fingerprint templates linked to users
- **FingerprintLog Model**: Logs all authentication attempts with details
- **API Endpoints**: For registration, authentication, and logging

## Models

### User Schema (updated)
```javascript
{
    // ... existing user fields ...
    fingerprintEnabled: Boolean (default: false),
    lastFingerprintAuth: Date
}
```

### Fingerprint Schema
```javascript
{
    userId: ObjectId (ref: User),
    fingerprintTemplate: String, // Stored as hash/encoded string
    fingerPosition: String, // rightThumb, rightIndex, etc.
    isActive: Boolean,
    registrationDate: Date,
    lastUsed: Date,
    usageCount: Number
}
```

### FingerprintLog Schema
```javascript
{
    userId: ObjectId (ref: User),
    fingerprintId: ObjectId (ref: Fingerprint),
    authenticationResult: String, // 'success' or 'failure'
    failureReason: String, // if failed: fingerprint_mismatch, template_not_found, etc.
    fingerprintData: {
        fingerPosition: String,
        processingTime: Number,
        attempts: Number
    },
    deviceInfo: {
        deviceId: String,
        deviceType: String,
        userAgent: String
    },
    location: {
        ipAddress: String,
        timestamp: Date
    },
    securityFlags: {
        suspiciousActivity: Boolean,
        newDevice: Boolean
    }
}
```

## API Endpoints

### Base URL: `http://localhost:5001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/fingerprint/register` | Register a fingerprint |
| POST | `/api/fingerprint/authenticate` | Authenticate with fingerprint |
| GET | `/api/users/:id/fingerprints` | Get user's fingerprints |
| DELETE | `/api/fingerprint/:id` | Delete/disable a fingerprint |
| GET | `/api/users/:id/fingerprint-logs` | Get authentication logs |
| GET | `/api/users/:id/fingerprint-stats` | Get authentication statistics |

## Usage Examples

### 1. Create a User First
```bash
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+63 912 345 6789",
    "gender": "Male",
    "dateOfBirth": "1990-01-01",
    "placeOfBirth": "Manila",
    "nationality": "Filipino",
    "maritalStatus": "Single",
    "temporaryAddress": "123 Sample Street",
    "permanentAddress": "123 Sample Street",
    "educationalAttainment": "Bachelor'\''s Degree",
    "degree": "Information Technology",
    "university": "Sample University",
    "skills": ["JavaScript"],
    "currentJobTitle": "Developer",
    "workExperience": 5,
    "sssNumber": "1234567890"
  }'
```

### 2. Register a Fingerprint
```bash
curl -X POST http://localhost:5001/api/fingerprint/register \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_FROM_STEP_1",
    "fingerprintTemplate": "sample_fingerprint_hash_123abc",
    "fingerPosition": "rightIndex"
  }'
```

### 3. Authenticate with Fingerprint
```bash
curl -X POST http://localhost:5001/api/fingerprint/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "fingerprintTemplate": "sample_fingerprint_hash_123abc",
    "fingerPosition": "rightIndex"
  }'
```

### 4. Get User's Fingerprints
```bash
curl http://localhost:5001/api/users/USER_ID/fingerprints
```

### 5. Delete a Fingerprint
```bash
curl -X DELETE http://localhost:5001/api/fingerprint/FINGERPRINT_ID
```

### 6. Get Authentication Logs
```bash
curl http://localhost:5001/api/users/USER_ID/fingerprint-logs
```

### 7. Get Authentication Statistics
```bash
curl http://localhost:5001/api/users/USER_ID/fingerprint-stats?days=30
```

## Finger Positions

The system supports these finger positions:
- `rightThumb`, `rightIndex`, `rightMiddle`, `rightRing`, `rightPinky`
- `leftThumb`, `leftIndex`, `leftMiddle`, `leftRing`, `leftPinky`

## Response Examples

### Successful Registration
```json
{
  "message": "Fingerprint registered successfully",
  "fingerprintId": "664c7892d312cf207ed5f554",
  "fingerPosition": "rightIndex"
}
```

### Successful Authentication
```json
{
  "success": true,
  "message": "Fingerprint authentication successful",
  "userId": "664c7892d312cf207ed5f555",
  "fingerPosition": "rightIndex",
  "lastUsed": "2024-01-15T10:30:00.000Z"
}
```

### Failed Authentication
```json
{
  "success": false,
  "error": "Fingerprint authentication failed"
}
```

### User's Fingerprints List
```json
[
  {
    "id": "664c7892d312cf207ed5f554",
    "fingerPosition": "rightIndex",
    "registrationDate": "2024-01-15T09:00:00.000Z",
    "lastUsed": "2024-01-15T10:30:00.000Z",
    "usageCount": 5,
    "isActive": true
  }
]
```

## Security Notes

⚠️ **Important**: This is a simplified implementation for demonstration. In a production environment:

1. **Use proper biometric algorithms** instead of simple string comparison
2. **Encrypt fingerprint templates** before storing
3. **Implement rate limiting** to prevent brute force attacks
4. **Add proper error handling** and logging
5. **Use HTTPS** for all communications
6. **Implement proper session management**

## How It Works

1. **Registration**: User provides fingerprint data, system stores it as a template linked to their user ID
2. **Authentication**: User provides fingerprint, system compares against stored templates
3. **Matching**: Simple string comparison (in production, use biometric matching algorithms)
4. **Tracking**: System tracks usage count and last used timestamp

## Testing with Sample Data

Use the `fingerprintExample.js` file to test the system:

```javascript
const { fingerprintAuthExample } = require('./fingerprintExample');

// Run the example (make sure server is running and DB is connected)
fingerprintAuthExample();
```

## Starting the Server

```bash
# Install dependencies
npm install express mongoose

# Start the server
node index.js
```

The server will connect to MongoDB and run on port 5001.

## Features

- ✅ **Fingerprint-only authentication** (all other methods removed)
- ✅ Simple fingerprint registration
- ✅ Basic authentication with logging
- ✅ Multiple fingerprints per user
- ✅ Usage tracking and statistics
- ✅ Comprehensive authentication logging
- ✅ Failed attempt tracking
- ✅ Device and location logging
- ✅ Soft delete functionality
- ✅ Position-specific matching
- ✅ Auto-enable/disable fingerprint auth

This simplified system focuses exclusively on fingerprint authentication and provides comprehensive logging for security monitoring. 
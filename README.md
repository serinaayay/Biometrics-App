# Biometrics Authentication App

A React Native application with biometric authentication capabilities, including email/password login and fingerprint authentication.

## Features

- **User Registration**: Complete user registration with personal, educational, and employment information
- **Email/Password Authentication**: Login system that checks credentials against MongoDB
- **Fingerprint Authentication**: Biometric login using device fingerprint sensors
- **User Profile Management**: Complete user profile with verification status
- **MongoDB Integration**: Secure data storage with proper user management

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **MongoDB** (running locally or remotely)
- **Expo CLI** (`npm install -g expo-cli`)
- **React Native development environment** (for iOS/Android)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Biometrics-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional dependencies for backend**
   ```bash
   npm install cors
   ```

## Setup

### 1. MongoDB Setup

1. **Start MongoDB service**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

2. **Create the database** (MongoDB will create it automatically when first used)
   - Database name: `biometrics-app`
   - Collections: `regis`, `users`, `fingerprints`

### 2. Backend Server Setup

1. **Start the backend server**
   ```bash
   npm run server
   ```

2. **Verify server is running**
   - Server should start on `http://0.0.0.0:5001`
   - Check health endpoint: `http://localhost:5001/health`

### 3. Mobile App Setup

1. **Update IP address** (if needed)
   - If running on a physical device, update the IP address in:
   - `screens/Login.tsx`
   - `screens/InfoRegister.tsx`
   - `screens/SignUp2.tsx`
   - `screens/Fingerprint.tsx`
   - Change `192.168.68.146` to your computer's IP address

2. **Start the Expo development server**
   ```bash
   npm start
   ```

## Usage

### Registration Process

1. **Initial Registration**
   - Open the app and tap "Sign Up"
   - Enter email, password, and confirm password
   - This creates an entry in the `registers` collection with IP tracking

2. **Personal Information**
   - Fill in personal details (name, phone, address, etc.)
   - This information is stored in the `users` collection

3. **Educational & Employment Information**
   - Complete educational background
   - Add employment details and skills

4. **Fingerprint Registration**
   - Register fingerprint for biometric authentication
   - Fingerprint data is stored in the `fingerprints` collection

### Login Process

1. **Email/Password Login**
   - Enter registered email and password
   - System checks credentials against the `registers` collection in MongoDB
   - Validates account is active (isActive: true)
   - Password is hashed using the same method as registration
   - On successful login, user is redirected to the Profile Screen

2. **Fingerprint Authentication**
   - Use registered fingerprint for quick login
   - Biometric authentication using device sensors
   - Matches against stored fingerprint templates

## API Endpoints

The backend server provides the following endpoints:

### Authentication
- `POST /api/login` - User login with email/password
- `POST /api/register` - User registration

### User Management
- `POST /api/users` - Save user profile data
- `GET /api/users/:userId/fingerprints` - Get user's registered fingerprints

### Fingerprint Authentication
- `POST /api/fingerprint/register` - Register new fingerprint
- `POST /api/fingerprint/authenticate` - Authenticate with fingerprint

### Health Check
- `GET /health` - Server health status

## Database Schema

### Registers Collection (Authentication)
```javascript
{
  email1: String (unique, lowercase, trimmed),
  password: String (hashed, trimmed),
  confirmPassword: String (hashed, trimmed),
  isActive: Boolean (default: true),
  registrationIP: String (tracks registration IP),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Users Collection (Profile Data)
```javascript
{
  fullName: String,
  email: String,
  phoneNumber: String,
  // ... other personal information
  isVerified: Boolean,
  isActive: Boolean,
  registrationDate: Date
}
```

### Fingerprints Collection (Biometric Data)
```javascript
{
  userId: String,
  fingerprintImage: String,
  fingerPosition: String,
  deviceInfo: Object,
  isActive: Boolean,
  usageCount: Number
}
```

## Security Features

- **Password Hashing**: Passwords are hashed using Base64 encoding with salt
- **Input Validation**: All user inputs are validated on both client and server
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Secure API**: CORS-enabled API with proper error responses

## Development

### Running in Development Mode

1. **Start MongoDB**
2. **Start Backend Server**: `npm run server`
3. **Start Expo Dev Server**: `npm start`
4. **Open on Device**: Scan QR code or use simulator

### Testing Login

1. **Create a test user**:
   - Go through the registration process
   - Complete all steps to create a user in the database

2. **Test login**:
   - Use the registered email and password
   - Verify successful authentication and navigation

### Common Issues

1. **Connection Issues**:
   - Ensure MongoDB is running
   - Check if backend server is accessible
   - Verify IP address configuration for physical devices

2. **Authentication Errors**:
   - Check password hashing implementation
   - Verify email format and case sensitivity
   - Ensure database connection is working

## File Structure

```
Biometrics-App/
├── screens/
│   ├── Login.tsx          # Login screen with authentication
│   ├── InfoRegister.tsx   # Registration screen
│   ├── SignUp.tsx         # User personal information
│   ├── SignUp2.tsx        # Educational/employment info
│   ├── Fingerprint.tsx    # Fingerprint registration
│   └── ProfileScreen.tsx  # User profile display
├── context/
│   ├── UserContext.tsx    # User state management
│   └── RegisContext.tsx   # Registration state management
├── models/
│   ├── Register.js        # Registration/authentication model
│   ├── User.js            # User profile model
│   └── Fingerprint.js     # Fingerprint biometric model
├── utils/
│   ├── fingerprintHelper.js    # Fingerprint utilities
│   └── fingerprintProcessor.js # Fingerprint processing
├── server.js              # Backend API server
└── package.json           # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 
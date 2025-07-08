# Biometrics App - Backend Database Schema

This backend provides a MongoDB database schema and REST API based on the user profile data displayed in the ProfileScreen component.

## Database Schema

The `User` schema includes all fields shown in the ProfileScreen:

### Basic Information
- `firstName`: String (required)
- `lastName`: String (required) 
- `email`: String (required, unique)
- `phoneNumber`: String (required)

### Personal Information
- `gender`: Enum ['Male', 'Female', 'Other'] (required)
- `dateOfBirth`: Date (required)
- `placeOfBirth`: String (required)
- `nationality`: String (default: 'Filipino')
- `maritalStatus`: Enum ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']

### Addresses
- `temporaryAddress`: String (required)
- `permanentAddress`: String (required)

### Educational Background
- `educationalAttainment`: Enum ['Elementary', 'High School', 'Senior High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'] (required)
- `degree`: String (required)
- `university`: String (required)

### Skills
- `skills`: Array of Strings

### Employment Information
- `currentJobTitle`: String (required)
- `workExperience`: Number (years, required)
- `sssNumber`: String (required)

### Account Status
- `isVerified`: Boolean (default: false)
- `isActive`: Boolean (default: true)

### Virtual Fields
- `fullName`: Computed from firstName + lastName
- `age`: Computed from dateOfBirth

## Setup and Installation

1. Install dependencies:
```bash
npm install express mongoose
```

2. Start the server:
```bash
node index.js
```

The server will connect to your MongoDB database and run on port 5001.

## API Endpoints

### Base URL: `http://localhost:5001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/users` | Get all active users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Soft delete user |

## Example Usage

### Create a User (matching ProfileScreen data)
```bash
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Lebron",
    "lastName": "James",
    "email": "lebronjames23@gmail.com",
    "phoneNumber": "+63 915 455 2251",
    "gender": "Male",
    "dateOfBirth": "2002-08-30",
    "placeOfBirth": "Muntinlupa City",
    "nationality": "Filipino",
    "maritalStatus": "Single",
    "temporaryAddress": "Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City",
    "permanentAddress": "Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City",
    "educationalAttainment": "Bachelor's Degree",
    "degree": "Computer Science",
    "university": "De La Salle University Dasmariñas",
    "skills": ["AWS", "JavaScript", "Python", "React Native", "MongoDB", "Node.js"],
    "currentJobTitle": "Basketball Player",
    "workExperience": 23,
    "sssNumber": "1234567890",
    "isVerified": true
  }'
```

### Get All Users
```bash
curl http://localhost:5001/api/users
```

### Get User by ID
```bash
curl http://localhost:5001/api/users/USER_ID_HERE
```

## Sample Data

Use the `sampleData.js` file to create test users with the exact data from ProfileScreen:

```javascript
const { createSampleUser } = require('./sampleData');

// Create sample user
createSampleUser();
```

## Database Connection

The application connects to MongoDB using the connection string in `index.js`. Make sure your MongoDB cluster is accessible and the credentials are correct.

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/biometrics
```

## Features

- ✅ Schema matches ProfileScreen data exactly
- ✅ Data validation and constraints
- ✅ Virtual fields for computed values (fullName, age)
- ✅ Soft delete functionality
- ✅ RESTful API endpoints
- ✅ Error handling
- ✅ Sample data for testing

## Files Structure

```
Biometrics-App/
├── models/
│   └── User.js          # Mongoose schema
├── index.js             # Express server with API routes
├── sampleData.js        # Sample user data
└── README-Backend.md    # This documentation
``` 
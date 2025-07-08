const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic Information (as shown in ProfileScreen)
    fullName: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                // Allow 'N/A' for cases where phone number is not applicable
                if (value.toLowerCase() === 'n/a') {
                    return true;
                }
                
                // Remove spaces, dashes, parentheses for validation
                const cleanedPhone = value.replace(/[\s\-\(\)]/g, '');
                
                // Check if contains only numbers and optional + symbol at the beginning
                const phoneRegex = /^[\+]?[0-9]+$/;
                return phoneRegex.test(cleanedPhone);
            },
            message: 'Phone number can only contain numbers, spaces, dashes, parentheses, and + symbol'
        }
    },
    
    // Personal Information
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, default: 'Filipino' },
    maritalStatus: { 
        type: String, 
        enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
        default: 'Single'
    },
    
    // Addresses
    temporaryAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    
    // Educational Background
    educationalAttainment: { 
        type: String, 
        enum: ['Elementary', 'High School', 'Senior High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'],
        required: true
    },
    degree: { type: String},
    university: { type: String},
    
    // Skills
    skills: [{ 
        type: String, 
        trim: true 
    }],
    
    // Employment Information
    currentJobTitle: { type: String },
    workExperience: { type: Number}, // in years
    sssNumber: { type: String, required: true },
    
    // Account Status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    
    // Fingerprint Authentication
    fingerprintEnabled: { type: Boolean, default: false },
    lastFingerprintAuth: Date,
    
    // Temporary field to satisfy database constraint (will be removed later)
    fingerprintId: { type: String, default: null }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for first and last name (derived from fullName)
userSchema.virtual('firstName').get(function() {
    return this.fullName ? this.fullName.split(' ')[0] : '';
});

userSchema.virtual('lastName').get(function() {
    return this.fullName ? this.fullName.split(' ').slice(1).join(' ') : '';
});

// Virtual for age
userSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ fullName: 1 });
userSchema.index({ isVerified: 1, isActive: 1 });

// Ensure fingerprintId is not exposed in JSON responses
userSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.fingerprintId;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema); 
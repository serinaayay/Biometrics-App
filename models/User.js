const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Basic Information (as shown in ProfileScreen)
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    // Personal Information
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, default: 'Filipino' },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
      default: 'Single',
    },

    // Addresses
    temporaryAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },

    // Educational Background
    educationalAttainment: {
      type: String,
      enum: [
        'Elementary',
        'High School',
        'Senior High School',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate',
      ],
      required: true,
    },
    degree: { type: String, required: true },
    university: { type: String, required: true },

    // Skills
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Employment Information
    currentJobTitle: { type: String, required: true },
    workExperience: { type: Number, required: true }, // in years
    sssNumber: { type: String, required: true },

    // Account Status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // Fingerprint Authentication
    fingerprintEnabled: { type: Boolean, default: false },
    lastFingerprintAuth: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function () {
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
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({ isVerified: 1, isActive: 1 });

module.exports = mongoose.model('User', userSchema);

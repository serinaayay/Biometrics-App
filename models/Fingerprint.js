const mongoose = require('mongoose');

const fingerprintSchema = new mongoose.Schema(
  {
    // User reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Simple fingerprint data
    fingerprintTemplate: {
      type: String, // Stored as hash/encoded string
      required: true,
    },

    // Which finger was used
    fingerPosition: {
      type: String,
      enum: [
        'rightThumb',
        'rightIndex',
        'rightMiddle',
        'rightRing',
        'rightPinky',
        'leftThumb',
        'leftIndex',
        'leftMiddle',
        'leftRing',
        'leftPinky',
      ],
      required: true,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // When it was registered
    registrationDate: {
      type: Date,
      default: Date.now,
    },

    // Last used for authentication
    lastUsed: Date,

    // Usage count
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
fingerprintSchema.index({ userId: 1, isActive: 1 });
fingerprintSchema.index({ userId: 1, fingerPosition: 1 });

// Method to increment usage
fingerprintSchema.methods.recordUsage = function () {
  this.usageCount += 1;
  this.lastUsed = new Date();
  return this.save();
};

// Static method to find user's fingerprints
fingerprintSchema.statics.findByUser = function (userId) {
  return this.find({
    userId: userId,
    isActive: true,
  }).sort({ registrationDate: -1 });
};

module.exports = mongoose.model('Fingerprint', fingerprintSchema);

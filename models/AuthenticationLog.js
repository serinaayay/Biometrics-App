const mongoose = require('mongoose');

const fingerprintLogSchema = new mongoose.Schema(
  {
    // User reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Fingerprint reference
    fingerprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fingerprint',
      required: true,
    },

    // Authentication result
    authenticationResult: {
      type: String,
      enum: ['success', 'failure'],
      required: true,
    },

    // Failure reason (if failed)
    failureReason: {
      type: String,
      enum: [
        'fingerprint_mismatch',
        'template_not_found',
        'quality_too_low',
        'account_disabled',
        'device_error',
        'too_many_attempts',
      ],
      required: function () {
        return this.authenticationResult !== 'success';
      },
    },

    // Fingerprint specific data
    fingerprintData: {
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
      processingTime: Number, // in milliseconds
      attempts: {
        type: Number,
        default: 1,
      },
    },

    // Basic device info
    deviceInfo: {
      deviceId: String,
      deviceType: String,
      userAgent: String,
    },

    // Basic location info
    location: {
      ipAddress: String,
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },

    // Simple security flags
    securityFlags: {
      suspiciousActivity: { type: Boolean, default: false },
      newDevice: { type: Boolean, default: false },
    },

    // Notes
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Virtual to check if authentication was successful
fingerprintLogSchema.virtual('wasSuccessful').get(function () {
  return this.authenticationResult === 'success';
});

// Virtual to check if log is recent (within last 24 hours)
fingerprintLogSchema.virtual('isRecent').get(function () {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return this.location.timestamp > twentyFourHoursAgo;
});

// Indexes for efficient queries
fingerprintLogSchema.index({ userId: 1, 'location.timestamp': -1 });
fingerprintLogSchema.index({ fingerprintId: 1, 'location.timestamp': -1 });
fingerprintLogSchema.index({ authenticationResult: 1, 'location.timestamp': -1 });
fingerprintLogSchema.index({ 'securityFlags.suspiciousActivity': 1 });

// Static method to find failed attempts for a user
fingerprintLogSchema.statics.findFailedAttemptsForUser = function (userId, timeRange = 24) {
  const cutoffTime = new Date(Date.now() - timeRange * 60 * 60 * 1000);
  return this.find({
    userId: userId,
    authenticationResult: 'failure',
    'location.timestamp': { $gte: cutoffTime },
  }).sort({ 'location.timestamp': -1 });
};

// Static method to get fingerprint authentication stats
fingerprintLogSchema.statics.getFingerprintStats = function (userId, days = 30) {
  const cutoffTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.aggregate([
    {
      $match: {
        userId: userId,
        'location.timestamp': { $gte: cutoffTime },
      },
    },
    {
      $group: {
        _id: {
          result: '$authenticationResult',
          fingerPosition: '$fingerprintData.fingerPosition',
        },
        count: { $sum: 1 },
        avgProcessingTime: { $avg: '$fingerprintData.processingTime' },
      },
    },
  ]);
};

// Method to mark as suspicious
fingerprintLogSchema.methods.markAsSuspicious = function (reason) {
  this.securityFlags.suspiciousActivity = true;
  if (reason) {
    this.notes = this.notes ? `${this.notes}; ${reason}` : reason;
  }
  return this.save();
};

module.exports = mongoose.model('FingerprintLog', fingerprintLogSchema);

/**
 * Fingerprint Processing Utilities
 * Handles fingerprint image processing, feature extraction, and template generation
 */

const crypto = require('crypto');

class FingerprintProcessor {
  constructor() {
    // Minutiae detection parameters
    this.RIDGE_ENDING = 'ridge_ending';
    this.BIFURCATION = 'bifurcation';
    this.MIN_QUALITY_SCORE = 0.6;
  }

  /**
   * Convert fingerprint image to base64
   * @param {Buffer|string} imageData - Raw image data or file path
   * @returns {string} Base64 encoded image
   */
  imageToBase64(imageData) {
    if (Buffer.isBuffer(imageData)) {
      return imageData.toString('base64');
    }
    
    // If it's already a base64 string, validate and return
    if (typeof imageData === 'string') {
      // Remove data URL prefix if present
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Validate base64
      if (this.isValidBase64(base64Data)) {
        return base64Data;
      }
    }
    
    throw new Error('Invalid image data format');
  }

  /**
   * Validate base64 string
   * @param {string} str - String to validate
   * @returns {boolean} True if valid base64
   */
  isValidBase64(str) {
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
      return false;
    }
  }

  /**
   * Extract features from fingerprint image
   * This is a simplified version - in production, use specialized libraries
   * @param {string} base64Image - Base64 encoded fingerprint image
   * @returns {Object} Extracted features
   */
  extractFeatures(base64Image) {
    // Validate input
    if (!base64Image || !this.isValidBase64(base64Image)) {
      throw new Error('Invalid base64 image data');
    }

    // Convert base64 to buffer for processing
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    // Generate a hash of the image for quick comparison
    const imageHash = crypto.createHash('sha256').update(imageBuffer).digest('hex');
    
    // Simulate minutiae extraction (in real implementation, use image processing libraries)
    const minutiae = this.simulateMinutiaeExtraction(imageBuffer);
    
    // Calculate quality score
    const qualityScore = this.calculateQualityScore(minutiae);
    
    return {
      imageHash,
      minutiae,
      qualityScore,
      featureCount: minutiae.length,
      extractionTimestamp: new Date().toISOString()
    };
  }

  /**
   * Simulate minutiae extraction from fingerprint
   * In production, replace with actual minutiae detection algorithm
   * @param {Buffer} imageBuffer - Image buffer
   * @returns {Array} Array of minutiae points
   */
  simulateMinutiaeExtraction(imageBuffer) {
    // This is a simulation - replace with actual image processing
    const hash = crypto.createHash('md5').update(imageBuffer).digest('hex');
    const minutiae = [];
    
    // Generate deterministic minutiae based on image hash
    for (let i = 0; i < hash.length; i += 4) {
      const x = parseInt(hash.substr(i, 2), 16) % 256;
      const y = parseInt(hash.substr(i + 2, 2), 16) % 256;
      const type = (x + y) % 2 === 0 ? this.RIDGE_ENDING : this.BIFURCATION;
      const angle = ((x + y) % 360) * (Math.PI / 180);
      
      minutiae.push({
        x,
        y,
        type,
        angle,
        quality: Math.random() * 0.4 + 0.6 // 0.6 to 1.0
      });
      
      if (minutiae.length >= 40) break; // Typical minutiae count
    }
    
    return minutiae;
  }

  /**
   * Calculate fingerprint quality score
   * @param {Array} minutiae - Minutiae points
   * @returns {number} Quality score between 0 and 1
   */
  calculateQualityScore(minutiae) {
    if (!minutiae || minutiae.length === 0) return 0;
    
    // Quality based on minutiae count and distribution
    const countScore = Math.min(minutiae.length / 40, 1); // Normalize to 40 minutiae
    const avgQuality = minutiae.reduce((sum, m) => sum + m.quality, 0) / minutiae.length;
    
    return (countScore * 0.6 + avgQuality * 0.4);
  }

  /**
   * Generate fingerprint template from features
   * @param {Object} features - Extracted features
   * @param {Object} metadata - Additional metadata
   * @returns {Object} Fingerprint template
   */
  generateTemplate(features, metadata = {}) {
    if (features.qualityScore < this.MIN_QUALITY_SCORE) {
      throw new Error(`Fingerprint quality too low: ${features.qualityScore.toFixed(2)} (minimum: ${this.MIN_QUALITY_SCORE})`);
    }

    // Create a compact template representation
    const template = {
      version: '1.0',
      algorithm: 'simplified_minutiae',
      quality: features.qualityScore,
      minutiaeCount: features.featureCount,
      hash: features.imageHash,
      
      // Compressed minutiae data
      minutiae: features.minutiae.map(m => ({
        x: Math.round(m.x),
        y: Math.round(m.y),
        t: m.type === this.RIDGE_ENDING ? 0 : 1,
        a: Math.round(m.angle * 100) / 100, // Round to 2 decimal places
        q: Math.round(m.quality * 100) / 100
      })),
      
      // Metadata
      createdAt: new Date().toISOString(),
      fingerPosition: metadata.fingerPosition || 'unknown',
      
      // Template signature for integrity
      signature: null
    };

    // Generate template signature
    template.signature = this.generateTemplateSignature(template);
    
    return template;
  }

  /**
   * Generate template signature for integrity verification
   * @param {Object} template - Template object
   * @returns {string} Template signature
   */
  generateTemplateSignature(template) {
    const templateCopy = { ...template };
    delete templateCopy.signature; // Remove signature field
    
    const templateString = JSON.stringify(templateCopy);
    return crypto.createHash('sha256').update(templateString).digest('hex');
  }

  /**
   * Verify template integrity
   * @param {Object} template - Template to verify
   * @returns {boolean} True if template is valid
   */
  verifyTemplate(template) {
    if (!template || !template.signature) return false;
    
    const expectedSignature = this.generateTemplateSignature(template);
    return template.signature === expectedSignature;
  }

  /**
   * Compare two fingerprint templates
   * @param {Object} template1 - First template
   * @param {Object} template2 - Second template
   * @returns {Object} Comparison result
   */
  compareTemplates(template1, template2) {
    // Verify template integrity
    if (!this.verifyTemplate(template1) || !this.verifyTemplate(template2)) {
      throw new Error('Invalid template signature');
    }

    // Quick hash comparison
    if (template1.hash === template2.hash) {
      return {
        match: true,
        score: 1.0,
        confidence: 'high',
        method: 'hash_match'
      };
    }

    // Minutiae comparison
    const minutiaeScore = this.compareMinutiae(template1.minutiae, template2.minutiae);
    
    // Quality factor
    const qualityFactor = Math.min(template1.quality, template2.quality);
    
    // Final matching score
    const finalScore = minutiaeScore * qualityFactor;
    
    // Determine match threshold
    const matchThreshold = 0.7;
    const isMatch = finalScore >= matchThreshold;
    
    let confidence = 'low';
    if (finalScore >= 0.9) confidence = 'very_high';
    else if (finalScore >= 0.8) confidence = 'high';
    else if (finalScore >= 0.7) confidence = 'medium';

    return {
      match: isMatch,
      score: Math.round(finalScore * 100) / 100,
      confidence,
      method: 'minutiae_comparison',
      details: {
        minutiaeScore: Math.round(minutiaeScore * 100) / 100,
        qualityFactor: Math.round(qualityFactor * 100) / 100,
        threshold: matchThreshold
      }
    };
  }

  /**
   * Compare minutiae between two templates
   * @param {Array} minutiae1 - First set of minutiae
   * @param {Array} minutiae2 - Second set of minutiae
   * @returns {number} Similarity score between 0 and 1
   */
  compareMinutiae(minutiae1, minutiae2) {
    if (!minutiae1 || !minutiae2 || minutiae1.length === 0 || minutiae2.length === 0) {
      return 0;
    }

    let matchCount = 0;
    const tolerance = {
      position: 10, // pixels
      angle: 0.3,   // radians
      quality: 0.2  // quality difference
    };

    // Find matching minutiae
    for (const m1 of minutiae1) {
      for (const m2 of minutiae2) {
        if (this.isMinutiaeMatch(m1, m2, tolerance)) {
          matchCount++;
          break; // Each minutiae can only match once
        }
      }
    }

    // Calculate similarity score
    const maxMinutiae = Math.max(minutiae1.length, minutiae2.length);
    return matchCount / maxMinutiae;
  }

  /**
   * Check if two minutiae points match within tolerance
   * @param {Object} m1 - First minutiae
   * @param {Object} m2 - Second minutiae
   * @param {Object} tolerance - Matching tolerances
   * @returns {boolean} True if minutiae match
   */
  isMinutiaeMatch(m1, m2, tolerance) {
    // Type must match exactly
    if (m1.t !== m2.t) return false;
    
    // Position within tolerance
    const distance = Math.sqrt(Math.pow(m1.x - m2.x, 2) + Math.pow(m1.y - m2.y, 2));
    if (distance > tolerance.position) return false;
    
    // Angle within tolerance
    const angleDiff = Math.abs(m1.a - m2.a);
    if (angleDiff > tolerance.angle) return false;
    
    // Quality within tolerance
    const qualityDiff = Math.abs(m1.q - m2.q);
    if (qualityDiff > tolerance.quality) return false;
    
    return true;
  }

  /**
   * Process fingerprint for enrollment
   * @param {string} base64Image - Base64 encoded fingerprint image
   * @param {Object} metadata - Additional metadata
   * @returns {Object} Processing result with template
   */
  processForEnrollment(base64Image, metadata = {}) {
    try {
      // Extract features
      const features = this.extractFeatures(base64Image);
      
      // Generate template
      const template = this.generateTemplate(features, metadata);
      
      return {
        success: true,
        template,
        quality: features.qualityScore,
        message: 'Fingerprint processed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        quality: 0
      };
    }
  }

  /**
   * Process fingerprint for authentication
   * @param {string} base64Image - Base64 encoded fingerprint image
   * @param {Object} storedTemplate - Stored template to compare against
   * @returns {Object} Authentication result
   */
  processForAuthentication(base64Image, storedTemplate) {
    try {
      // Extract features from input image
      const features = this.extractFeatures(base64Image);
      
      // Generate temporary template
      const inputTemplate = this.generateTemplate(features);
      
      // Compare templates
      const comparison = this.compareTemplates(inputTemplate, storedTemplate);
      
      return {
        success: true,
        authenticated: comparison.match,
        score: comparison.score,
        confidence: comparison.confidence,
        quality: features.qualityScore,
        details: comparison.details
      };
    } catch (error) {
      return {
        success: false,
        authenticated: false,
        error: error.message,
        score: 0,
        confidence: 'none'
      };
    }
  }
}

module.exports = FingerprintProcessor; 
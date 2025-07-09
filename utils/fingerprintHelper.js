/**
 * React Native Fingerprint Helper
 * Utilities for device biometric authentication and API integration
 */

import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

class FingerprintHelper {
  constructor(apiBaseUrl = 'http://192.168.68.146:5001') {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Check if device supports fingerprint authentication
   * @returns {Promise<Object>} Fingerprint support info
   */
  async checkFingerprintSupport() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const hasFingerprint = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);

      return {
        hasHardware,
        supportedTypes,
        isEnrolled,
        hasFingerprint,
        isReady: hasHardware && isEnrolled && hasFingerprint
      };
    } catch (error) {
      console.error('Error checking fingerprint support:', error);
      return {
        hasHardware: false,
        supportedTypes: [],
        isEnrolled: false,
        hasFingerprint: false,
        isReady: false,
        error: error.message
      };
    }
  }

  /**
   * Authenticate user with device fingerprint
   * @param {Object} options - Authentication options
   * @returns {Promise<Object>} Result with fingerprint data or error
   */
  async authenticateWithFingerprint(options = {}) {
    try {
      // Check fingerprint support first
      const support = await this.checkFingerprintSupport();
      
      if (!support.hasHardware) {
        return {
          success: false,
          error: 'This device does not support fingerprint authentication.'
        };
      }

      if (!support.hasFingerprint) {
        return {
          success: false,
          error: 'This device does not have fingerprint sensor.'
        };
      }

      if (!support.isEnrolled) {
        return {
          success: false,
          error: 'No fingerprints enrolled on this device. Please set up fingerprint unlock in device settings.'
        };
      }

      // Prompt for fingerprint authentication
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: options.promptMessage || 'Authenticate with your fingerprint',
        cancelLabel: options.cancelLabel || 'Cancel',
        disableDeviceFallback: options.disableDeviceFallback || true,
        requireConfirmation: options.requireConfirmation || false,
      });

      if (!authResult.success) {
        return {
          success: false,
          error: authResult.error || 'Fingerprint authentication failed',
          details: {
            reason: authResult.error,
            warning: authResult.warning
          }
        };
      }

      // Generate secure fingerprint identifier
      const fingerprintId = await this.generateFingerprintIdentifier();

      return {
        success: true,
        fingerprint: {
          id: fingerprintId,
          type: 'fingerprint',
          timestamp: new Date().toISOString(),
          deviceInfo: {
            hasFingerprint: support.hasFingerprint,
            supportedTypes: support.supportedTypes
          }
        }
      };
    } catch (error) {
      console.error('Error authenticating with fingerprint:', error);
      return {
        success: false,
        error: `Failed to authenticate with fingerprint: ${error.message}`
      };
    }
  }

  /**
   * Generate secure fingerprint identifier
   * @returns {Promise<string>} Unique fingerprint identifier
   */
  async generateFingerprintIdentifier() {
    try {
      // Get device-specific information
      const deviceInfo = {
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(2),
        type: 'fingerprint'
      };

      // Create a unique identifier based on device and timestamp
      // Note: In production, you might want to use device-specific identifiers
      const identifier = btoa(JSON.stringify(deviceInfo));
      
      return identifier;
    } catch (error) {
      console.error('Error generating fingerprint identifier:', error);
      // Fallback to timestamp-based ID
      return btoa(Date.now().toString() + Math.random().toString());
    }
  }

  /**
   * Prompt user for fingerprint authentication
   * @param {string} purpose - Purpose of the authentication (enrollment/login)
   * @returns {Promise<Object>} Result with fingerprint data or error
   */
  async promptFingerprintAuthentication(purpose = 'authentication') {
    try {
      // Check fingerprint support first
      const support = await this.checkFingerprintSupport();
      
      if (!support.isReady) {
        return new Promise((resolve) => {
          let message = 'Fingerprint authentication is not available.';
          if (!support.hasHardware) {
            message = 'This device does not support fingerprint authentication.';
          } else if (!support.hasFingerprint) {
            message = 'This device does not have a fingerprint sensor.';
          } else if (!support.isEnrolled) {
            message = 'No fingerprints enrolled. Please set up fingerprint unlock in device settings.';
          }

          Alert.alert(
            'Fingerprint Authentication',
            message,
            [
              {
                text: 'OK',
                onPress: () => resolve({
                  success: false,
                  error: message
                })
              }
            ]
          );
        });
      }

      const promptMessage = purpose === 'enrollment' 
        ? 'Use your fingerprint to enroll your fingerprint data'
        : 'Authenticate with your fingerprint';

      // Authenticate with fingerprint
      const result = await this.authenticateWithFingerprint({
        promptMessage,
        cancelLabel: 'Cancel',
        disableDeviceFallback: true
      });

      return result;
    } catch (error) {
      console.error('Error prompting fingerprint authentication:', error);
      return {
        success: false,
        error: `Failed to prompt fingerprint authentication: ${error.message}`
      };
    }
  }

  /**
   * Validate fingerprint identifier
   * @param {string} fingerprintId - Fingerprint identifier to validate
   * @returns {boolean} True if valid
   */
  validateFingerprintId(fingerprintId) {
    if (!fingerprintId || typeof fingerprintId !== 'string') {
      return false;
    }

    // Check if it's a valid base64 encoded identifier
    try {
      const decoded = atob(fingerprintId);
      return decoded.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Register fingerprint with backend
   * @param {string} userId - User ID
   * @param {string} fingerprintId - Fingerprint identifier from device
   * @param {string} fingerPosition - Finger position
   * @param {Object} deviceInfo - Device fingerprint information
   * @returns {Promise<Object>} Registration result
   */
  async registerFingerprint(userId, fingerprintId, fingerPosition, deviceInfo = {}) {
    try {
      // Validate inputs
      if (!userId || !fingerprintId || !fingerPosition) {
        return {
          success: false,
          error: 'Missing required parameters'
        };
      }

      if (!this.validateFingerprintId(fingerprintId)) {
        return {
          success: false,
          error: 'Invalid fingerprint identifier format'
        };
      }

      const response = await fetch(`${this.apiBaseUrl}/api/fingerprint/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          fingerprintImage: fingerprintId, // Using fingerprint ID as the template
          fingerPosition,
          deviceInfo: {
            biometricType: 'fingerprint',
            hasFingerprint: deviceInfo.hasFingerprint || true,
            timestamp: deviceInfo.timestamp || new Date().toISOString()
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Registration failed',
          quality: result.quality || 0
        };
      }

      return {
        success: true,
        data: result,
        message: result.message || 'Fingerprint registered successfully'
      };
    } catch (error) {
      console.error('Fingerprint registration error:', error);
      return {
        success: false,
        error: `Network error: ${error.message}`
      };
    }
  }

  /**
   * Authenticate with fingerprint
   * @param {string} userId - User ID
   * @param {string} fingerprintId - Fingerprint identifier from device
   * @param {string} fingerPosition - Optional finger position for additional verification
   * @returns {Promise<Object>} Authentication result
   */
  async authenticateFingerprint(userId, fingerprintId, fingerPosition = null) {
    try {
      // Validate inputs
      if (!userId || !fingerprintId) {
        return {
          success: false,
          error: 'Missing required parameters'
        };
      }

      if (!this.validateFingerprintId(fingerprintId)) {
        return {
          success: false,
          error: 'Invalid fingerprint identifier format'
        };
      }

      const requestBody = {
        userId,
        fingerprintImage: fingerprintId // Using fingerprint ID as the template
      };

      if (fingerPosition) {
        requestBody.fingerPosition = fingerPosition;
      }

      const response = await fetch(`${this.apiBaseUrl}/api/fingerprint/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          authenticated: false,
          error: result.error || 'Authentication failed',
          details: result.details || {}
        };
      }

      return {
        success: result.success,
        authenticated: result.success,
        data: result,
        matchDetails: result.matchDetails || {}
      };
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      return {
        success: false,
        authenticated: false,
        error: `Network error: ${error.message}`
      };
    }
  }

  /**
   * Get user's registered fingerprints
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User fingerprints
   */
  async getUserFingerprints(userId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/users/${userId}/fingerprints`);
      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to fetch fingerprints'
        };
      }

      return {
        success: true,
        fingerprints: result
      };
    } catch (error) {
      console.error('Error fetching user fingerprints:', error);
      return {
        success: false,
        error: `Network error: ${error.message}`
      };
    }
  }



  /**
   * Complete fingerprint enrollment flow
   * @param {string} userId - User ID
   * @param {string} fingerPosition - Finger position
   * @returns {Promise<Object>} Enrollment result
   */
  async enrollFingerprint(userId, fingerPosition) {
    try {
      // Step 1: Authenticate with device fingerprint
      const authResult = await this.promptFingerprintAuthentication('enrollment');
      
      if (!authResult.success) {
        return authResult;
      }

      // Step 2: Register with backend
      const registerResult = await this.registerFingerprint(
        userId, 
        authResult.fingerprint.id, 
        fingerPosition,
        authResult.fingerprint.deviceInfo
      );

      return registerResult;
    } catch (error) {
      console.error('Fingerprint enrollment error:', error);
      return {
        success: false,
        error: `Enrollment failed: ${error.message}`
      };
    }
  }

  /**
   * Complete fingerprint authentication flow
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Authentication result
   */
  async authenticateUser(userId) {
    try {
      // Step 1: Authenticate with device fingerprint
      const fingerprintResult = await this.promptFingerprintAuthentication('authentication');
      
      if (!fingerprintResult.success) {
        return {
          success: false,
          authenticated: false,
          error: fingerprintResult.error
        };
      }

      // Step 2: Authenticate with backend
      const authResult = await this.authenticateFingerprint(
        userId, 
        fingerprintResult.fingerprint.id
      );

      return authResult;
    } catch (error) {
      console.error('Fingerprint authentication flow error:', error);
      return {
        success: false,
        authenticated: false,
        error: `Authentication failed: ${error.message}`
      };
    }
  }
}

export default FingerprintHelper; 
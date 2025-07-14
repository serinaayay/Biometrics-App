import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import '../global.css';
import { useState } from 'react';
import { useRegis, validateRegisData } from '../context/RegisContext';
import {Buffer} from 'buffer';
const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'InfoRegister'>;

export default function InfoRegister({ navigation }: Props) {
  const { regisData, updateRegisData } = useRegis();

  const [email1, setEmail1] = useState(regisData.email1 || '');
  const [password, setPassword] = useState(regisData.password || '');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(regisData.confirmPassword || '');
  const [loading, setLoading] = useState(false);

  const hashPassword = (password: string): string => {
    return Buffer.from(password + 'salt_key_here').toString('base64');
  };

  // Password validation function
  const validatePasswords = (passwordText: string): void => { 
    if (passwordText.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (passwordText !== confirmPassword && confirmPassword !== '') {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  // Handle password change with validation
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePasswords(text);
  };

  // Handle confirm password change with validation
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (password.length >= 8) {
      if (password !== text) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  

  // Function to save registration data to MongoDB
  const saveRegisToDatabase = async (registrationData: any) => {
    try {
      const API_BASE_URL = 'http://192.168.68.146:5001';
      
      console.log('Attempting to save registration data to database at:', API_BASE_URL);
      console.log('Registration data:', JSON.stringify({...registrationData, password: '[HASHED]'}, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Failed to save registration data (Status: ${response.status})`);
      }

      const savedRegistration = await response.json();
      console.log('Registration data saved to database successfully');
      return savedRegistration;
    } catch (error) {
      console.error('Error saving registration data to database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      throw error;
    }
  };

  const handleSignUp = async () => {
    console.log('Continue to Sign Up button pressed!');
    
    if (loading) return; // Prevent multiple submissions
    
    const formData = {
      email1: email1.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };

    console.log('Form data:', { 
      email: email1.trim(), 
      passwordLength: password.trim().length,
      confirmPasswordLength: confirmPassword.trim().length 
    });

    // Validate the form data using the existing validation
    const formErrors = validateRegisData(formData);
    console.log('🔍 Validation errors:', formErrors);

    if (formErrors.length > 0) {
      console.log('Validation failed, showing alert');
      Alert.alert(
        'Validation Error',
        `Please fix the following issues:\n\n• ${formErrors.join('\n• ')}`,
        [{ text: 'OK' }]
      );
      return; // Stop execution - don't continue to next page
    }

    console.log('Validation passed, proceeding with registration');
    setLoading(true);

    try {
      // Save to context
      updateRegisData(formData);
      console.log('Data saved to context');

      // Hash the password before saving to database
      const hashedPassword = hashPassword(password.trim());

      // Prepare registration data for database
      const registrationData = {
        email1: email1.trim(), // Using email1 to match the Regis model schema
        password: hashedPassword, // Hashed password
        confirmPassword: hashedPassword, // Hashed password
      };

      console.log('Attempting to save to database...');
      // Save to MongoDB database - properly await the async function
      const savedRegistration = await saveRegisToDatabase(registrationData);
      
      console.log('Database save successful, showing success alert');
      Alert.alert(
        'Registration Started!',
        'Your registration has been initialized and saved securely. Please continue with your personal information.',
        [
          {
            text: 'Continue',
            onPress: () => {
              console.log('Navigating to SignUp screen');
              navigation.navigate('SignUp');
            },
          },
        ]
      );
    } catch (error) {
      console.log('Database save failed, showing error alert');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Registration Error',
        `There was an error saving your registration to the database: ${errorMessage}. Please try again.`,
        [{ text: 'OK' }]
      );
      // Don't navigate - user must fix the error first
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.bgColor}>
      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 5 }}>
          Sign Up
        </Text>
      </View>

      <View
        style={{
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          padding: 4,
          marginTop: 8,
          marginBottom: 4,
        }}>
        <Text style={styles.Title}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your email"
          value={email1}
          onChangeText={setEmail1}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.Title}>Password</Text>
        <TextInput 
          style={[styles.inputBox, passwordError ? { borderColor: '#DD3737', borderWidth: 2 } : {}]} 
          placeholder="Enter your Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          editable={!loading}
        />
        {passwordError ? (
          <Text style={{ color: '#DD3737', fontSize: 14, marginLeft: 17, marginTop: 5 }}>
            {passwordError}
          </Text>
        ) : (
          <Text style={{ color: '#666', fontSize: 12, marginLeft: 17, marginTop: 5 }}>
            Password must be at least 8 characters long
          </Text>
        )}

        <Text style={styles.Title}>Confirm your Password</Text>
        <TextInput 
          style={[styles.inputBox, passwordError && passwordError.includes('match') ? { borderColor: '#DD3737', borderWidth: 2 } : {}]} 
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
          editable={!loading}
        />

        <Pressable onPress={handleSignUp} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          <View
            style={{
              backgroundColor: loading ? '#9BB3F0' : '#4B70E0',
              borderRadius: 12,
              padding: 4,
              marginTop: 20,
              alignSelf: 'center',
              width: width * 0.7,
              alignItems: 'center',
              minHeight: 44,
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', padding: 4 }}>
                Continue to Sign Up
              </Text>
            )}
          </View>

        </Pressable>

        <View style={styles.separator} />

        <TouchableHighlight onPress={() => Alert.alert('Fingerprint', 'Fingerprint authentication coming soon!')}>
          <View
            style={{
              backgroundColor: '#2D4078',
              borderRadius: 12,
              padding: 4,
              marginTop: 5,
              marginBottom: 12,
              alignSelf: 'center',
              width: width * 0.7,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', padding: 4 }}>
              Scan Fingerprint
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          onPress={() => navigation.navigate('LogIn')}
          style={{
            color: '#6289DD',
            fontSize: 14,
            fontWeight: '500',
            marginLeft: 5,
            marginTop: 3,
          }}>
          Already have an account? Sign In
        </Text>
        <Text
          onPress={() => Alert.alert('Forgot Password', 'Forgot password functionality coming soon!')}
          style={{
            color: '#6289DD',
            fontSize: 14,
            fontWeight: '500',
            marginRight: 6,
            marginTop: 3,
          }}>
          Forgot Password?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    flex: 1,
    padding: 42,
    justifyContent: 'center',
    backgroundColor: '#093FB4',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginLeft: 17,
  },
  inputBox: {
    height: 40,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    width: width * 0.7,
    marginLeft: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6EBF3',
  },
  button: {
    height: 40,
    width: width * 0.5,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6EBF3',
  },
});

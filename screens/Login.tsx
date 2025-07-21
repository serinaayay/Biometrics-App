import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { getApiUrl } from '../config/api';
import { useUser } from '../context/UserContext';
import '../global.css';
import { RootStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

const LogInScreen = ({ navigation }: Props) => {
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateUserData, resetUserData } = useUser();

  const validateInput = () => {
    if (!email1.trim()) {
      const errorMsg = 'Email is required';
      setError(errorMsg);
      Alert.alert('Validation Error', errorMsg);
      return false;
    }
    if (!password.trim()) {
      const errorMsg = 'Password is required';
      setError(errorMsg);
      Alert.alert('Validation Error', errorMsg);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email1)) {
      const errorMsg = 'Please enter a valid email address';
      setError(errorMsg);
      Alert.alert('Validation Error', errorMsg);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    try {
      // Reset user data before login
      resetUserData();

      // Single login attempt - backend handles password variations
      const response = await fetch(`${getApiUrl()}/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email1: email1.trim(),
          password: password, // Send original password - backend handles variations
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Backend server may not be running.');
      }

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Authentication successful!');
        console.log('Login response data:', data);
        
        // Check if profile data is included in response
        if (data.profile) {
          const userProfile = data.profile;
          console.log('User profile found in login response:', userProfile);
          
          // Transform profile data to match UserContext interface
          const userContextData = {
            fullName: userProfile.fullName || '',
            email: userProfile.email || email1.trim(),
            gender: userProfile.gender || '',
            dateOfBirth: userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth) : new Date(),
            placeOfBirth: userProfile.placeOfBirth || '',
            nationality: userProfile.nationality || '',
            maritalStatus: userProfile.maritalStatus || '',
            temporaryAddress: userProfile.temporaryAddress || '',
            permanentAddress: userProfile.permanentAddress || '',
            phoneNumber: userProfile.phoneNumber || '',
            educationalAttainment: userProfile.educationalAttainment || '',
            degree: userProfile.degree || '',
            university: userProfile.university || userProfile.college || '',
            currentJob: userProfile.currentJob || userProfile.currentJobTitle || '',
            otherJob: userProfile.otherJob || '',
            finalJob: userProfile.finalJob || '',
            skills: userProfile.skills || [],
            workExperience: userProfile.workExperience || '',
            sssNumber: userProfile.sssNumber || '',
            isVerified: userProfile.isVerified || true,
          };

          // Update UserContext with complete profile data
          updateUserData(userContextData);
          console.log('User context updated with profile data');
        } else {
          // If no profile data, set basic user info
          const basicUserData2 = {
            email: data.user?.email || email1.trim(),
          };
          updateUserData(basicUserData2);
          console.log('No profile found, setting basic user data in context');
        }

        // Clear errors and navigate to profile
        setError('');
        Alert.alert(
          'Success', 
          'Login successful!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('ProfileScreen'); 
              }
            }
          ]
        );
      } else {
        // Login failed
        const errorMsg = data.error || 'Login failed';
        setError(errorMsg);
        Alert.alert('Login Failed', errorMsg, [{ text: 'OK' }]);
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = 'Network error. Please check your connection and try again.';
      setError(errorMsg);
      Alert.alert('Connection Error', errorMsg, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    try {
      console.log('Testing API connection to:', getApiUrl());
      const response = await fetch(`${getApiUrl()}/api/test`);
      const data = await response.json();
      console.log('API test successful:', data);
      Alert.alert('API Connection', `Successfully connected to: ${getApiUrl()}`);
    } catch (error) {
      console.error('API test failed:', error);
      Alert.alert('API Connection Failed', `Could not connect to: ${getApiUrl()}\n\nIs your backend server running?`);
    }
  };

  return (
    <View style={styles.bgColor}>
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000000ff', marginLeft: 5, alignSelf: 'center'}}>
          Sign In
        </Text>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.Title}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email1}
          onChangeText={setEmail1}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={styles.Title}>Password</Text>
        <TextInput 
          style={styles.inputBox} 
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <TouchableHighlight 
          onPress={handleLogin}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          <View
            style={{
              backgroundColor: '#3a50a1ff',
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
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', padding: 4 }}>
                Log In
              </Text>
            )}
          </View>
        </TouchableHighlight>

        <View style={styles.separator} />

        <TouchableHighlight onPress={testApiConnection}>
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
              Scan fingerprint
            </Text>
          </View>
        </TouchableHighlight>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          onPress={() => navigation.navigate('InfoRegister')}
          style={{
            color: '#fbf7e9ff',
            fontSize: 14,
            fontWeight: '500',
            marginLeft: width * 0.02,
            marginTop: -width * 0.01,
          }}>
          Sign Up
        </Text>
        <Text
          onPress={() => alert('Forgot password functionality not implemented yet')}
          style={{
            color: '#fbf7e9ff',
            fontSize: 14,
            fontWeight: '500',
            marginLeft: width * 0.02,
            marginTop: -width * 0.01,
          }}>
          Forgot Password?
        </Text>
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  bgColor: {
    flex: 1,
    padding: 42,
    justifyContent: 'center',
    backgroundColor: '#5E83AE',
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
    fontFamily: 'Inter 28pt Regular',
    fontWeight: 'bold',
    color: '#000000ff',
    marginTop: 10,
    marginLeft: 17,
  },
  inputBox: {
    height: 40,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    width: width * 0.68,
    marginLeft: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6EBF3',
  },
  container: {
    backgroundColor: '#FAF7F3',
    padding: 4,
    marginTop: 17,
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    width: height * 0.36,
    height: height * 0.55,
  },
  button: {
    height: 40,
    width: width * 0.5,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6EBF3',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontWeight: '500',
  },
}); 
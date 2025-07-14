import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  View, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import '../global.css';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

const LogInScreen = ({ navigation }: Props) => {
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await fetch('http://192.168.68.146:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email1: email1.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful - clear any previous errors
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
        // Login failed - show error in alert and prevent navigation
        const errorMsg = data.error || 'Login failed';
        setError(errorMsg);
        Alert.alert(
          'Login Failed',
          errorMsg,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = 'Network error. Please check your connection and try again.';
      setError(errorMsg);
      Alert.alert(
        'Connection Error',
        errorMsg,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.bgColor}>
      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 5 }}>
          Sign In
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
              backgroundColor: '#4B70E0',
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
                Log In
              </Text>
            )}
          </View>
        </TouchableHighlight>

        <View style={styles.separator} />

        <TouchableHighlight onPress={() => alert('Fingerprint authentication not implemented yet')}>
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
          onPress={() => navigation.navigate('InfoRegister')}
          style={{
            color: '#6289DD',
            fontSize: 14,
            fontWeight: '500',
            marginLeft: 5,
            marginTop: 3,
          }}>
          Sign Up
        </Text>
        <Text
          onPress={() => alert('Forgot password functionality not implemented yet')}
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
};

export default LogInScreen;

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
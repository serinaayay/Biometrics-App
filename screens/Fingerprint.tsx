import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useUser, validateEducationalInfo, validateEmploymentInfo } from '../context/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Fingerprint'>;

const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Senior High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'];

export default function HomeScreen({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  const [show, setShow] = useState(false);

  // Function to save user data to MongoDB
  const saveUserToDatabase = async (completeUserData: any) => {
    try {
      // Use the correct IP address for React Native to connect to backend
      // For iOS Simulator: 127.0.0.1, For Android Emulator: 10.0.2.2, For physical device: your computer's IP
      const API_BASE_URL = 'http://192.168.68.146:5001';
      
      console.log('Attempting to save user to database at:', API_BASE_URL);
      console.log('User data:', JSON.stringify(completeUserData, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeUserData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Failed to save user data (Status: ${response.status})`);
      }

      const savedUser = await response.json();
      console.log('✅ User saved to database successfully:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('❌ Error saving user to database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      throw error;
    }
  };

  // Handle verify button press
  const handleVerify = async () => {
    const formData = {
      isVerified: true, // Mark as verified when completing signup
    };

    // Validate educational information
    const educationalErrors = validateEducationalInfo(formData);
    const employmentErrors = validateEmploymentInfo(formData);
    const allErrors = [...educationalErrors, ...employmentErrors];

    if (allErrors.length > 0) {
      Alert.alert(
        'Validation Error',
        `Please fix the following issues:\n\n• ${allErrors.join('\n• ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Save to context
    updateUserData(formData);

    // Prepare complete user data for database
    const completeUserData = {
      
      // Account status
      isVerified: true,
      isActive: true,
      fingerprintEnabled: false, // Will be enabled when fingerprint is registered
      
      // Temporary fix for database constraint
      fingerprintId: Date.now().toString(), // Use timestamp as unique ID
    };

    try {
      // Save to MongoDB database
      const savedUser = await saveUserToDatabase(completeUserData);
      
      Alert.alert(
        'Registration Complete!',
        `Welcome ${userData.fullName}! Your profile has been created successfully and saved to the database.`,
        [
          {
            text: 'View Profile',
            onPress: () => navigation.navigate('ProfileScreen'),
          },
        ]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Registration Error',
        `Your profile was created locally, but there was an error saving to the database: ${errorMessage}. Please check your internet connection and try again.`,
        [
          {
            text: 'Continue Offline',
            onPress: () => navigation.navigate('ProfileScreen'),
          },
          {
            text: 'Try Again',
            onPress: () => handleVerify(),
          },
        ]
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>
            Sign Up
          </Text>
        </View>

            <Text
            style={{
                fontSize: 23,
                fontWeight: 'bold',
                color: '#000000',
                marginTop: width * 1,
                marginLeft: 20,
            }}>
            Fingerprint Registration
            </Text>
            <View style={styles.fieldContainer}>
            <Pressable onPress={() => setShow(true)}>
                <Image
                    source={require('../assets/fingerprint 1.png')}
                    style={styles.imageFingerprint}/>
            </Pressable>

            <Text
                style={{
                    fontSize: 23,
                    fontWeight: 'bold',
                    color: '#000000',
                    marginTop: -width * 0.4
                    
                }}>Please scan your fingerprint
            </Text>

            <Pressable onPress={() => navigation.navigate('Fingerprint')}>
                <View style={styles.registerButton}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                    }}>Register
                    </Text>
                </View>
            </Pressable>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable onPress={() => navigation.navigate('SignUp2')}>
                <View style={styles.nextButton}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                    }}>Back
                    </Text>
                </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.nextButton}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                    }}>     Verify {'\n'}Information
                    </Text>
                </View>
        </Pressable>

        </View>
            
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    bottom: -height * 0.45,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: width * 0.03,
    backgroundColor: '#093FB4',
    alignSelf: 'center',
    marginTop: -height * 0.35,
    alignItems: 'center',
  },

  fieldContainer: {
    backgroundColor: '#EFF5FF',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 30,
    shadowRadius: 0.1,
    elevation: 0.8,
  },

  registerButton: {
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
    width: width * 0.5,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2.0,
    height: height * 0.06,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: "center"
  },

  nextButton: {
    marginTop: height * 0.04,
    marginBottom: height * 0.05,
    width: width * 0.4,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2.0,
    height: height * 0.06,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: "center"
  },

  imageFingerprint: {
    alignItems: "center",
    resizeMode: "center",
    width: width * 0.5,
    marginTop: -width * 0.5
    

  },
});

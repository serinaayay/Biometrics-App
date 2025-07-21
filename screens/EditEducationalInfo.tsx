import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { getApiUrl } from '../config/api';
import { useUser, validateEducationalInfo } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditEducationalInfo'>;

const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Senior High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Vocational'];

export default function EditEducationalInfo({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  // Local form state
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userData.educationalAttainment || null
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [degree, setDegree] = useState(userData.degree || '');
  const [university, setUniversity] = useState(userData.university || '');
  const [loading, setLoading] = useState(false);

  // Update user in database
  const updateUserInDatabase = async (updatedData: any) => {
    try {
      const API_BASE_URL = getApiUrl();
      console.log('Updating user in database at:', API_BASE_URL);
      console.log('Updated data:', JSON.stringify(updatedData, null, 2));

      const response = await fetch(`${API_BASE_URL}/api/users/by-email/${userData.email}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Failed to update user data (Status: ${response.status})`);
      }

      const updatedUser = await response.json();
      console.log('User updated in database successfully:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user in database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      throw error;
    }
  };

  // Handle save button press
  const handleSave =() => {
    if (loading) return;

    const formData = {
      educationalAttainment: selectedOption || '',
      degree: degree.trim(),
      university: university.trim(),
    };

    // Validate educational information
    const errors = validateEducationalInfo(formData);

    if (errors.length > 0) {
      Alert.alert(
        'Validation Error',
        `Please fix the following issues:\n\n• ${errors.join('\n• ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);

    try {
      // Update user data in context
      updateUserData(formData);

      // Update in database
      const completeUpdatedData = {
        ...userData,
        ...formData,
        lastUpdated: new Date().toISOString()
      };

       updateUserInDatabase(completeUpdatedData);

      Alert.alert(
        'Success!',
        'Your educational information has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Update Error',
        `There was an error updating your information: ${errorMessage}. Your changes have been saved locally.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>
            Edit Educational Information
          </Text>
        </View>

        <Text style={{
          fontSize: 23,
          fontWeight: 'bold',
          color: '#000000',
          marginTop: width * 0.1,
          marginLeft: 20,
        }}>
          Educational Background
        </Text>

        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>
              Educational Attainment
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <Pressable
              onPress={() => !loading && setDropdownVisible(!isDropdownVisible)}
              style={styles.dropdownButton}
              disabled={loading}>
              <Text style={{ marginRight: 20 }}>
                {selectedOption || 'Select your educational attainment'}
                <Text style={{ marginLeft: 200 }}> ▼ </Text>
              </Text>
            </Pressable>

            {isDropdownVisible && (
              <View style={{
                maxHeight: 200,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 5,
                marginHorizontal: 15,
                overflow: 'hidden',
              }}>
                <ScrollView style={{ maxHeight: 200 }}>
                  {options.map((option, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedOption(option);
                        setDropdownVisible(false);
                      }}
                      style={styles.dropdownItem}>
                      <Text>{option}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
              Degree
            </Text>
            <TextInput
              placeholder="Enter your degree (e.g., Computer Science)"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={degree}
              onChangeText={setDegree}
              editable={!loading}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
              College/University
            </Text>
            <TextInput
              placeholder="Enter your college/university name"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={university}
              onChangeText={setUniversity}
              editable={!loading}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
          <Pressable onPress={() => navigation.goBack()} disabled={loading}>
            <View style={[styles.nextButton, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleSave} disabled={loading}>
            <View style={[styles.nextButton, loading && { opacity: 0.6 }]}>
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
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
    backgroundColor: '#093FB4',
    paddingTop: height * 0.06,
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  fieldContainer: {
    backgroundColor: '#F1F4F9',
    borderRadius: 12,
    padding: 20,
    marginTop: height * 0.02,
    marginHorizontal: 20,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputFields: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 10, 
    marginTop: 8,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#000',
    minHeight: 45,
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 8,
    marginHorizontal: 15,
    minHeight: 45,
    justifyContent: 'center',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#093FB4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getApiUrl } from '../config/api';
import { useUser, validatePersonalInfo } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditPersonalInfo'>;

const { width, height } = Dimensions.get('window');

export default function EditPersonalInfo({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  // Local form state
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
  const [phoneError, setPhoneError] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState(userData.placeOfBirth || '');
  const [nationality, setNationality] = useState(userData.nationality || 'Filipino');
  const [nationalityError, setNationalityError] = useState('');
  const [temporaryAddress, setTemporaryAddress] = useState(userData.temporaryAddress || '');
  const [permanentAddress, setPermanentAddress] = useState(userData.permanentAddress || '');

  // Gender checkboxes
  const [isMale, setIsMale] = useState(userData.gender === 'Male');
  const [isFemale, setIsFemale] = useState(userData.gender === 'Female');
  const [isPreferNotToSay, setIsPreferNotToSay] = useState(userData.gender === 'Prefer not to say');

  // Marital status checkboxes
  const [isSingle, setIsSingle] = useState(userData.maritalStatus === 'Single');
  const [isMarried, setIsMarried] = useState(userData.maritalStatus === 'Married');
  const [isDivorced, setIsDivorced] = useState(userData.maritalStatus === 'Divorced');
  const [isWidowed, setIsWidowed] = useState(userData.maritalStatus === 'Widowed');

  // Date picker
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(userData.dateOfBirth || new Date());

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle gender selection (only one can be selected)
  const handleGenderSelection = (selectedGender: 'Male' | 'Female' | 'Prefer not to say') => {
    setIsMale(selectedGender === 'Male');
    setIsFemale(selectedGender === 'Female');
    setIsPreferNotToSay(selectedGender === 'Prefer not to say');
  };

  // Handle marital status selection
  const handleMaritalStatusSelection = (selectedStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed') => {
    setIsSingle(selectedStatus === 'Single');
    setIsMarried(selectedStatus === 'Married');
    setIsDivorced(selectedStatus === 'Divorced');
    setIsWidowed(selectedStatus === 'Widowed');
  };

  // Get selected gender
  const getSelectedGender = (): 'Male' | 'Female' | 'Prefer not to say' | '' => {
    if (isMale) return 'Male';
    if (isFemale) return 'Female';
    if (isPreferNotToSay) return 'Prefer not to say';
    return '';
  };

  // Get selected marital status
  const getSelectedMaritalStatus = (): 'Single' | 'Married' | 'Divorced' | 'Widowed' | '' => {
    if (isSingle) return 'Single';
    if (isMarried) return 'Married';
    if (isDivorced) return 'Divorced';
    if (isWidowed) return 'Widowed';
    return '';
  };

  // Phone number validation
  const handlePhoneNumberChange = (text: string) => {
    // Remove all non-numeric characters
    const numericText = text.replace(/\D/g, '');
    setPhoneNumber(numericText);

    // Validate phone number format
    if (numericText.length > 0 && numericText.length < 11) {
      setPhoneError('Phone number must be 11 digits');
    } else if (numericText.length > 11) {
      setPhoneError('Phone number cannot exceed 11 digits');
    } else if (numericText.length === 11 && !numericText.startsWith('09')) {
      setPhoneError('Phone number must start with 09');
    } else {
      setPhoneError('');
    }
  };

  // Nationality validation
  const handleNationalityChange = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
    setNationality(filteredText);

    if (text !== filteredText) {
      setNationalityError('Only letters and spaces are allowed');
    } else {
      setNationalityError('');
    }
  };

  // Update user in database
  const updateUserInDatabase = async (updatedData: any) => {
    try {
      const API_BASE_URL = getApiUrl();
      console.log('Updating user in database at:', API_BASE_URL);
      console.log('Updated data:', JSON.stringify(updatedData, null, 2));

      const response = await fetch(`${API_BASE_URL}/api/users/by-email/${userData.email}`, {
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
  const handleSave = () => {
    if (loading) return;

    // Check for validation errors first
    if (phoneError) {
      Alert.alert(
        'Validation Error',
        'Strictly enter numeric values (ex: 0917000000).',
        [{ text: 'OK' }]
      );
      return;
    }

    if (nationalityError) {
      Alert.alert(
        'Validation Error',
        'Please fix the nationality before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }

    const formData = {
      fullName: fullName.trim(),
      gender: getSelectedGender(),
      dateOfBirth: date,
      placeOfBirth: placeOfBirth.trim(),
      nationality: nationality.trim(),
      maritalStatus: getSelectedMaritalStatus(),
      temporaryAddress: temporaryAddress.trim(),
      permanentAddress: permanentAddress.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    // Validate the form data
    const errors = validatePersonalInfo(formData);

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
        'Your personal information has been updated successfully.',
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
            Edit Personal Information
          </Text>
        </View>

        <Text style={{
          fontSize: 23,
          fontWeight: 'bold',
          color: '#000000',
          marginTop: width * 0.1,
          marginLeft: 20,
        }}>
          Personal Information
        </Text>

        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 2, marginLeft: 20 }}>
              Full Name
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Gender<Text style={{ color: '#DD3737' }}> *</Text>
            </Text>

            <View style={{ flexDirection: 'row', marginTop: height * 0.02, marginLeft: 25 }}>
              <Checkbox
                value={isMale}
                onValueChange={() => handleGenderSelection('Male')}
                color={isMale ? '#4B70E0' : undefined}
                style={styles.checkbox}
                disabled={loading}
              />
              <Text style={styles.checkboxText}>Male</Text>
              
              <Checkbox
                value={isFemale}
                onValueChange={() => handleGenderSelection('Female')}
                color={isFemale ? '#4B70E0' : undefined}
                style={[styles.checkbox, { marginLeft: 10 }]}
                disabled={loading}
              />
              <Text style={styles.checkboxText}>Female</Text>
              
              <Checkbox
                value={isPreferNotToSay}
                onValueChange={() => handleGenderSelection('Prefer not to say')}
                color={isPreferNotToSay ? '#4B70E0' : undefined}
                style={[styles.checkbox, { marginLeft: 10 }]}
                disabled={loading}
              />
              <Text style={styles.checkboxText}>Prefer not to say</Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Date of Birth<Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <Pressable onPress={() => !loading && setShow(true)} style={styles.inputFields}>
              <Text style={{ marginTop: 10, marginLeft: 10, color: date ? '#000' : '#9E9A9A' }}>
                {date ? date.toLocaleDateString() : 'Select your birth date'}
              </Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={show}
              mode="date"
              onConfirm={(selectedDate) => {
                setDate(selectedDate);
                setShow(false);
              }}
              onCancel={() => setShow(false)}
              maximumDate={new Date()}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Place of Birth
            </Text>
            <TextInput
              placeholder="Enter your place of birth"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
              editable={!loading}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Nationality
            </Text>
            <TextInput
              placeholder="Enter your nationality"
              placeholderTextColor="#9E9A9A"
              style={[styles.inputFields, nationalityError ? { borderColor: '#DD3737', borderWidth: 2 } : {}]}
              value={nationality}
              onChangeText={handleNationalityChange}
              editable={!loading}
            />
            {nationalityError ? (
              <Text style={{ color: '#DD3737', fontSize: 14, marginLeft: 20, marginTop: 5 }}>
                {nationalityError}
              </Text>
            ) : null}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Marital Status<Text style={{ color: '#DD3737' }}> *</Text>
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: height * 0.02, marginLeft: 25 }}>
              <View style={{ flexDirection: 'row', width: '50%', marginBottom: 10 }}>
                <Checkbox
                  value={isSingle}
                  onValueChange={() => handleMaritalStatusSelection('Single')}
                  color={isSingle ? '#4B70E0' : undefined}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <Text style={styles.checkboxText}>Single</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%', marginBottom: 10 }}>
                <Checkbox
                  value={isMarried}
                  onValueChange={() => handleMaritalStatusSelection('Married')}
                  color={isMarried ? '#4B70E0' : undefined}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <Text style={styles.checkboxText}>Married</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%', marginBottom: 10 }}>
                <Checkbox
                  value={isDivorced}
                  onValueChange={() => handleMaritalStatusSelection('Divorced')}
                  color={isDivorced ? '#4B70E0' : undefined}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <Text style={styles.checkboxText}>Divorced</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%', marginBottom: 10 }}>
                <Checkbox
                  value={isWidowed}
                  onValueChange={() => handleMaritalStatusSelection('Widowed')}
                  color={isWidowed ? '#4B70E0' : undefined}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <Text style={styles.checkboxText}>Widowed</Text>
              </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Temporary Address
            </Text>
            <TextInput
              placeholder="Enter your temporary address"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={temporaryAddress}
              onChangeText={setTemporaryAddress}
              multiline={true}
              numberOfLines={2}
              editable={!loading}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Permanent Address
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="Enter your permanent address"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={permanentAddress}
              onChangeText={setPermanentAddress}
              multiline={true}
              numberOfLines={2}
              editable={!loading}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Contact Number
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="Example: 09310228903"
              placeholderTextColor="#9E9A9A"
              style={[styles.inputFields, phoneError ? { borderColor: '#DD3737', borderWidth: 2 } : {}]}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
              maxLength={11}
              editable={!loading}
            />
            {phoneError ? (
              <Text style={{ color: '#DD3737', fontSize: 14, marginLeft: 20, marginTop: 5 }}>
                {phoneError}
              </Text>
            ) : null}
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
    marginTop: 20,
    marginHorizontal: 20,
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
    marginTop: 8,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#000',
    minHeight: 45,
  },
  checkbox: {
    borderRadius: width * 1.0,
    width: width * 0.05,
    height: height * 0.03,
    marginTop: height * 0.01,
  },
  checkboxText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 9,
  },
  nextButton: {
    backgroundColor: '#093FB4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 
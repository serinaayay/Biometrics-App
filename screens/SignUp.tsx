import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParamList } from '../navigation/types';
import { useUser, validatePersonalInfo } from '../context/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  // Local form state
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [email, setEmail] = useState(userData.email || '');
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

  // Handle gender selection (only one can be selected)
  const handleGenderSelection = (selectedGender: 'Male' | 'Female' | 'Prefer not to say') => {
    setIsMale(selectedGender === 'Male');
    setIsFemale(selectedGender === 'Female');
    setIsPreferNotToSay(selectedGender === 'Prefer not to say');
  };

  // Handle marital status selection (only one can be selected)
  const handleMaritalStatusSelection = (
    selectedStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed'
  ) => {
    setIsSingle(selectedStatus === 'Single');
    setIsMarried(selectedStatus === 'Married');
    setIsDivorced(selectedStatus === 'Divorced');
    setIsWidowed(selectedStatus === 'Widowed');
  };

  // Handle phone number input with validation
  const handlePhoneNumberChange = (text: string) => {
    // Allow empty string or 'N/A'
    if (text === '' || text.toLowerCase() === 'n/a') {
      setPhoneNumber(text);
      setPhoneError('');
      return; 
    }

    // Remove any spaces, dashes, or parentheses for validation
    const cleanedText = text.replace(/[\s\-\(\)]/g, '').slice(0,11);
    
    // Check if the cleaned text contains only numbers and + symbol (for international format)
    const phoneRegex = /^[\+]?[0-9]*$/;
    
    if (phoneRegex.test(cleanedText)) {
      setPhoneNumber(text);
      setPhoneError('');
    } else {
      // Show error but still update the field to show what user typed
      setPhoneNumber(text);
      setPhoneError('Contact number can only contain numbers, spaces, dashes, parentheses, and + symbol.' +
        'Please ensure that the number only contains 11 numbers.');
    }
  };

  const handleNationality = (text: string) => {
    const validNationalities = ["Filipino", "Katutubo", "Chinese", "American", "Vietnamese", "Japanese", "Korean", "Thai", "Indonesian", "Malaysian", "Singaporean"];
    
    // Case-insensitive validation: check if input matches any valid nationality
    const isValidNationality = validNationalities.some(nationality => 
      nationality.toLowerCase() === text.trim().toLowerCase()
    );
    
    // Convert input to proper case for storage if valid, otherwise keep as typed
    let properCaseText = text.trim();
    if (isValidNationality) {
      const matchedNationality = validNationalities.find(nationality => 
        nationality.toLowerCase() === text.trim().toLowerCase()
      );
      properCaseText = matchedNationality || text.trim();
    }
    
    setNationality(properCaseText);
    
    // Clear error if text is empty or valid (case-insensitive)
    if (text.trim() === '' || isValidNationality) {
      setNationalityError('');
    } else {
      setNationalityError('Please input a valid nationality');
    }
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

  // Handle next button press
  const handleNext = () => {
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
      email: email.trim(),
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

    // Save to context
    updateUserData(formData);

    // Navigate to next screen
    navigation.navigate('SignUp2');
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
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Gender<Text style={{ color: '#DD3737' }}> *</Text>
            </Text>

            <View style={{ flexDirection: 'row', marginTop: height * 0.02, marginLeft: 25 }}>
              <Checkbox
                value={isMale}
                onValueChange={() => handleGenderSelection('Male')}
                color={isMale ? '#4B70E0' : undefined}
                style={{
                  paddingTop: height * 0.02,
                  marginTop: height * 0.02,
                  borderRadius: width * 1.0,
                  width: width * 0.05,
                  height: height * 0.03,
                  flexDirection: 'row',
                }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
                Male
              </Text>
              <Checkbox
                value={isFemale}
                onValueChange={() => handleGenderSelection('Female')}
                color={isFemale ? '#4B70E0' : undefined}
                style={{
                  paddingTop: height * 0.02,
                  marginLeft: 10,
                  marginTop: height * 0.02,
                  borderRadius: width * 1.0,
                  width: width * 0.05,
                  height: height * 0.03,
                  flexDirection: 'row',
                }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
                Female
              </Text>
              <Checkbox
                value={isPreferNotToSay}
                onValueChange={() => handleGenderSelection('Prefer not to say')}
                color={isPreferNotToSay ? '#4B70E0' : undefined}
                style={{
                  paddingTop: height * 0.02,
                  marginLeft: 10,
                  marginTop: height * 0.02,
                  borderRadius: width * 1.0,
                  width: width * 0.05,
                  height: height * 0.03,
                  flexDirection: 'row',
                }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginLeft: 9 }}>
                Prefer not {'\n'} to say
              </Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Date of Birth<Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholderTextColor="#9E9A9A"
              value={date.toLocaleDateString()}
              editable={false}
              style={styles.inputFields}
            />

            <Pressable onPress={() => setShow(true)}>
              <Image
                source={require('../assets/calendar.jpeg')}
                style={{
                  width: width * 0.06,
                  height: height * 0.04,
                  opacity: 100,
                  marginLeft: width * 0.73,
                  marginTop: -width * 0.11,
                }}
              />

              <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={date}
                onConfirm={(selectedDate) => {
                  setDate(selectedDate);
                  setShow(false);
                }}
                onCancel={() => setShow(false)}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            </Pressable>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Place of Birth
            </Text>
            <TextInput
              placeholder="Ex: Manila"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Nationality
            </Text>
            <TextInput
              placeholder="Ex: Filipino"
              placeholderTextColor="#9E9A9A"
              style={[styles.inputFields, nationalityError ? { borderColor: '#DD3737', borderWidth: 2 } : {}]}
              value={nationality}
              onChangeText={handleNationality}
            />
            {nationalityError ? (
              <Text style={{ color: '#DD3737', fontSize: 14, marginLeft: 20, marginTop: 5 }}>
                {nationalityError}
              </Text>
            ) : null}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Marital Status
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: height * 0.02 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                <Checkbox
                  value={isSingle}
                  onValueChange={() => handleMaritalStatusSelection('Single')}
                  color={isSingle ? '#4B70E0' : undefined}
                  style={{
                    marginLeft: 30,
                    borderRadius: width * 1.0,
                    width: width * 0.05,
                    height: height * 0.03,
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Single</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%' }}>
                <Checkbox
                  value={isMarried}
                  onValueChange={() => handleMaritalStatusSelection('Married')}
                  color={isMarried ? '#4B70E0' : undefined}
                  style={{
                    marginLeft: 30,
                    borderRadius: width * 1.0,
                    width: width * 0.05,
                    height: height * 0.03,
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Married</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%', marginTop: 10 }}>
                <Checkbox
                  value={isDivorced}
                  onValueChange={() => handleMaritalStatusSelection('Divorced')}
                  color={isDivorced ? '#4B70E0' : undefined}
                  style={{
                    marginLeft: 30,
                    borderRadius: width * 1.0,
                    width: width * 0.05,
                    height: height * 0.03,
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Divorced</Text>
              </View>

              <View style={{ flexDirection: 'row', width: '50%', marginTop: 10 }}>
                <Checkbox
                  value={isWidowed}
                  onValueChange={() => handleMaritalStatusSelection('Widowed')}
                  color={isWidowed ? '#4B70E0' : undefined}
                  style={{
                    marginLeft: 30,
                    borderRadius: width * 1.0,
                    width: width * 0.05,
                    height: height * 0.03,
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Widowed</Text>
              </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, marginLeft: 20 }}>
              Temporary Address
            </Text>
            <TextInput
              placeholder="Ex: 123 Main Street, City"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={temporaryAddress}
              onChangeText={setTemporaryAddress}
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
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>
              Email Address
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="abcd123@gmail.com"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
            />
            {phoneError ? (
              <Text style={{ color: '#DD3737', fontSize: 14, marginLeft: 20, marginTop: 5 }}>
                {phoneError}
              </Text>
            ) : null}
          </View>
        </View>

        <Pressable onPress={handleNext}>
          <View style={styles.nextButton}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginTop: 10,
                textAlign: 'center',
              }}>
              Next
            </Text>
          </View>
        </Pressable>
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

  inputFields: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    width: width * 0.8,
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 15,
    borderColor: '#DBDBDB',
    borderWidth: 1,
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

  nextButton: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    width: width * 0.5,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2.0,
    height: height * 0.07,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

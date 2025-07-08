import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  ProfileScreen: undefined;
  FormExample: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'FormExample'>;

const FormExampleScreen: React.FC<Props> = ({ navigation, route }) => {
  // Checkbox states
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isOther, setIsOther] = useState(false);

  // Date picker states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Form data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Handle gender selection (only one can be selected)
  const handleGenderSelection = (gender: 'male' | 'female' | 'other') => {
    setIsMale(gender === 'male');
    setIsFemale(gender === 'female');
    setIsOther(gender === 'other');
  };

  // Handle date confirmation
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      fullName,
      email,
      gender: isMale ? 'Male' : isFemale ? 'Female' : isOther ? 'Other' : 'Not selected',
      dateOfBirth: selectedDate.toLocaleDateString(),
    };

    console.log('Form Data:', formData);
    alert(
      `Form submitted!\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nGender: ${formData.gender}\nDate of Birth: ${formData.dateOfBirth}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Form with Checkbox & Date Picker</Text>
        <Text style={styles.subtitle}>
          Demonstrates expo-checkbox and react-native-modal-datetime-picker
        </Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        {/* Gender Selection with Checkboxes */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={isMale}
              onValueChange={() => handleGenderSelection('male')}
              color={isMale ? '#093FB4' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Male</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={isFemale}
              onValueChange={() => handleGenderSelection('female')}
              color={isFemale ? '#093FB4' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Female</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={isOther}
              onValueChange={() => handleGenderSelection('other')}
              color={isOther ? '#093FB4' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Other</Text>
          </View>
        </View>

        {/* Date of Birth with Date Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>

          <TouchableOpacity style={styles.dateButton} onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString()}</Text>
            <Text style={styles.dateButtonIcon}>📅</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={selectedDate}
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
            maximumDate={new Date()} // Can't select future dates
            minimumDate={new Date(1900, 0, 1)} // Can't select before 1900
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Form</Text>
        </TouchableOpacity>

        {/* Navigation Button */}
        <TouchableOpacity
          style={[styles.submitButton, styles.secondaryButton]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.submitButtonText, styles.secondaryButtonText]}>Go Back</Text>
        </TouchableOpacity>

        {/* Usage Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Package Usage:</Text>
          <Text style={styles.infoText}>📦 expo-checkbox: Gender selection</Text>
          <Text style={styles.infoText}>📅 react-native-modal-datetime-picker: Date selection</Text>
          <Text style={styles.infoText}>🎯 Both packages work with TypeScript</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#093FB4',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dateButtonIcon: {
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#093FB4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#093FB4',
  },
  secondaryButtonText: {
    color: '#093FB4',
  },
  infoContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#093FB4',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default FormExampleScreen;

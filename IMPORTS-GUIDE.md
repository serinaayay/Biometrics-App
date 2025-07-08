# Import Guide: expo-checkbox & react-native-modal-datetime-picker

## ✅ Packages Installed

```bash
npm install expo-checkbox react-native-modal-datetime-picker
```

These packages are now available in your `package.json`:
- `expo-checkbox`: Checkbox component for React Native with Expo
- `react-native-modal-datetime-picker`: Cross-platform modal datetime picker

## 📦 How to Import

### expo-checkbox

```typescript
import Checkbox from 'expo-checkbox';
```

### react-native-modal-datetime-picker

```typescript
import DateTimePickerModal from 'react-native-modal-datetime-picker';
```

## 🎯 Basic Usage Examples

### 1. Simple Checkbox

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const MyComponent = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? '#093FB4' : undefined}
      />
      <Text style={{ marginLeft: 10 }}>I agree to terms</Text>
    </View>
  );
};
```

### 2. Multiple Checkboxes (Gender Selection)

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const GenderSelector = () => {
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isOther, setIsOther] = useState(false);

  const handleGenderSelection = (gender: 'male' | 'female' | 'other') => {
    setIsMale(gender === 'male');
    setIsFemale(gender === 'female');
    setIsOther(gender === 'other');
  };

  return (
    <View>
      <Text>Gender:</Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={isMale}
          onValueChange={() => handleGenderSelection('male')}
          color={isMale ? '#093FB4' : undefined}
        />
        <Text style={{ marginLeft: 10 }}>Male</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={isFemale}
          onValueChange={() => handleGenderSelection('female')}
          color={isFemale ? '#093FB4' : undefined}
        />
        <Text style={{ marginLeft: 10 }}>Female</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={isOther}
          onValueChange={() => handleGenderSelection('other')}
          color={isOther ? '#093FB4' : undefined}
        />
        <Text style={{ marginLeft: 10 }}>Other</Text>
      </View>
    </View>
  );
};
```

### 3. Date Picker

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  return (
    <View>
      <Text>Date of Birth:</Text>
      
      <TouchableOpacity 
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          borderRadius: 5,
          marginTop: 5,
        }}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text>{selectedDate.toLocaleDateString()}</Text>
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
  );
};
```

### 4. Time Picker

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeConfirm = (time: Date) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  return (
    <View>
      <Text>Select Time:</Text>
      
      <TouchableOpacity 
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          borderRadius: 5,
          marginTop: 5,
        }}
        onPress={() => setTimePickerVisible(true)}
      >
        <Text>{selectedTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={selectedTime}
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />
    </View>
  );
};
```

## 🎨 Styling Options

### Checkbox Styling

```typescript
<Checkbox
  value={isChecked}
  onValueChange={setChecked}
  color={isChecked ? '#093FB4' : undefined} // Custom color when checked
  style={{
    width: 20,
    height: 20,
    marginRight: 10,
  }}
/>
```

### DateTimePickerModal Props

```typescript
<DateTimePickerModal
  isVisible={isVisible}
  mode="date" // 'date', 'time', or 'datetime'
  date={selectedDate}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  
  // Optional customization
  maximumDate={new Date()}
  minimumDate={new Date(1900, 0, 1)}
  locale="en_GB" // Date format locale
  confirmTextIOS="Confirm"
  cancelTextIOS="Cancel"
  
  // iOS specific
  display="default" // 'default', 'spinner', 'calendar', 'clock'
  
  // Android specific
  buttonTextColorAndroid="#093FB4"
/>
```

## 📱 Complete Working Example

See `screens/FormExampleScreen.tsx` for a complete working example that demonstrates:

- ✅ Multiple checkboxes for gender selection
- ✅ Date picker for date of birth
- ✅ Form validation and submission
- ✅ TypeScript integration
- ✅ Styled components

## 🚀 Usage in Your App

### Add to Navigation Stack

To use the FormExampleScreen in your app, add it to your navigation stack in `App.tsx`:

```typescript
// In App.tsx
import FormExampleScreen from './screens/FormExampleScreen';

// In your Stack.Navigator
<Stack.Screen 
  name="FormExample" 
  component={FormExampleScreen}
  options={{ title: 'Form Example' }}
/>
```

### Navigate to the Screen

```typescript
// From any other screen
navigation.navigate('FormExample');
```

## 📋 Common Patterns for Biometrics App

### User Registration Form

```typescript
// For your SignUp screens
const [personalInfo, setPersonalInfo] = useState({
  fullName: '',
  email: '',
  phoneNumber: '',
  gender: '',
  dateOfBirth: new Date(),
  placeOfBirth: '',
  nationality: 'Filipino',
  maritalStatus: '',
  temporaryAddress: '',
  permanentAddress: '',
});

// Use checkboxes for marital status
const maritalOptions = ['Single', 'Married', 'Divorced', 'Widowed'];

// Use date picker for date of birth
const handleDateSelection = (date: Date) => {
  setPersonalInfo(prev => ({ ...prev, dateOfBirth: date }));
};
```

## ✅ TypeScript Support

Both packages have excellent TypeScript support:

- `expo-checkbox`: Built with TypeScript
- `react-native-modal-datetime-picker`: Has TypeScript definitions

No additional `@types` packages needed!

## 🎉 Ready to Use!

Your biometrics app now has:
- ✅ Working checkbox components
- ✅ Professional date/time pickers
- ✅ TypeScript support
- ✅ Complete examples
- ✅ Integration with React Navigation 
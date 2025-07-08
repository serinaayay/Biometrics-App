# React Navigation Setup Guide

## ✅ Fixed Error: `import { NativeStackScreenProps } from '@react-navigation/native-stack'`

The error has been resolved by installing the necessary React Navigation dependencies.

## 📦 Installed Dependencies

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-gesture-handler
```

These packages are now in your `package.json`:
- `@react-navigation/native`: ^7.1.14
- `@react-navigation/native-stack`: ^7.3.21
- `react-native-screens`: ^4.11.1
- `react-native-gesture-handler`: ^2.27.1
- `react-native-safe-area-context`: 5.4.0 (already existed)

## 🗂️ Navigation Structure

Your app already has navigation set up in `App.tsx`:

```typescript
// Current navigation stack
LogIn -> SignUp -> SignUp2 -> ProfileScreen
```

## 📝 How to Use NativeStackScreenProps

### 1. Define Your Stack Parameters

```typescript
// In App.tsx or navigation/types.ts
export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  ProfileScreen: undefined;
  FingerprintAuth?: {
    userId?: string;
    returnTo?: keyof RootStackParamList;
  };
};
```

### 2. Create Typed Props for Each Screen

```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
```

### 3. Use in Your Screen Component

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  LogIn: undefined;
  ProfileScreen: undefined;
  // ... other screens
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const handleNavigate = () => {
    navigation.navigate('LogIn');
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
```

### 4. Alternative: Extract Navigation Types

You can also extract the navigation and route types:

```typescript
interface ProfileScreenProps {
  navigation: Props['navigation'];
  route: Props['route'];
}

// Then use it like:
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  // Your component code
};
```

## 🎯 Available Navigation Methods

With `NativeStackScreenProps`, you get access to:

### Navigation Methods
- `navigation.navigate('ScreenName')` - Navigate to a screen
- `navigation.push('ScreenName')` - Push a new instance
- `navigation.goBack()` - Go back to previous screen
- `navigation.popToTop()` - Go back to first screen in stack
- `navigation.replace('ScreenName')` - Replace current screen
- `navigation.reset()` - Reset the navigation state

### Route Properties
- `route.name` - Current screen name
- `route.params` - Parameters passed to screen
- `route.key` - Unique key for the screen

## 🗂️ File Structure Created

```
Biometrics-App/
├── navigation/
│   ├── types.ts           # Navigation type definitions
│   └── AppNavigator.tsx   # Alternative navigator setup
├── screens/
│   ├── ProfileScreen.tsx  # Your main profile screen
│   ├── Login.tsx         # Login screen
│   ├── SignUp.tsx        # Sign up screen
│   ├── SignUp2.tsx       # Second sign up screen
│   └── ExampleScreen.tsx # Example showing NativeStackScreenProps usage
└── App.tsx               # Main app with navigation setup
```

## 🔧 Navigation Configuration

Your current `App.tsx` is configured with:

```typescript
<Stack.Navigator 
  initialRouteName="LogIn" 
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="LogIn" component={LogIn} />
  <Stack.Screen name="SignUp" component={SignUp} /> 
  <Stack.Screen name="SignUp2" component={SignUp2} />
  <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
</Stack.Navigator>
```

## 📱 Example Implementation

Check the `screens/ExampleScreen.tsx` file to see a complete example of:
- How to import and use `NativeStackScreenProps`
- Proper TypeScript typing
- Navigation methods usage
- Route parameter handling

## 🚀 Next Steps

1. **Update your existing screens** to use the typed props
2. **Add new screens** to the navigation stack as needed
3. **Configure navigation options** (headers, transitions, etc.)
4. **Add fingerprint authentication screens** if needed

## 🛠️ Common Patterns

### Passing Parameters
```typescript
// Navigate with parameters
navigation.navigate('UserDetails', { userId: '123' });

// Receive parameters
type Props = NativeStackScreenProps<RootStackParamList, 'UserDetails'>;
const UserDetailsScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params; // Fully typed!
};
```

### Navigation with Authentication
```typescript
const handleFingerprintAuth = async () => {
  const result = await authenticateFingerprint();
  if (result.success) {
    navigation.navigate('ProfileScreen');
  }
};
```

## ✅ Error Fixed!

The `NativeStackScreenProps` import error is now resolved. You can use React Navigation with full TypeScript support in your biometrics app! 
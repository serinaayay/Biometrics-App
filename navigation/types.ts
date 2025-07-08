import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define your navigation stack parameters (matching App.tsx)
export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  ProfileScreen: undefined;
  FingerprintAuth?: {
    userId?: string;
    returnTo?: keyof RootStackParamList;
  };
  UserDetails?: {
    userId: string;
  };
};

// Create typed props for each screen
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type SignUp2ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
export type FingerprintAuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FingerprintAuth'
>;
export type UserDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetails'>;

// Export the navigation prop type for use in components
export type NavigationProp = LoginScreenProps['navigation'];

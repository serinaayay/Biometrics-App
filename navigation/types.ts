import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the navigation stack parameters
export type RootStackParamList = {
  LogIn: undefined;
  Password: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  Fingerprint: undefined;
  ProfileScreen: undefined;
  Verify: undefined;
  Verify2: undefined;
  InfoRegister: undefined;
  Submission: undefined;
  FingerprintRegis: undefined;
  Submit: undefined;
  EditPersonalInfo: undefined;
  EditEducationalInfo: undefined;
  EditEmploymentInfo: undefined;
  EditSkills: undefined;
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
export type PasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'Password'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type SignUp2ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;
export type FingerprintScreenProps = NativeStackScreenProps<RootStackParamList, 'Fingerprint'>;
export type VerifyScreenProps = NativeStackScreenProps<RootStackParamList, 'Verify'>;
export type Verify2ScreenProps = NativeStackScreenProps<RootStackParamList, 'Verify2'>;
export type InfoRegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'InfoRegister'>;
export type SubmitScreenProps = NativeStackScreenProps<RootStackParamList, 'Submit'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
export type SubmissionScreenProps = NativeStackScreenProps<RootStackParamList, 'Submission'>;
export type FingerprintRegisScreenProps = NativeStackScreenProps<RootStackParamList, 'FingerprintRegis'>;
export type EditEducationalInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'EditEducationalInfo'>;
export type EditEmploymentInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'EditEmploymentInfo'>;
export type EditPersonalInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'EditPersonalInfo'>;
export type EditSkillsScreenProps = NativeStackScreenProps<RootStackParamList, 'EditSkills'>;



export type FingerprintAuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FingerprintAuth'
>;
export type UserDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetails'>;

// Export the navigation prop type for use in components
export type NavigationProp = LoginScreenProps['navigation'];
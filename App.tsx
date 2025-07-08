import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext';
import LogIn from './screens/Login';
import ProfileScreen from './screens/ProfileScreen';
import SignUp from './screens/SignUp';
import SignUp2 from './screens/SignUp2';
//import Account from "./screens/Account";

// Define the navigation stack parameters
export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  ProfileScreen: undefined;
  //Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUp2" component={SignUp2} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

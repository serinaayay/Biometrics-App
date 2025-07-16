import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FingerprintRegis from 'screens/FingerprintRegis';
import { RegisProvider } from './context/RegisContext';
import { UserProvider } from './context/UserContext';
import { RootStackParamList } from './navigation/types';
import Fingerprint from './screens/Fingerprint';
import InfoRegister from './screens/InfoRegister';
import LogIn from './screens/Login';
import ProfileScreen from './screens/ProfileScreen';
import SignUp from './screens/SignUp';
import SignUp2 from './screens/SignUp2';
import Submit from './screens/Submit';
import Verify from './screens/Verify';
import Verify2 from './screens/Verify2';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RegisProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUp2" component={SignUp2} />
            <Stack.Screen name="Fingerprint" component={Fingerprint} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="Verify2" component={Verify2} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="InfoRegister" component={InfoRegister} />
            <Stack.Screen name="Submit" component={Submit}/>
            <Stack.Screen name="FingerprintRegis" component={FingerprintRegis} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </RegisProvider>
  );
}

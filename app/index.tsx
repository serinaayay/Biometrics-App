import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import registration from '../screens/registration';


const Stack = createNativeStackNavigator();

export default function App() { 
  return (
      <Stack.Navigator initialRouteName=" "
          screenOptions={{
            headerShown: false,
          }}> 

          <Stack.Screen name=" " component={registration}/>

          </Stack.Navigator>
  );
}
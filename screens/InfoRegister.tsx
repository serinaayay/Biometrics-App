import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import '../global.css';
import { RootStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'InfoRegister'>;

const LogInScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.bgColor}>
      <View style={styles.container}>
        <View style = {{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.Title}>Sign Up</Text>
          </View>

          <View style = {{padding: 40}}>
          <Text style={styles.subtitle}>Email</Text>
          <TextInput style={styles.inputBox} placeholder='Enter your email' />
          <View style={{height: 20}} /> 
          <Text style={styles.subtitle}>Password</Text>
          <TextInput style={styles.inputBox} placeholder='Enter your password' />
          <View style={{height: 20}} /> 
          <Text style={styles.subtitle}>Confirm your Password</Text>
          <TextInput style={styles.inputBox} placeholder='Enter your password' />

          <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View
            style={{
              backgroundColor: '#4B70E0',
              borderRadius: 12,
              padding: 4,
              marginTop: 20,
              alignSelf: 'center',
              width: width * 0.7,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', padding: 4 }}>
              Sign Up
            </Text>
          </View>
        </Pressable>

        <View style={styles.separator} />

        <TouchableHighlight onPress={() => alert('Button Pressed!')}>
          <View
            style={{
              backgroundColor: '#2D4078',
              borderRadius: 12,
              padding: 4,
              marginTop: 5,
              marginBottom: 12,
              alignSelf: 'center',
              width: width * 0.7,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', padding: 4 }}>
              Scan Fingerprint
            </Text>
          </View>
        </TouchableHighlight>

        <Pressable onPress={() => navigation.navigate('LogIn')}>
        <Text style={{fontSize: 13, marginTop: 11, textDecorationLine: 'underline'}}>Sign In</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  subtitle:{
    fontSize: 20,
    color: '#213563',
    fontWeight: 'bold',
    //marginLeft: 30,
    //marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 0,
    //ustifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5,
  },
  bgColor: {
    flex: 1,
    padding: 30,
    paddingTop: 150,
    paddingBottom: 180,
    justifyContent: 'center',
    backgroundColor: '#093FB4',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15,
  },
    Title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#213563',
    marginTop: 10,
    marginLeft: 17,
  },
  inputBox: {
    height: 40,
    alignSelf: 'center',
    width: width * 0.66,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  button: {
    height: 40,
    width: width * 0.5,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6EBF3',
  },
});

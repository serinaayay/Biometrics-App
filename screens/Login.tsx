import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import '../global.css';
import { RootStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

const LogInScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.bgColor}>
      <View style={styles.container}>
        <View style = {{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.Title}>Sign In</Text>
        </View>

      <View style = {{padding: 40}}>
        <Text style={styles.subtitle}>Email</Text>
        <TextInput style={styles.inputBox} placeholder='Enter your email' />
        <View style={{height: 25}} />
        <Text style={styles.subtitle}>Password</Text>
        <TextInput style={styles.inputBox} placeholder='Enter your password' />


        <View style={{height: 20}} />
        <View style={styles.separator} />

        <TouchableHighlight onPress={() => alert('Button Pressed!')}>
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
              Log In
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => alert('Button Pressed!')}>
          <View
            style={{
              backgroundColor: '#2D4078',
              borderRadius: 12,
              padding: 4,
              marginTop: 10,
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          onPress={() => navigation.navigate('InfoRegister')}
          style={{
            color: '#000000',
            fontSize: 14,
            fontWeight: '400',
            marginLeft: 5,
            marginTop: 3,
          }}>
          Sign Up
        </Text>
        <Text
          onPress={() => alert('text pressed')}
          style={{
            color: '#000000',
            fontSize: 14,
            fontWeight: '400',
            marginRight: 6,
            marginTop: 3,
          }}>
          Forgot Password?
        </Text>
      </View>
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
    height: height * 0.8, 
    maxHeight: 600, 
    minHeight: 300, 
  },

  bgColor: {
    flex: 1,
    padding: 30,
    paddingTop: 200,
    paddingBottom: 200,
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
    maxWidth: 350, 
    minWidth: 200, 
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

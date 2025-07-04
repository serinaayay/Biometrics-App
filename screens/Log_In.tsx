import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { RootStackParamList } from '../App';
import '../global.css';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;


const LogInScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.bgColor}>
        <View style={{alignItems: 'center', marginBottom:12}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color:'#FFFFFF', marginLeft: 5,}}>Sign In</Text>
        </View>

        <View style={{borderRadius: 12,backgroundColor:'#FFFFFF', padding:4, marginTop: 8, marginBottom: 4 }}>
        
          <Text style={styles.Title}>Email</Text>
          <TextInput style={styles.inputBox} placeholder="Enter your email" />

          <Text style={styles.Title}>Password</Text>
          <TextInput style={styles.inputBox} placeholder="Enter your Password" />

          <TouchableHighlight onPress={() => alert('Button Pressed!')}>
            <View style={{backgroundColor:'#4B70E0', borderRadius:12, padding:4, marginTop: 20, alignSelf: 'center', width: width * 0.7, alignItems: 'center'}}>
              <Text style={{color:'white', fontSize:16, fontWeight:'500',padding:4}}>Log In</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.separator} />

          <TouchableHighlight onPress={() => alert('Button Pressed!')}>
            <View style={{backgroundColor:'#2D4078', borderRadius:12, padding:4, marginTop: 5, marginBottom: 12, alignSelf: 'center', width: width * 0.7, alignItems: 'center',}}>
              <Text style={{color:'white', fontSize:16, fontWeight:'500',padding:4}}>Scan Fingerprint</Text>
            </View>
          </TouchableHighlight>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text onPress={() => navigation.navigate('SignUp')} style={{color:'#6289DD', fontSize:14, fontWeight:'500', marginLeft: 5, marginTop: 3}}>Sign Up</Text>
        <Text onPress={() => alert('text pressed')} style={{color:'#6289DD', fontSize:14, fontWeight:'500', marginRight: 6, marginTop: 3}}>Forgot Password?</Text>
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  bgColor:{
        flex: 1,
        padding: 42,
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
  Title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
        marginLeft: 17,
  },
  inputBox: {
          height: 40,
          marginTop: height * 0.02,
          marginBottom: height * 0.01,
          width: width * 0.7,
          marginLeft: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#E6EBF3',
    },
  button: {
          height: 40,
          width: width * 0.5,
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#E6EBF3',
    },
})
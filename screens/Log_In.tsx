import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { RootStackParamList } from '../App';
import '../global.css';

type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

const LogInScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.bgColor}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'#FFFFFF'}}>Sign In</Text>

        <View style={{ borderRadius: 12,backgroundColor:'#FFFFFF', padding:4, marginTop: 8, marginBottom: 4 }}>
        
        <Text style={styles.Title}>Email</Text>
        <Text className="text-left text-lg font-extrabold">Email</Text>
        <TextInput style={styles.inputBox} placeholder="Enter your email" />

        <Text className="text-left text-lg font-extrabold">Password</Text>
        <TextInput style={styles.inputBox} placeholder="Enter your Password" />

        <TouchableHighlight onPress={() => alert('Button Pressed!')} className='rounded-3xl'>
          <View className="w-[250px] bg-[#4B70E0] rounded-3xl">
            <Text className="text-center text-lg font-extrabold p-2 text-white">Log In</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.separator} />

        <TouchableHighlight onPress={() => alert('Button Pressed!')} className='rounded-3xl'>
          <View className="w-[250px] bg-[#2D4078] rounded-3xl">
            <Text className="text-center text-lg font-extrabold p-2 text-white">Scan Fingerprint</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text onPress={() => navigation.navigate('SignUp')} className="text-[#6289DD] font-black ml-3 mt-3">Sign Up</Text>
        <Text onPress={() => alert('text pressed')} className="text-[#6289DD] font-black mr-3 mt-3">Forgot Password?</Text>
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
        //alignItems: 'center',
        backgroundColor: '#093FB4',
  },
  separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
        marginBottom: 10,
  },
  inputBox: {
          height: 40,
          width:240,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 4,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#E6EBF3',
    },
  button: {
          height: 40,
          width:240,
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#E6EBF3',
    },
})


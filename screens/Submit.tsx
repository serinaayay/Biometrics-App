import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Submit'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  

  return (
    <View style={{flex:1, backgroundColor: "#FFFFFF"}}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.signUpContainer}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Submission</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
      <View style={styles.navNot}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>1</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.navNot}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>2</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.navNow}>
          <View style={styles.navNow2}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>3</Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.68, marginTop: 5, alignSelf: 'center'}}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center'}}>Sign Up</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center', marginLeft: 60}}>Verification</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center', marginLeft: 45 }}>Submission</Text>
      </View>
    </View>
      <View style={styles.container}>
        <View style={styles.green}>
            <Image
              source={require('../assets/accept.png')}
              style={{
                width: 150,
                height: 150,
              }}/>
        </View>
        <Text style={{marginTop:15,paddingLeft:15 ,paddingRight:15 ,color: '#4B8640', fontSize:20, textAlign:'center', fontWeight:'bold'}}>Your Information has been registered successfully!</Text>
      </View>
            
      <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
      <View style={styles.nextButton}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('ProfileScreen')}>Continue</Text>
        </View>
      </Pressable>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
    green:{
        backgroundColor:'#4B8640',
        width:150,
        height:150,
        marginTop: height * 0.09,
        borderRadius:200,

        shadowColor: '#82E974',
        shadowOffset: { width: 0, height: 50},
        shadowOpacity: 2,
        shadowRadius: 1000,
        elevation: 15,

    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: height * 0.3,
    },
  navNow:{
    backgroundColor: '#093FB4',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navNow2:{
    backgroundColor: '#093FB4',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navNot:{
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
        marginVertical: 23,
        borderBottomColor: '#FFFFFF',
        //borderBottomWidth: StyleSheet.hairlineWidth,
        //marginLeft: 15,
        //marginRight: 15,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        width: width * 0.15,
  },
  signUpContainer: {
    bottom: -height * 0.45,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: width * 0.03,
    backgroundColor: '#093FB4',
    alignSelf: 'center',
    marginTop: -height * 0.35,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: height * 0.01,
    marginBottom: height * 0.05,
    width: width * 0.5,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2.0,
    height: height * 0.07,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
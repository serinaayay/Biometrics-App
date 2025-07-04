import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const [isMale, setChecked1] = useState(false);
  const [isFemale, setChecked2] = useState(false);
  const [isPreferNotToSay, setChecked3] = useState(false);
  
  const [isSingle, setChecked4] = useState(false);
  const [isMarried, setChecked5] = useState(false);
  const [isDivorced, setChecked6] = useState(false);
  const [isWidowed, setChecked7] = useState(false);
  
  
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View style={{flex:1, backgroundColor: "#FFFFFF"}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
      </View>
      
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 350, marginLeft: 20 }}>Personal Information</Text>
      <View style={styles.fieldContainer}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 2, marginLeft: 20 }}>Full Name</Text>
            <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#9E9A9A"
                style={styles.inputFields}/>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>
            Gender<Text style={{ color: '#DD3737' }}> *</Text>
          </Text>

          <View style={{ flexDirection: 'row', marginTop: height * 0.02, marginLeft: 25}}>
            <Checkbox
              value={isMale}
              onValueChange={setChecked1}
              color={isMale ? '#4B70E0' : undefined}
              style={{
                paddingTop: height * 0.02,
                marginTop: height * 0.02,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
                flexDirection: 'row',
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
              Male
            </Text>
            <Checkbox
              value={isFemale}
              onValueChange={setChecked2}
              color={isFemale ? '#4B70E0' : undefined}
              style={{
                paddingTop: height * 0.02,
                marginLeft: 10,
                marginTop: height * 0.02,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
                flexDirection: 'row',
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
              Female
            </Text>
            <Checkbox
              value={isPreferNotToSay}
              onValueChange={setChecked3}
              color={isPreferNotToSay ? '#4B70E0' : undefined}
              style={{
                paddingTop: height * 0.02,
                marginLeft: 10,
                marginTop: height * 0.02,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
                flexDirection: 'row',
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginLeft: 9 }}>
              Prefer not {'\n'} to say
            </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>
            Date of Birth<Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
            <TextInput
              placeholderTextColor="#9E9A9A"
              value={date.toLocaleDateString()}
              editable={false}
              style={styles.inputFields}/>

          <Pressable onPress={() => setShow(true)}>
            <Image
              source={require('../assets/calendar.png')}
              style={{
                width: width * 0.06,
                height: height * 0.04,
                opacity: 100,
                marginLeft: width * 0.70,
                marginTop: -40,
              }}/>
            
            <DateTimePickerModal
              isVisible={show}
              mode="date"
              date={date}
              onConfirm={(selectedDate) => {
                setDate(selectedDate);
                setShow(false);
              }}
              onCancel={() => setShow(false)}
            />
          </Pressable>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>
            Place of Birth
          </Text>
          <TextInput
            placeholder="Ex: Manila"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>
            Nationality
          </Text>
          <TextInput
            placeholder="Ex: Filipino"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>Marital Status</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: height * 0.02 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
            <Checkbox
              value={isSingle}
              onValueChange={setChecked4}
              color={isSingle ? '#4B70E0' : undefined}
              style={{
                marginLeft: 30,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Single</Text>
          </View>

          <View style={{ flexDirection: 'row', width: '50%' }}>
            <Checkbox
              value={isMarried}
              onValueChange={setChecked5}
              color={isMarried ? '#4B70E0' : undefined}
              style={{
                marginLeft: 30,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Married</Text>
          </View>

          <View style={{ flexDirection: 'row', width: '50%', marginTop: 10 }}>
            <Checkbox
              value={isDivorced}
              onValueChange={setChecked6}
              color={isDivorced ? '#4B70E0' : undefined}
              style={{
                marginLeft: 30,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Divorced</Text>
          </View>

          <View style={{ flexDirection: 'row', width: '50%', marginTop: 10 }}>
            <Checkbox
              value={isWidowed}
              onValueChange={setChecked7}
              color={isWidowed ? '#4B70E0' : undefined}
              style={{
                marginLeft: 30,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Widowed</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, marginLeft: 20}}>Temporary Address</Text>
          <TextInput
            placeholder="Ex: Filipino"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>Permanent Address
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="Enter your permanent address"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>Email Address
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="abcd123@gmail.com"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>
            
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>SSS Number
            <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
          <TextInput
            placeholder="'N/A' If not applicable"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}/>      

        </View>
      </View>
      
      <Pressable onPress={() => navigation.navigate('SignUp2')}>
      <View style={styles.nextButton}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('SignUp2')}>Next</Text>
        </View>
      </Pressable>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
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

  inputFields:{
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    width: width * 0.8,
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 15,
    borderColor: '#DBDBDB',
    borderWidth: 1,
  },

  fieldContainer: {
    backgroundColor: '#EFF5FF',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 30,
    shadowRadius: 0.1,
    elevation: 0.8,
  },

  nextButton: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
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
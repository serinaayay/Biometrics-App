import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props){
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  
  
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
      </View>
      
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 350, marginLeft: 20 }}>Personal Information</Text>
      <View style={styles.fieldContainer}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>Full Name
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: height * 0.02,
              width: width * 0.8,
              height: height * 0.5,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10
            }}
          />

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10}}>
            Gender<Text style={{ color: '#DD3737' }}> *</Text>
          </Text>

          <View style={{ flexDirection: 'row', marginTop: height * 0.02 }}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#4B70E0' : undefined}
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
              Male
            </Text>
            <Checkbox
              value={isChecked2}
              onValueChange={setChecked2}
              color={isChecked2 ? '#4B70E0' : undefined}
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
              value={isChecked3}
              onValueChange={setChecked3}
              color={isChecked3 ? '#4B70E0' : undefined}
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
              Prefer not to say
            </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25, marginLeft: 10}}>
            Date of Birth<Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
            <TextInput
              placeholderTextColor="#9E9A9A"
              value={date.toLocaleDateString()}
              editable={false}
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingTop: 10,
                marginTop: 10,
                width: width * 0.6,
                backgroundColor: '#FFFFFF',
                alignContent: 'center',
                borderRadius: width * 0.05,
                textAlign: 'left',
                marginLeft: 10
              }}/>
          <Pressable onPress={() => setShow(true)}>
            <Image
              source={require('../assets/calendar.png')}
              style={{
                width: width * 0.06,
                height: height * 0.04,
                opacity: 100,
                marginLeft: width * 0.5,
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

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10}}>
            Place of Birth
          </Text>
          <TextInput
            placeholder="Ex: Manila"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.6,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10,
            }}/>
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10}}>
            Nationality
          </Text>
          <TextInput
            placeholder="Ex: Filipino"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.6,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10
            }}/>
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10}}>Marital Status</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: height * 0.02 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#4B70E0' : undefined}
              style={{
                marginLeft: 10,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Single</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
            <Checkbox
              value={isChecked2}
              onValueChange={setChecked2}
              color={isChecked2 ? '#4B70E0' : undefined}
              style={{
                marginLeft: 10,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Married</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginTop: 10 }}>
            <Checkbox
              value={isChecked3}
              onValueChange={setChecked3}
              color={isChecked3 ? '#4B70E0' : undefined}
              style={{
                marginLeft: 10,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Divorced</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginTop: 10 }}>
            <Checkbox
              value={isChecked4}
              onValueChange={setChecked4}
              color={isChecked4 ? '#4B70E0' : undefined}
              style={{
                marginLeft: 10,
                borderRadius: width * 1.0,
                width: width * 0.05,
                height: height * 0.03,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9 }}>Widowed</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10}}>Temporary Address</Text>
          <TextInput
            placeholder="Ex: Filipino"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.8,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10
            }}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>Permanent Address
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="Enter your permanent address"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.8,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10
            }}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>Email Address
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="abcd123@gmail.com"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.8,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10
            }}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>Contact Number
            <Text style={{ color: '#DD3737' }}> *</Text>
          </Text>
          <TextInput
            placeholder="Enter your permanent address"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingTop: 10,
              marginTop: 10,
              width: width * 0.8,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              textAlign: 'left',
              marginLeft: 10, 
              marginBottom: 15
            }}/>
        </View>
      </View>
      
      <View style={styles.nextButton}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('LogIn')}>Next</Text>
        </View>
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
  fieldContainer: {
    marginTop: height * 0.03,
    marginBottom: height * 0.001,
    width: width * 0.9,
    borderRadius: width * 0.03,
    backgroundColor: '#EFF5FF',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0.3,
    height: height * 1.4,
    alignSelf: 'center',
    alignItems: 'center',
  },

  nextButton: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    width: width * 0.5,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0.3,
    height: height * 0.07,
    alignSelf: 'center',
    alignItems: 'center',
  }
});
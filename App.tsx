import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (newDate: Date) => {
    setDate(newDate);
    setShow(false);
  };

  return (
    <View>
      <View style={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
      </View>
      <Text style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20
      }}>
        Personal Information
      </Text>
      <View style={styles.fieldContainer}> <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Full Name
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#DD3737' }}> * </Text>
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
                backgroundColor: '#FFFFFF',
                alignContent: 'center',
                borderRadius: width * 0.05,
                textAlign: 'left',
              }}/>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Gender
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#DD3737' }}> * </Text>
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
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>Male</Text>
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
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>Female</Text>
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
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>Prefer not to say</Text>
            </View>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }}>Date of Birth
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#DD3737' }}> * </Text>
          </Text>
          <Pressable onPress={() => setShow(true)}>
          <TextInput
              placeholder="MM/DD/YY"
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
              }}
              value={date.toLocaleDateString()}
              editable={false}/>

              <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={date}
                onConfirm={(selectedDate) => {
                  setDate(selectedDate);
                  setShow(false);
                }}
                onCancel={() => setShow(false)}/>        
              
              <Image source={require('./assets/calendar.png')} style={{ 
                width: width * 0.06, 
                height: height * 0.04, 
                opacity: 100,
                marginLeft: 200,
                marginTop: -35,
                }}/>
            </Pressable>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Place of Birth</Text>
            <TextInput
              placeholder="TEST MESSAGE"
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
              }}/>
                    
        </ScrollView>
      </View>
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
    marginTop: -height * 0.4,
    alignItems: 'center',
  },
  fieldContainer: {
    bottom: -height * 0.7,
    width: width * 0.9,
    borderRadius: width * 0.03,
    backgroundColor: '#EFF5FF',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.01,
    shadowRadius: 0.01,
    elevation: 0.3,
    alignSelf: 'center',
    marginTop: -height * 0.25,
    alignItems: 'center',
  },
});

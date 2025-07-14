import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> Try-Luis
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';
import { useUser } from '../context/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props){
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const{userData, resetUserData} = useUser();

<<<<<<< HEAD
  const { userData, resetUserData } = useUser();

  //Checkbox
  const [isMale, setChecked1] = useState(userData.gender === 'Male');
  const [isFemale, setChecked2] = useState(userData.gender === 'Female');
  const [isPreferNotToSay, setChecked3] = useState(userData.gender === 'Prefer not to say');

  const [isSingle, setChecked4] = useState(userData.maritalStatus === 'Single');
  const [isMarried, setChecked5] = useState(userData.maritalStatus === 'Married');
  const [isDivorced, setChecked6] = useState(userData.maritalStatus === 'Divorced');
  const [isWidowed, setChecked7] = useState(userData.maritalStatus === 'Widowed');

  //derives from user input  || gender
  useEffect(() => {
    setChecked1 (userData.gender === 'Male');
    setChecked2 (userData.gender === 'Female');
    setChecked3 (userData.gender === 'Prefer not to say');

    setChecked4 (userData.maritalStatus === 'Single');
    setChecked5 (userData.maritalStatus === 'Married');
    setChecked6 (userData.maritalStatus === 'Divorced');
    setChecked7 (userData.maritalStatus === 'Widowed');

  }, [userData]);

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };


=======
  //Checkbox states based on stored user data
  const [isMale, setChecked1] = useState(userData.gender === 'Male');
  const [isFemale, setChecked2] = useState(userData.gender === 'Female');
  const [isPreferNotToSay, setChecked3] = useState(userData.gender === 'Prefer not to say');

  const [isSingle, setChecked4] = useState(userData.maritalStatus === 'Single');
  const [isMarried, setChecked5] = useState(userData.maritalStatus === 'Married');
  const [isDivorced, setChecked6] = useState(userData.maritalStatus === 'Divorced');
  const [isWidowed, setChecked7] = useState(userData.maritalStatus === 'Widowed');
>>>>>>> Try-Luis

 

  // Update checkbox states when userData changes
  useEffect(() => {
    setChecked1 (userData.gender === 'Male');
    setChecked2 (userData.gender === 'Female');
    setChecked3 (userData.gender === 'Prefer not to say');

    setChecked4 (userData.maritalStatus === 'Single');
    setChecked5 (userData.maritalStatus === 'Married');
    setChecked6 (userData.maritalStatus === 'Divorced');
    setChecked7 (userData.maritalStatus === 'Widowed');

  }, [userData]);

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };



  return (
    <View style={{flex:1, backgroundColor: "#FFFFFF"}}>
<<<<<<< HEAD
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
          <View style={styles.navNot}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>1</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.navNow}>
            <View style={styles.navNow2}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>2</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.navNot}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>3</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, marginTop: 5, paddingLeft:8, paddingRight:8}}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center' }}>Personal{'\n'}Information</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center' }}>Verification</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center' }}>Submission</Text>
        </View>
      </View>


        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: width * 1, marginLeft: 20 }}>Personal Information</Text>
        <View style={styles.fieldContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 1, marginLeft: 10 }}>Full Name</Text>
            <TextInput
              placeholder={(userData.fullName)}
=======
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.signUpContainer}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Verification</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
      <View style={styles.navNot}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>1</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.navNow}>
          <View style={styles.navNow2}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>2</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.navNot}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>3</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.68, marginTop: 5, alignSelf: 'center'}}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center'}}>Sign Up</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center', marginLeft: 60}}>Verification</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center', marginLeft: 45 }}>Submission</Text>
      </View>
    </View>

    <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: width * 1, marginLeft: 20 }}>Personal Information</Text>
        <View style={styles.fieldContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 1, marginLeft: 10 }}>Full Name</Text>
            <TextInput
              placeholder={userData.fullName}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}>
              </TextInput>

            <Text style={styles.topics}>Gender</Text>
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
                                height: height * 0.02,
                                flexDirection: 'row', 
                              }}
                              />
                            <Text style={{ fontSize: 15, color: '#093FB4', fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
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
                                height: height * 0.02,
                                flexDirection: 'row',
                              }}
                            />
                            <Text style={{ fontSize: 15, color: '#9A9A9A',fontWeight: 'bold', marginTop: 15, marginLeft: 9 }}>
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
                                height: height * 0.02,
                                flexDirection: 'row',
                              }}
                            />
                            <Text style={{ fontSize: 15, color: '#9A9A9A', fontWeight: 'bold', marginTop: 10, marginLeft: 9 }}>
                              Prefer not {'\n'} to say
                            </Text>
                </View>
            <Text style={styles.topics}>Date of Birth</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.dateOfBirth ? userData.dateOfBirth.toLocaleDateString() : 'MM/DD/YYYY'}
=======
              placeholder={userData.dateOfBirth ? userData.dateOfBirth.toLocaleDateString() : "MM/DD/YYYY"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}>
              </TextInput>

            <Text style={styles.topics}>Place of Birth</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.placeOfBirth || 'Place of Birth not provided'}
=======
              placeholder={userData.placeOfBirth || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}>
              </TextInput>

            <Text style={styles.topics}>Nationality</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.nationality || 'Nationality not provided'}
=======
              placeholder={userData.nationality || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}>
              </TextInput>

            <Text style={styles.topics}>Martial Status</Text>
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
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9, color:'#9A9A9A' }}>Single</Text>
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
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9, color:'#9A9A9A' }}>Married</Text>
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
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9, color:'#9A9A9A' }}>Divorced</Text>
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
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9, color:'#9A9A9A' }}>Widowed</Text>
                      </View>
                    </View>

            <Text style={styles.topics}>Temporary Address</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.temporaryAddress || 'Temporary Address not provided'}
=======
              placeholder={userData.temporaryAddress || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Permanent Address</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.permanentAddress || 'Permanent Address not provided'}
=======
              placeholder={userData.permanentAddress || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Email Address</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.email || 'Email not provided'}
=======
              placeholder={userData.email || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Contact Number</Text>
            <TextInput
<<<<<<< HEAD
              placeholder={userData.phoneNumber || 'Contact Number not provided'}
=======
              placeholder={userData.phoneNumber || "Not provided"}
>>>>>>> Try-Luis
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

              

        </View>
        <Pressable onPress={() => navigation.navigate('Verify2')}>
                  <View style={styles.nextButton}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('Verify2')}>Continue</Text>
                  </View>
                </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navNow:{
    backgroundColor: '#093FB4',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
<<<<<<< HEAD
    height: 50,
=======
>>>>>>> Try-Luis
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
<<<<<<< HEAD

=======
>>>>>>> Try-Luis
  topics:{
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginLeft: 10
  },
  notPicked:{
    color: '#9A9A9A',
    fontWeight: 'bold', 
    },
  Picked:{
    color: '#093FB4',
    fontWeight: 'bold',
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

  fieldContainer: {
    backgroundColor: '#EFF5FF',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 15,
    marginBottom: 10,
    //alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 30,
    shadowRadius: 0.1,
    elevation: 0.8,
  },

  fieldContainer2: {
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
    marginBottom: height * 0.05,
    width: width * 0.40,
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

  skillsSpacing:{
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start'

  },
  
  inputFields:{
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    width: width * 0.8,
    height: 50,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 15,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    fontWeight: 'bold',

  },
  dropdownList: {
    position: 'absolute',
    top: 65,
    marginLeft: 20,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dropdownButton: {
    paddingLeft: 20,
    paddingVertical: 15,
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    marginLeft: 10,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    height: height * 0.07,
    marginTop: 10
  },
  avatarText: {
<<<<<<< HEAD
      fontSize: width * 0.04,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#093FB4',
    },
});
=======
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#093FB4',
  },
  

});
>>>>>>> Try-Luis

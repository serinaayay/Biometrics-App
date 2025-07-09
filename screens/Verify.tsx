import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Undergraduate/College', 'Vocational '];

export default function HomeScreen({ navigation }: Props){
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  //Checkbox
  const [isMale, setChecked1] = useState(true);
  const [isFemale, setChecked2] = useState(false);
  const [isPreferNotToSay, setChecked3] = useState(false);

  const [isSingle, setChecked4] = useState(true);
  const [isMarried, setChecked5] = useState(false);
  const [isDivorced, setChecked6] = useState(false);
  const [isWidowed, setChecked7] = useState(false);
  

  // for handling user input skills
  const [skills, setSkills] = useState<string[]>([]);
  const [inputSkill, setInputSkill] = useState('');

  const handleSkillInput = () => {
    const trimmed = inputSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setInputSkill('');
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <View style={{flex:1, backgroundColor: "#FFFFFF"}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
        </View>

        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 350, marginLeft: 20 }}>Personal Information</Text>
        <View style={styles.fieldContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 1, marginLeft: 10 }}>Full Name</Text>
            <TextInput
              placeholder="Juanlito Sanlito  Miguelito P. Santiago"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

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
                                height: height * 0.03,
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
                                height: height * 0.03,
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
                                height: height * 0.03,
                                flexDirection: 'row',
                              }}
                            />
                            <Text style={{ fontSize: 15, color: '#9A9A9A', fontWeight: 'bold', marginTop: 10, marginLeft: 9 }}>
                              Prefer not {'\n'} to say
                            </Text>
                </View>
            <Text style={styles.topics}>Date of Birth</Text>
            <TextInput
              placeholder="01/01/2000"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Place of Birth</Text>
            <TextInput
              placeholder="Manila"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Nationality</Text>
            <TextInput
              placeholder="Filipino"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

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
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 9, color:'#093FB4' }}>Single</Text>
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
              placeholder="..."
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Permanent Address</Text>
            <TextInput
              placeholder="Blk 9 Lot 10, Brgy. Sanlito, Santiago City"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Email Address</Text>
            <TextInput
              placeholder="example20@gmail.com"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Contract Number</Text>
            <TextInput
              placeholder="09912609986"
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
});

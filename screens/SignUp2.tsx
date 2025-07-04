import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;

const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Undergraduate/College', 'Vocational '];

export default function HomeScreen({ navigation }: Props){
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);


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

        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 350, marginLeft: 20 }}>Educational Background</Text>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, marginLeft: 10,}}>Educational Attainment
                <Text style={{ color: '#DD3737' }}> *</Text>
              </Text>
              <Pressable onPress={() => setDropdownVisible(!isDropdownVisible)} style={styles.dropdownButton}>
                <Text style={{marginRight: 20}}>{selectedOption || "Select your educational attainment"}
                  <Text style={{marginLeft: 200,}}> ▼ </Text>
                </Text>
              </Pressable>
              
              {isDropdownVisible && (
                <View style={styles.dropdownList}>
                  {options.map((option, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedOption(option);
                        setDropdownVisible(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      <Text>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>Degree</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}/>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>College/University</Text>
            <TextInput
              placeholder="'N/A' if not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}/>
          </View>
        </View>

        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 15, marginLeft: 20 }}>Employment Information</Text>
        <View style={styles.fieldContainer2}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Current Job</Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}/>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Skills</Text>
          
          <TextInput
            value={inputSkill}
            onChangeText={setInputSkill}
            onSubmitEditing={handleSkillInput}
            placeholder="Type a skill you possess"
            placeholderTextColor="#9E9A9A"
            style={styles.inputFields}
            returnKeyType="done"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === ' ' || nativeEvent.key === ',') {
                handleSkillInput();
              }
            }}/>

          <View style={styles.skillsSpacing}>
            {skills.map((skill, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#4B70E0',
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginBottom: 3,
                  marginTop: 10,
                  marginLeft: 15,
                  marginHorizontal:'auto'
                }}>
                <Text style={{ color: '#FFFFFF', marginRight: 33, alignContent: 'center'}}>{skill}</Text>
                <Text style={{ color: '#FFFFFF', marginLeft:40}} onPress={() => removeSkill(index)}>×</Text>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>Work Experience</Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}/>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>SSS Number
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}/>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>    
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View style={styles.nextButton}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('SignUp')}>Back</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.nextButton}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('ProfileScreen')}>Verify</Text>
          </View>
        </Pressable>
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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Verify2'>;

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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 1, marginLeft: 10 }}>Education Attainment</Text>
            <TextInput
              placeholder="Highschool"
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Degree</Text>
            <TextInput
              placeholder="..."
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Collage/University</Text>
            <TextInput
              placeholder="..."
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>
              </View>

              <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 20, marginLeft: 20 }}>Employment Information</Text>
              <View style={styles.fieldContainer}>
              <Text style={styles.topics}>Current Job</Text>
              <TextInput
               placeholder="..."
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.inputFields}/>

               <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, marginTop: 20,  marginLeft: 20}}>
                <Text style={{marginTop:10}}>Others</Text>
                <TextInput
               placeholder="Software Developer"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.jobField}/>
               </View>

               <Text style={styles.topics}>Skills</Text>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, marginTop: 20,  marginLeft: 20}}>
                <TextInput
               placeholder="Communication"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               <TextInput
               placeholder="Collaboration"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               </View>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, marginTop: 15,  marginLeft: 20}}>
                <TextInput
               placeholder="Problem Solving"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               <TextInput
               placeholder="Time Management"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               </View>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, marginTop: 15,  marginLeft: 20}}>
                <TextInput
               placeholder="Adaptability"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               <TextInput
               placeholder="..."
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.skillField}/>
               </View>

               <Text style={styles.topics}>Skills</Text>
               <TextInput
               placeholder="3 Years"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.inputFields}/>
               <Text style={styles.topics}>SSS Number</Text>
               <TextInput
               placeholder="01-1234567-1"
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.inputFields}/>
               
               </View>

        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
                  <View style={styles.nextButton}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('ProfileScreen')}>Profile</Text>
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
  jobField:{
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    width: width * 0.6,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 15,
    paddingLeft: 15,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    fontWeight: 'bold',

  },

  skillField:{
    backgroundColor: '#FFFFFF',
    borderRadius: width * 12,
    width: width * 0.38,
    height: 50,
    //marginLeft: 20,
    //marginRight: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 15,
    //paddingLeft: 15,
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

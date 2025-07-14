import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Verify2'>;

const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Undergraduate/College', 'Vocational '];

const jobChoice = ['Finance/Banking', 'Accounting', 'Admin/Office Support', 'Consulting/Strategy', 'Design/Architecture', 'Education/Training', 
  'Engineering/Manufacturing', 'Healthcare/Medical', 'Hospitality/Travel', 'Human Resources', 'Government/Public Sector', 'Information Technology',
  'Legal/Compliance', 'Marketing/Advertising', 'Media/Entertainment', 'Non-Profit/NGO', 'Real Estate/Property Management', 'Retail/Sales',
  'Science/Research', 'Sports/Fitness', 'Telecommunications', 'Transportation/Logistics','Mining/Resources', 
  'Agriculture/Farming', 'Construction/Trades', 'Self Employed/Freelance', 'Call Center/Customer Service'];

export default function HomeScreen({ navigation }: Props){
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { userData, resetUserData } = useUser();


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


        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: width * 1, marginLeft: 20 }}>Educational Background</Text>
        <View style={styles.fieldContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 1, marginLeft: 10 }}>Educational Attainment</Text>
            <TextInput
              placeholder={userData.educationalAttainment || 'Educational Attainment not provided'}
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>Degree</Text>
            <TextInput
              placeholder={userData.degree || 'Degree not provided'}
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>

            <Text style={styles.topics}>College/University</Text>
            <TextInput
              placeholder={userData.university || 'College/University not provided'}
              placeholderTextColor="#093FB4"
              editable={false}
              style={styles.inputFields}/>
              </View>

              <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 20, marginLeft: 20 }}>Employment Information</Text>
              <View style={styles.fieldContainer}>
              <Text style={styles.topics}>Current Job</Text>
              <TextInput
               placeholder={userData.currentJob }
               placeholderTextColor="#093FB4"
               editable={false}
               style={styles.inputFields}/>

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
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('Submit')}>Submit</Text>
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
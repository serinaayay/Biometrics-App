import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props){
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);

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
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
        </View>

        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 350, marginLeft: 20 }}>Educational Background</Text>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Educational Attainment
              <Text style={{ color: '#DD3737' }}> *</Text>
          </Text> 
            <TextInput //dropdown
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
                marginLeft: 10,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>Degree</Text>
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
                marginLeft: 10,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>College/University</Text>
            <TextInput
              placeholder="'N/A' if not applicable"
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
                marginLeft: 10,
                marginBottom: 15,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            />
          </View>
        </View>

        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000', marginTop: 15, marginLeft: 20 }}>Employment Information</Text>
        <View style={styles.fieldContainer2}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Current Job</Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingTop: 10,
                marginTop: height * 0.02,
                width: width * 0.8,
                height: height * 0.01,
                backgroundColor: '#FFFFFF',
                alignContent: 'center',
                borderRadius: width * 0.05,
                textAlign: 'left',
                marginLeft: 10,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            />

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Skills</Text>
          
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
                }}>
                <Text style={{ color: '#FFFFFF', marginRight: 33, alignContent: 'center'}}>{skill}</Text>
                <Text style={{ color: '#FFFFFF' }} onPress={() => removeSkill(index)}>×</Text>
              </View>
            ))}
          </View>
          
          <TextInput
            value={inputSkill}
            onChangeText={setInputSkill}
            onSubmitEditing={handleSkillInput}
            placeholder="Type a skill you possess"
            placeholderTextColor="#9E9A9A"
            style={{
              flex: 1,
              paddingLeft: 20,
              marginTop: height * 0.02,
              width: width * 0.8,
              height: height * 0.01,
              backgroundColor: '#FFFFFF',
              alignContent: 'center',
              borderRadius: width * 0.05,
              marginLeft: 10,
              borderColor: '#ccc',
              borderWidth: 1,
            }}
            returnKeyType="done"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === ' ' || nativeEvent.key === ',') {
                handleSkillInput();
              }
            }}/>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>Work Experience</Text>
            <TextInput
              placeholder="'N/A' If not applicable"
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
                marginLeft: 10,
                marginBottom: 15,
                borderColor: '#ccc',
                borderWidth: 1,
              }}/>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>SSS Number
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="'N/A' If not applicable"
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
                marginLeft: 10,
                marginBottom: 15,
                borderColor: '#ccc',
                borderWidth: 1,
              }}/>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>    
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View style={styles.nextButton}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('SignUp')}>Back</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('LogIn')}>
          <View style={styles.nextButton}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, textAlign: 'center'}} onPress={() => navigation.navigate('LogIn')}>Verify</Text>
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
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    width: width * 0.9,
    borderRadius: width * 0.03,
    backgroundColor: '#EFF5FF',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0.3,
    height: height * 0.44,
    alignSelf: 'center',
    alignItems: 'center',
  },

  fieldContainer2: {
    marginTop: height * 0.03,
    marginBottom: height * 0.04,
    width: width * 0.9,
    borderRadius: width * 0.03,
    backgroundColor: '#EFF5FF',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0.3,
    height: height * 0.60,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },

  nextButton: {
    marginTop: height * 0.001,
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

  }
});

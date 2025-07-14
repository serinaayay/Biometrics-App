import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useUser, validateEducationalInfo, validateEmploymentInfo } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';


type Props = NativeStackScreenProps<RootStackParamList, 'SignUp2'>;


const { width, height } = Dimensions.get('window');
const options = ['Elementary', 'High School', 'Senior High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'];

const jobChoice = ['Finance/Banking', 'Accounting', 'Admin/Office Support', 'Consulting/Strategy', 'Design/Architecture', 'Education/Training', 
  'Engineering/Manufacturing', 'Healthcare/Medical', 'Hospitality/Travel', 'Human Resources', 'Government/Public Sector', 'Information Technology',
  'Legal/Compliance', 'Marketing/Advertising', 'Media/Entertainment', 'Non-Profit/NGO', 'Real Estate/Property Management', 'Retail/Sales',
  'Science/Research', 'Sports/Fitness', 'Telecommunications', 'Transportation/Logistics','Mining/Resources', 
  'Agriculture/Farming', 'Construction/Trades', 'Self Employed/Freelance', 'Call Center/Customer Service'];

export default function HomeScreen({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  // Local form state
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userData.educationalAttainment || null
  );

  const [selectedJobChoice, setSelectedJob] = useState<string | null>(null);


  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isjobDropdown, setJobDropdown] = useState(false);
  const [isOther, setIsOther] = useState(userData.currentJob === 'Others' || false );
  const [degree, setDegree] = useState(userData.degree || '');
  const [university, setUniversity] = useState(userData.university || '');
  const [currentJob, setCurrentJob] = useState(userData.currentJob || '');
  const [workExperience, setWorkExperience] = useState(userData.workExperience || '');
  const [sssNumber, setSssNumber] = useState(userData.sssNumber || '');
  const [sssNumberError, setSssNumberError] = useState('');
  

  // for handling user input skills
  const [skills, setSkills] = useState<string[]>(userData.skills || []);
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

  const handleSSSNumberChange = (text: string): void => {
      // Allow empty string or 'N/A'
      if (text === '' || text.toLowerCase() === 'n/a') {
        setSssNumber(text);
        setSssNumberError('');
        return;
      }

      const digitsOnly = text.replace(/[^0-9]/g, '');

      if (digitsOnly === '') {
        setSssNumber('');
        setSssNumberError('SSS number must be 10 digits and follow the format ##-#######-#');
        return;
      }
      const prevCleaned = sssNumber.replace(/[^0-9]/g, '');
        // Remove all non-numerical chars
      const cleaned = text.replace(/[^0-9]/g, '');

      const sliced = cleaned.slice(0, 10);

      let formatted = sliced;
      if (sliced.length >= 3 && sliced.length <= 9) {
          formatted = `${sliced.slice(0, 2)}-${sliced.slice(2)}`;
      } else if (sliced.length === 10) {
          formatted = `${sliced.slice(0, 2)}-${sliced.slice(2, 9)}-${sliced.slice(9)}`;
      }

       if (cleaned.length < prevCleaned.length) {
        setSssNumber(text);
        return;
      }

      setSssNumber(formatted);

      if (sliced.length === 10) {
          setSssNumberError('');
      } else {
          setSssNumberError('SSS number must be 10 digits and must follow this format: ##-#######-#');
      }
  };

  // Function to save user data to MongoDB
  const saveUserToDatabase = async (completeUserData: any) => {
    try {
     
      const API_BASE_URL = 'http://192.168.68.146:5001';
      
      console.log('Attempting to save user to database at:', API_BASE_URL);
      console.log('User data:', JSON.stringify(completeUserData, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeUserData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Failed to save user data (Status: ${response.status})`);
      }

      const savedUser = await response.json();
      console.log('✅ User saved to database successfully:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('❌ Error saving user to database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      throw error;
    }
  };

  // Handle verify button press
  const handleVerify = async () => {
    const formData = {
      educationalAttainment: selectedOption || '',
      degree: degree.trim(),
      university: university.trim(),
      currentJob: selectedJobChoice || '', // Use selectedOption2 for currentJob,
      skills: skills,
      workExperience: workExperience.trim(),
      sssNumber: sssNumber.trim(),
      otherJob: selectedJobChoice || '',
      finalJob: selectedOption === 'Others' ? currentJob : selectedJobChoice || '',
      isVerified: true, // Mark as verified when completing signup
    };

    // Validate educational information
    const educationalErrors = validateEducationalInfo(formData);
    const employmentErrors = validateEmploymentInfo(formData);
    const allErrors = [...educationalErrors, ...employmentErrors];

    if (allErrors.length > 0) {
      Alert.alert(
        'Validation Error',
        `Please fix the following issues:\n\n• ${allErrors.join('\n• ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    console.log('currentJob:', currentJob);
    console.log('selectedJobChoice:', selectedJobChoice);
    console.log('otherJob:', selectedJobChoice === 'Others' ? currentJob : selectedJobChoice);


    // Save to context
    updateUserData(formData);

    // Prepare complete user data for database
    const completeUserData = {
      // Use fullName directly
      fullName: userData.fullName || '',
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      placeOfBirth: userData.placeOfBirth || '',
      nationality: userData.nationality || 'Filipino',
      maritalStatus: userData.maritalStatus,
      temporaryAddress: userData.temporaryAddress || '',
      permanentAddress: userData.permanentAddress,
      
      
      // Educational information
      educationalAttainment: selectedOption || '',
      degree: degree.trim(),
      university: university.trim(),
      
      // Employment information  
      currentJobTitle: selectedJobChoice || '', // Note: model expects currentJobTitle, not currentJob// Store 'Others' if selected
      otherJob: selectedJobChoice || '',
      finalJob: selectedOption === 'Others' ? currentJob : selectedJobChoice,
      skills: skills,
      workExperience: workExperience.trim() ? parseInt(workExperience.trim()) || 0 : 0, // Convert to number
      sssNumber: sssNumber.trim(),
      
      // Account status
      isVerified: true,
      isActive: true,
      fingerprintEnabled: false, // Will be enabled when fingerprint is registered
      
      // Temporary fix for database constraint
      fingerprintId: Date.now().toString(), // Use timestamp as unique ID
    };

    try {
      // Save to MongoDB database
      const savedUser = await saveUserToDatabase(completeUserData);
      
      Alert.alert(
        'Registration Complete!',
        `Welcome ${userData.fullName}! Your profile has been created successfully and saved to the database.`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('ProfileScreen'),
          },
        ]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Registration Error',
        `Your profile was created locally, but there was an error saving to the database: ${errorMessage}. Please check your internet connection and try again.`,
        [
          {
            text: 'Continue Offline',
            onPress: () => navigation.navigate('Verify'),
          },
          {
            text: 'Try Again',
            onPress: () => handleVerify(),
          },
        ]
      );
    }
    
  };

  // Removed unused renderItem function that referenced undefined onSelect.

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
          <View style={styles.navNow}>
            <View style={styles.navNow2}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>1</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.navNot}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093FB4' }}>2</Text>
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

        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: '#000000',
            marginTop: width * 1,
            marginLeft: 20,
          }}>
          Educational Background
        </Text>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>
              Educational Attainment
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <Pressable
              onPress={() => setDropdownVisible(!isDropdownVisible)}
              style={styles.dropdownButton}>
              <Text style={{ marginRight: 20 }}>
                {selectedOption || 'Select your educational attainment'}
                <Text style={{ marginLeft: 200 }}> ▼ </Text>
              </Text>
            </Pressable>

            {isDropdownVisible && (
              <View style={{ 
                  maxHeight: 200,
                  backgroundColor: '#fff', 
                  borderWidth: 1, 
                  borderColor: '#ccc', 
                  borderRadius: 5,
                  marginTop: 5,
                  overflow: 'hidden',
                }}>
                {options.map((option, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedOption(option);
                      setDropdownVisible(false);
                    }}
                    style={styles.dropdownItem}>
                    <Text>{option}</Text>
                  </Pressable>
                ))}
              </View>
            )}

             <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
              Degree
            </Text>
            <TextInput
              placeholder="Enter your degree (e.g., Computer Science)"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={degree}
              onChangeText={setDegree}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
              College/University
            </Text>
            <TextInput
              placeholder="'N/A' if not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={university}
              onChangeText={setUniversity}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: '#000000',
            marginTop: 15,
            marginLeft: 20,
          }}>
          Employment Information
        </Text>
        <View style={styles.fieldContainer2}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>
              Current Job
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <Pressable
              onPress={() => setJobDropdown(!isjobDropdown)}
              style={styles.dropdownButton}>
              <Text style={{ marginRight: 20 }}>
                {selectedJobChoice || 'Select your current job'}
                <Text style={{ marginLeft: 200 }}> ▼ </Text>
              </Text>
            </Pressable>

            {isjobDropdown && (
              <View style={{ 
                  maxHeight: 200,
                  backgroundColor: '#fff', 
                  borderWidth: 1, 
                  borderColor: '#ccc', 
                  borderRadius: 5,
                  marginTop: 5,
                  overflow: 'hidden',
                }}>
                {jobChoice.map((option2, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedJob(option2);
                      setJobDropdown(false);
                    }}
                    style={styles.dropdownItem}>
                    <Text>{option2}</Text>
                  </Pressable>
                ))}
              </View>
            )}

          <View style={{ flexDirection: 'row', marginTop: height * 0.0001, marginBottom: height * 0.01, marginLeft: 10}}>
            <Checkbox
                value={isOther}
                onValueChange={(newValue) => {
                setIsOther(newValue);
                if (newValue) {
                  setSelectedJob('Others');
                  setCurrentJob('Others');
                } else {
                  setSelectedJob(selectedJobChoice);
                  setCurrentJob('');
                }
              }}
                color={isOther ? '#4B70E0' : undefined}
                style={{
                  paddingTop: height * 0.02,
                  marginLeft: 10,
                  marginTop: height * 0.02,
                  borderRadius: width * 1.0,
                  width: width * 0.05,
                  height: height * 0.02,
                  flexDirection: 'row',
              }}/>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 9,}}>Others</Text>
          </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
              Skills
            </Text>

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
              }}
            />

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
                    marginHorizontal: 'auto',
                  }}>
                  <Text style={{ color: '#FFFFFF', marginRight: 33, alignContent: 'center' }}>
                    {skill}
                  </Text>
                  <Text
                    style={{ color: '#FFFFFF', marginLeft: 40 }}
                    onPress={() => removeSkill(index)}>
                    ×
                  </Text>
                </View>
              ))}
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
              Work Experience
            </Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={styles.inputFields}
              value={workExperience}
              onChangeText={setWorkExperience}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
              SSS Number
              <Text style={{ color: '#DD3737' }}> *</Text>
            </Text>
            <TextInput
              placeholder="'N/A' If not applicable"
              placeholderTextColor="#9E9A9A"
              style={[
                styles.inputFields,
                sssNumberError ? { borderColor: '#DD3737', borderWidth: 2 } : {},
              ]}
              value={sssNumber}
              onChangeText={handleSSSNumberChange}
              keyboardType="default"
              maxLength={12}/>
            {sssNumberError ? (
              <Text style={{
                color: '#DD3737',
                fontSize: 14,
                marginLeft: 10,
                marginTop: 5,
                marginRight: 10,
                flexWrap: 'wrap'
              }}>
                {sssNumberError}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <View style={styles.nextButton}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                Back
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Verify')}>
            <View style={styles.nextButton}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                Verify
              </Text>
            </View>
          </Pressable>
        </View>
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
    width: width * 0.4,
    borderRadius: width * 0.05,
    backgroundColor: '#4B70E0',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2.0,
    height: height * 0.07,
    alignSelf: 'center',
    alignItems: 'center',
  },

  skillsSpacing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  inputFields: {
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
    marginTop: 10,
  },
});
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { getApiUrl } from '../config/api';
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditSkills'>;

const { width, height } = Dimensions.get('window');

export default function EditSkills({ navigation }: Props) {
  const { userData, updateUserData } = useUser();

  // Local form state
  const [skills, setSkills] = useState<string[]>(userData.skills || []);
  const [inputSkill, setInputSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSkillInput = () => {
    const trimmed = inputSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInputSkill('');
    } else if (skills.includes(trimmed)) {
      Alert.alert('Duplicate Skill', 'This skill has already been added.');
    } else {
      Alert.alert('Invalid Input', 'Please enter a skill name.');
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  // Update user in database
  const updateUserInDatabase = async (updatedData: any) => {
    try {
      const API_BASE_URL = getApiUrl();
      console.log('Updating user in database at:', API_BASE_URL);
      console.log('Updated data:', JSON.stringify(updatedData, null, 2));

      const response = await fetch(`${API_BASE_URL}/api/users/by-email/${userData.email}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Failed to update user data (Status: ${response.status})`);
      }

      const updatedUser = await response.json();
      console.log('User updated in database successfully:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user in database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      throw error;
    }
  };

  // Handle save button press
  const handleSave = () => {
    if (loading) return;

    const formData = {
      skills: skills,
    };

    setLoading(true);

    try {
      // Update user data in context
      updateUserData(formData);

      // Update in database
      const completeUpdatedData = {
        ...userData,
        ...formData,
        lastUpdated: new Date().toISOString()
      };

      updateUserInDatabase(completeUpdatedData);

      Alert.alert(
        'Success!',
        'Your skills have been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Update Error',
        `There was an error updating your skills: ${errorMessage}. Your changes have been saved locally.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.signUpContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>
            Edit Skills
          </Text>
        </View>

        <Text style={{
          fontSize: 23,
          fontWeight: 'bold',
          color: '#000000',
          marginTop: width * 0.1,
          marginLeft: 20,
        }}>
          Skills
        </Text>

        <View style={styles.fieldContainer}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>
              Add Skills
            </Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 5, marginLeft: 10, marginBottom: 10 }}>
              Enter your skills one by one and tap "Add Skill" for each one
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
              <TextInput
                placeholder="Enter a skill (e.g., JavaScript, Communication)"
                placeholderTextColor="#9E9A9A"
                style={[styles.inputFields, { flex: 1, marginHorizontal: 0, marginRight: 10 }]}
                value={inputSkill}
                onChangeText={setInputSkill}
                editable={!loading}
                onSubmitEditing={handleSkillInput}
                returnKeyType="done"
              />
              <Pressable
                onPress={handleSkillInput}
                disabled={loading || !inputSkill.trim()}
                style={[
                  styles.addButton,
                  (!inputSkill.trim() || loading) && { opacity: 0.5 }
                ]}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 10, marginBottom: 10 }}>
              Your Skills ({skills.length})
            </Text>

            <View style={styles.skillsContainer}>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <View key={index} style={styles.skillPill}>
                    <Text style={styles.skillText}>{skill}</Text>
                    <Pressable
                      onPress={() => removeSkill(index)}
                      style={styles.removeButton}
                      disabled={loading}>
                      <Text style={styles.removeButtonText}>×</Text>
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text style={styles.noSkillsText}>No skills added yet. Add some skills above!</Text>
              )}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
          <Pressable onPress={() => navigation.goBack()} disabled={loading}>
            <View style={[styles.nextButton, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleSave} disabled={loading}>
            <View style={[styles.nextButton, loading && { opacity: 0.6 }]}>
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    backgroundColor: '#093FB4',
    paddingTop: height * 0.06,
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  fieldContainer: {
    backgroundColor: '#F1F4F9',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: height * 0.02,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputFields: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 15,
    marginTop: 8,
    fontSize: 16,
    color: '#000',
    minHeight: 45,
  },
  addButton: {
    backgroundColor: '#4B70E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 10,
  },
  skillPill: {
    backgroundColor: '#4B70E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  skillText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  noSkillsText: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#093FB4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
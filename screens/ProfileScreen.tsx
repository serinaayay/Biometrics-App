import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { userData, resetUserData } = useUser();
  const styles = getStyles(width);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Reset user data
          resetUserData();

          // Navigate to Login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
          });

          // Show success message
          Alert.alert('Success', 'You have been logged out successfully!');
        },
      },
    ]);
  };

  const handleEdit = () => {
    Alert.alert('Edit', 'Edit functionality will be available soon!');
  };

  // Helper functions to format data
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getDisplayName = (): string => {
    return userData.fullName || 'User';
  };

  const getDisplayValue = (value: string | undefined, fallback: string = 'N/A'): string => {
    return value?.trim() || fallback;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require('../assets/icon.png')} style={styles.profileImage} />
          <Text style={styles.headerTitle}>User Profile Dashboard</Text>
        </View>
      </View>
      <View style={styles.headerContent2}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={width * 0.2} color="#4C6FFF" />
          <Text style={styles.avatarText}>Welcome, {getDisplayName()}!</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarContent}>{getDisplayValue(userData.email)}</Text>
        </View>
        <Text style={styles.avatarContent}>{getDisplayValue(userData.phoneNumber)}</Text>
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>
            {userData.isVerified ? 'Verified User' : 'Pending Verification'}
          </Text>
        </View>
      </View>
      <View style={styles.headerContent2}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity style={styles.sectionpill} onPress={handleEdit}>
            <Text style={styles.sectionpillText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pillHeaderRow}>
          <View style={styles.pillHeaderField}>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Gender:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Date of Birth:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Place of Birth:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Nationality:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Marital Status:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Temporary Address:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Permanent Address:
            </Text>
          </View>
          <View style={styles.pillHeaderField2}>
            <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">
              {getDisplayValue(userData.gender)}
            </Text>
            <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">
              {formatDate(userData.dateOfBirth)}
            </Text>
            <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">
              {getDisplayValue(userData.placeOfBirth)}
            </Text>
            <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">
              {getDisplayValue(userData.nationality)}
            </Text>
            <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">
              {getDisplayValue(userData.maritalStatus)}
            </Text>
            <Text
              style={styles.sectionpillcontent2}
              numberOfLines={1}
              ellipsizeMode="tail"
              onPress={() => {
                if (userData.temporaryAddress) {
                  Alert.alert('Temporary Address', userData.temporaryAddress);
                }
              }}>
              {getDisplayValue(userData.temporaryAddress)}
            </Text>
            <Text
              style={styles.sectionpillcontent2}
              numberOfLines={1}
              ellipsizeMode="tail"
              onPress={() => {
                if (userData.permanentAddress) {
                  Alert.alert('Permanent Address', userData.permanentAddress);
                }
              }}>
              {getDisplayValue(userData.permanentAddress)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.headerContent2}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Educational Background</Text>
          <TouchableOpacity style={styles.sectionpill} onPress={handleEdit}>
            <Text style={styles.sectionpillText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pillHeaderRow}>
          <View style={styles.pillHeaderField}>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Educational Attainment:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Degree:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              College/University:
            </Text>
          </View>
          <View style={styles.pillHeaderField2}>
            <Text style={styles.sectionpillcontent2}>
              {getDisplayValue(userData.educationalAttainment)}
            </Text>
            <Text style={styles.sectionpillcontent2}>{getDisplayValue(userData.degree)}</Text>
            <Text style={styles.sectionpillcontent2} numberOfLines={2}>
              {getDisplayValue(userData.university)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.headerContent2}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <TouchableOpacity style={styles.sectionpill} onPress={handleEdit}>
            <Text style={styles.sectionpillText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {userData.skills && userData.skills.length > 0 ? (
            userData.skills.map((skill, index) => (
              <View key={index} style={styles.skillPill}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noSkillsText}>No skills added yet</Text>
          )}
        </View>
      </View>
      <View style={styles.headerContent2}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Employment Information</Text>
          <TouchableOpacity style={styles.sectionpill} onPress={handleEdit}>
            <Text style={styles.sectionpillText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pillHeaderRow}>
          <View style={styles.pillHeaderField}>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Current Job Title:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              Work Experience:
            </Text>
            <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">
              SSS Number:
            </Text>
          </View>
          <View style={styles.pillHeaderField2}>
            <Text style={styles.sectionpillcontent2}>{getDisplayValue(userData.currentJob)}</Text>
            <Text style={styles.sectionpillcontent2}>
              {getDisplayValue(userData.workExperience)}
            </Text>
            <Text style={styles.sectionpillcontent2}>{getDisplayValue(userData.sssNumber)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

function getStyles(width: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#093FB4',
      paddingTop: width * 0.1,
      paddingBottom: width * 0.025,
      paddingHorizontal: width * 0.05,
      marginBottom: width * 0.012,
    },
    headerContent: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: width * 0.3,
    },
    headerContent2: {
      backgroundColor: '#F1F4F9',
      borderRadius: width * 0.025,
      paddingTop: width * 0.05,
      paddingBottom: width * 0.08,
      paddingHorizontal: width * 0.025,
      marginTop: width * 0.04,
      marginBottom: width * 0.025,
      marginLeft: width * 0.05,
      marginRight: width * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
    },
    pillContainer: {
      backgroundColor: '#093FB4',
      borderRadius: width * 0.08,
      width: width * 0.7,
      height: width * 0.15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: width * 0.04,
    },
    pillText: {
      fontSize: width * 0.055,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    sectionpillText: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    profileImage: {
      width: width * 0.16,
      height: width * 0.16,
      borderRadius: width * 0.08,
      marginBottom: width * 0.025,
    },
    headerTitle: {
      fontSize: width * 0.05,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    sectionTitle: {
      flex: 1,
      fontSize: width * 0.055,
      fontWeight: '800',
      color: '#4B70E0',
      textAlign: 'left',
      marginLeft: width * 0.025,
      marginBottom: width * 0.012,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: width * 0.025,
    },
    pillHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: width * 0.025,
    },
    pillHeaderField: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginHorizontal: width * 0.025,
      minWidth: width * 0.3,
      maxWidth: width * 0.45,
    },
    pillHeaderField2: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: width * 0.025,
      minWidth: width * 0.3,
      maxWidth: width * 0.45,
    },
    sectionpill: {
      backgroundColor: '#093FB4',
      borderRadius: width * 0.1,
      minWidth: width * 0.18,
      maxWidth: width * 0.28,
      height: width * 0.09,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      paddingHorizontal: width * 0.03,
      flexShrink: 1,
    },
    sectionpillcontent: {
      fontSize: width * 0.04,
      color: '#000000',
      textAlign: 'left',
      marginTop: width * 0.025,
      width: '100%',
      flex: 1,
      flexShrink: 1,
    },
    sectionpillcontent2: {
      fontSize: width * 0.04,
      color: '#000000',
      textAlign: 'right',
      marginTop: width * 0.025,
      marginLeft: width * 0.04,
      width: '100%',
      fontWeight: 'bold',
      flex: 0,
    },
    content: {
      padding: width * 0.05,
    },
    avatarContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: width * 0.04,
    },
    avatarText: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    avatarContent: {
      fontSize: width * 0.04,
      fontWeight: '300',
      marginLeft: width * 0.025,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: width * 0.012,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: width * 0.025,
      justifyContent: 'flex-start',
    },
    skillPill: {
      backgroundColor: '#4B70E0',
      borderRadius: width * 0.07,
      paddingHorizontal: width * 0.05,
      paddingVertical: width * 0.02,
      marginRight: width * 0.03,
      marginBottom: width * 0.03,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
    },
    skillText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: width * 0.04,
      textAlign: 'center',
    },
    noSkillsText: {
      color: '#666',
      fontStyle: 'italic',
      fontSize: width * 0.04,
      textAlign: 'center',
      width: '100%',
    },
    logoutButton: {
      backgroundColor: '#E74C3C',
      borderRadius: width * 0.07,
      paddingVertical: width * 0.03,
      paddingHorizontal: width * 0.18,
      alignSelf: 'center',
      marginTop: width * 0.08,
      marginBottom: width * 0.08,
    },
    logoutButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: width * 0.045,
      textAlign: 'center',
    },
  });
}

export default ProfileScreen;
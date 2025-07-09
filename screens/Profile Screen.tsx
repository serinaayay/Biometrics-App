import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const ProfileScreen: React.FC = () => {
    const { width } = useWindowDimensions();
    const styles = getStyles(width);

    const handleLogout = () => {
        Alert.alert('Logout', 'You have been logged out!');
    };
    const handleEdit = () => {
        Alert.alert('Edit', 'You have sucessfully edited your profile!');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    
                    <Text style={styles.headerTitle}>User Profile Dashboard</Text>
                </View>
            </View>
            <View style={styles.headerContent2}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle" size={width * 0.2} color="#4C6FFF" />
                    <Text style={styles.avatarText}>Welcome, Lebron James!</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarContent}>lebronjames23@gmail.com</Text>
                </View>
                <Text style={styles.avatarContent}>+63 915 455 2251</Text>
                <View style={styles.pillContainer}>
                    <Text style={styles.pillText}>Verified User</Text>
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
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Gender:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Date of Birth:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Place of Birth:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Nationality:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Marital Status:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Temporary Address:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Permanent Address:</Text>
                    </View>
                    <View style={styles.pillHeaderField2}>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Male</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">2002-08-30</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Muntinlupa City</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Filipino</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Single</Text>
                        <Text
                            style={styles.sectionpillcontent2}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            onPress={() => Alert.alert('Temporary Address', 'Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City')}
                        >
                            Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City
                        </Text>
                        <Text
                            style={styles.sectionpillcontent2}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            onPress={() => Alert.alert('Permanent Address', 'Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City')}
                        >
                            Blk 10 Lt 13 Moscow Street, Cresta Bonita Subdivision, Muntinlupa City
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
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Educational Attainment:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Degree:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">College/University:</Text>
                    </View>
                    <View style={styles.pillHeaderField2}>
                        <Text style={styles.sectionpillcontent2}>Bachelor's Degree</Text>
                        <Text style={styles.sectionpillcontent2}>Computer Science</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={2}>De La Salle University Dasmariñas</Text>
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
                    {['AWS', 'JavaScript', 'Python', 'React Native', 'MongoDB', 'Node.js'].map(skill => (
                        <View key={skill} style={styles.skillPill}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
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
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Current Job Title:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Work Experience:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">SSS Number:</Text>
                    </View>
                    <View style={styles.pillHeaderField2}>
                        <Text style={styles.sectionpillcontent2}>Basketball Player</Text>
                        <Text style={styles.sectionpillcontent2}>23 years</Text>
                        <Text style={styles.sectionpillcontent2}>1234567890</Text>
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
            flex:1,
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
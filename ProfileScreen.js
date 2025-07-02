import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={require('./assets/icon.png')} style={styles.profileImage} />
                    <Text style={styles.headerTitle}>User Profile Dashboard</Text>
                </View>
            </View>
            <View style={styles.headerContent2}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle" size={80} color="#4C6FFF" />
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
                    <View style={styles.sectionpill}>
                        <Text style={styles.sectionpillText}>Edit</Text>
                    </View>
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
                    <View style={styles.sectionpill}>
                        <Text style={styles.sectionpillText}>Edit</Text>
                    </View>
                </View>
                <View style={styles.pillHeaderRow}>
                    <View style={styles.pillHeaderField}>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Educational Attainment:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">Degree:</Text>
                        <Text style={styles.sectionpillcontent} numberOfLines={1} ellipsizeMode="tail">College/University:</Text>
                    </View>
                    <View style={styles.pillHeaderField2}>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Bachelor's Degree</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">Bachelor's Degree</Text>
                        <Text style={styles.sectionpillcontent2} numberOfLines={1} ellipsizeMode="tail">De La Salle University</Text>
                    </View>
                </View>
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#093FB4',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    headerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
    },
    headerContent2: {
        backgroundColor: '#F1F4F9',
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pillContainer: {
        backgroundColor: '#093FB4',
        borderRadius: 30,
        width: 280,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    pillText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    sectionpillText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#4B70E0',
        textAlign: 'left',
        marginLeft:10,
        marginBottom: 5,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    pillHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    pillHeaderField: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        minWidth: 120,
        maxWidth: 180,
    },
    pillHeaderField2: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 10,
        minWidth: 120,
        maxWidth: 160,
    },
    sectionpill: {
        backgroundColor: '#4B70E0',
        borderRadius: 40,
        width: 80,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
    },
    sectionpillcontent: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'left',
        marginTop: 10,
        width: '100%',
    },
    sectionpillcontent2: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'right',
        marginTop: 10,
        width: '100%',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    avatarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatarContent: {
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default ProfileScreen;





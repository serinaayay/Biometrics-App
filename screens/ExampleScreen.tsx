import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Import the navigation types
type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  ProfileScreen: undefined;
  ExampleScreen: undefined;
};

// Define the props type for this screen
type Props = NativeStackScreenProps<RootStackParamList, 'ExampleScreen'>;

// Alternative way to type the component
interface ExampleScreenProps {
  navigation: Props['navigation'];
  route: Props['route'];
}

const ExampleScreen: React.FC<Props> = ({ navigation, route }) => {
  const handleNavigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example Screen</Text>
      <Text style={styles.subtitle}>This demonstrates how to use NativeStackScreenProps</Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToProfile}>
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleGoBack}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Navigation Props Available:</Text>
        <Text style={styles.infoText}>• navigation.navigate()</Text>
        <Text style={styles.infoText}>• navigation.goBack()</Text>
        <Text style={styles.infoText}>• navigation.push()</Text>
        <Text style={styles.infoText}>• navigation.replace()</Text>
        <Text style={styles.infoText}>• route.params</Text>
        <Text style={styles.infoText}>• route.name</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#093FB4',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#093FB4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#093FB4',
  },
  secondaryButtonText: {
    color: '#093FB4',
  },
  infoContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#093FB4',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default ExampleScreen;

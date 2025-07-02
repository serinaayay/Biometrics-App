import { Dimensions, StyleSheet } from "react-native";
import ProfileScreen from './ProfileScreen';

const { width, height } = Dimensions.get('window');

export default function App() {
  return <ProfileScreen />;
}

const styles = StyleSheet.create({
    signUpContainer: {
        bottom: -height * 0.45,
        width: width * 0.9,
        height: height * 0.2,
        borderRadius: width * 0.03,
        backgroundColor: '#093FB4',
        alignSelf: 'center',
        marginTop: -height * 0.4,
        alignItems: 'center',
      },
    fieldContainer: {
        bottom: -height * 0.7,
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: width * 0.03,
        backgroundColor: '#EFF5FF',
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 5 },
        shadowOpacity: 0.01,
        shadowRadius: 0.01,
        elevation: 0.3,
        alignSelf: 'center',  
        marginTop: -height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      })


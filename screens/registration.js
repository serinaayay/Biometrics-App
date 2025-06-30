import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
      curvedBox: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          alignSelf: 'center',

          bottom: -height * 1.0, // Responsive positioning
          width: width * 0.9,
          height: height * 0.7,
          borderRadius: width * 0.03,
          backgroundColor: '#EFF5FF',
        
          shadowColor: '#000000',
          shadowOffset: { width: 30, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 4,

          elevation: 8,
      },
      progressBar: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          alignSelf: 'center',
  
          bottom: -height * 0.2, // Responsive positioning
          width: width * 0.9,
          height: height * 0.2,

          backgroundColor: '#093FB4',
          borderRadius: 10,
      }
});

export default function HomeScreen() {
  return (
    <SafeAreaView>
    <View style={styles.progressBar}>
        <Text style={{ textAlign: "center", zIndex: 40, marginVertical: 5,
            marginHorizontal: width * 0.1, color: "white", top: -104, fontSize: 19}}> Sign Up </Text>
    </View>
    <Text style={{ alignSelf: 'flex-start', zIndex: 40, bottom: -height * 0.3, marginLeft: 25, fontSize: 20, 
    fontWeight: 'bold'}}>Personal Information</Text>
    <View style={styles.curvedBox}>
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ width: '100%', alignItems: 'left' }}>


        </View>
    </ScrollView>
    </View>
    </SafeAreaView>
  );
}

import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View>
      <View style ={styles.signUpContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>Sign Up</Text>
      </View>
      <Text style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20
      }}>
        Personal Information
      </Text>
      <View style={styles.fieldContainer}>
        <ScrollView>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Full Name</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#9E9A9A"
              style={{
                flex: 1,
                paddingLeft: 10,
                paddingTop: 15,
                marginTop: height * 0.1,
                fontSize: width * 0.04,
                width: width * 0.8,
                backgroundColor: '#FFFFFF',
                alignContent: 'center',
                borderRadius: width * 0.03,
                
              }}/>
          </View>
        </ScrollView>

        <View style={{
            bottom: height * 1.1,
            width: width * 0.8,
            height: height * 0.2}}
          className="absolute self-center items-center justify-end bg-[#093FB4] rounded-[10px]"/>
      </View>
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


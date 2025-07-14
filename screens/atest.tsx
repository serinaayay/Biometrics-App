import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { RootStackParamList } from '../navigation/types';

import * as LocalAuthentication from 'expo-local-authentication';

type Props = NativeStackScreenProps<RootStackParamList, 'atest'>;

export default function HomeScreen({ navigation }: Props) {
    const [isBiometriclSupported, setIsBiometricSupported] = useState (false);
    const fallBackToDefaultAuth = () => {
    console.log("fall back to password auth")
    };

    const handleBiometricAuth = async () => {
        const alert = (
            title,
            mes,
            btnTxt,
            btnFunc,

    ) => { return Alert.alert(title, mes , [
        {
            text: btnTxt,
            onPress: btnFunc,
        },
        ]);
    };
        const TwoButtonAlert = () =>
        Alert.alert(
            "You are logged in",
            "Authentication successful.",
            [
                {
                    text: "back",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "PROCEED", onPress: () => console.log("OK PRESSED") },
            ]
        );
        
        const handleBiometricAuth = async () => {
        const isBiometricAvail = await LocalAuthentication.hasHardwareAsync();

        if(!isBiometricAvail) {
            return alert(
                'Please enter your password',
                'Biometric auth not supported',
                'OK',
                () => fallBackToDefaultAuth()

            )
        }
        let supportedBiometrics;
        if(!isBiometricAvail) {
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
        }

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if(savedBiometrics){
            return alert(
                'Biometric1 record not found',
                'Please log in with your password',
                'OK',
                () => fallBackToDefaultAuth()
            )
        }
    }
        
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Logged in",
            cancelLabel: "cancel",
            disableDeviceFallback: true,
        })    

        if(biometricAuth){
            TwoButtonAlert();
        };

        useEffect(() => {
            (
                async () => {
                    const compatible = await LocalAuthentication.hasHardwareAsync();
                    setIsBiometricSupported(compatible)
                }
            )
        })

}

    return(    
        <View style ={{flex:1,alignItems: 'center', justifyContent:'center'}}>
            <View style = {{flexDirection: 'column'}}>
                <Text>
                    {" "}
                    {isBiometriclSupported
                     ? "Your device is compatible"
                     : " "}
                </Text>
                <Text>
                    Scan please
                </Text>
                <TouchableOpacity onPress={handleBiometricAuth} >
                <View style = {{backgroundColor:'#000000'}}>
                    <Text style = {{color: '#FFFFFF', marginLeft: 10}}>
                        Finger pls
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
test:{
    color: '#FFFFFF',
},

});

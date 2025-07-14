import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { RootStackParamList } from '../navigation/types';

import * as LocalAuthentication from 'expo-local-authentication';

type Props = NativeStackScreenProps<RootStackParamList, 'btest'>;

export default function HomeScreen({ navigation }: Props) {
    return(    
        <View style ={{flex:1,alignItems: 'center', justifyContent:'center'}}>
            <View style = {{flexDirection: 'column'}}>
                <Text>
                    Scan please
                </Text>
                <TouchableOpacity>
                <View style = {{backgroundColor:'#c3ff00ff'}}>
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
    color: '#FFFF23',
},

});

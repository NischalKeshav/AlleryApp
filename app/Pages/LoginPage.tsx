import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../components/Navbar'
import LoginWindow from '../components/LoginWindow'

export default function LoginPage() {
  return (
    <View style={{ flex: 1 }}>

       <Navbar/>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <LoginPage/>
       </View>
    </View>
  );
}
import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../components/Navbar'
import ProfileHeader from '../components/Profile_Header'
export default function ProfilePage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
       <Navbar/>
       <View style={{ flex: 2, alignItems: 'center' }}>
           <ProfileHeader/>
       </View>
    </View>
  );
}

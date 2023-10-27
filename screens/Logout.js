import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import {auth,signOut, } from "../firebase"
const Logout = ({navigation}) => {
  useEffect(() => {
    signOut(auth).then(() => {
      navigation.replace('OnboardingScreen')
     alert("Logged out")
    }).catch((error) => {
      alert("Something went wrong, try again later")
    });
    }, []);
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout
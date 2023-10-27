import React, { Component,useEffect } from "react";
import {
    View,
    ActivityIndicator,Text,StyleSheet
} from "react-native";
import { auth,onAuthStateChanged } from "../firebase";


export default function LoadingScreen({navigation}) {
useEffect(() => {
    onAuthStateChanged(auth, (user) => {

        if (user) {
           navigation.navigate('DrawerNavigator');
        } else {
          navigation.navigate('OnboardingScreen');
        }
    })
})

   


return (
    <View style={styles.container}>
<Text
  style={{
    marginTop: 150,
    alignSelf: 'center',
    fontSize: 25,
    color: '#E79F25',
    fontWeight: 'bold',
  }}>
  Loading .....
</Text>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'white',
},
});
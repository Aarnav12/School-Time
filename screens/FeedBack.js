import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, Text, Dimensions, FlatList, ImageBackground,Image,TouchableOpacity,StyleSheet,Pressable,Modal,ScrollView,ActivityIndicator,Alert} from "react-native";
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db, collection, addDoc, setDoc, doc, auth, getDoc,onSnapshot, query, where, getDocs,updateDoc} from "../firebase"
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
export default function Profile({navigation}) {
  console.log(auth.currentUser.email)
  const[data,setData]=useState([]);
  const { height, width } = Dimensions.get("window");
  const [feedBack, setFeedBack] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const formButtonScale = useSharedValue(1);
  const d=new Date();
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const date=
  new Date().getDate() +
  '-' +
  month[d.getMonth()] +
  '-' +
  new Date().getFullYear();
  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const submitPost = async () => {
    setLoading(true)
      if(feedBack)
      {
      await addDoc(collection(db, 'feedback'), {
          FeedBack:feedBack,
          userEmail: auth.currentUser.email,
          userid: auth.currentUser.uid,
          date: date
          
      })
          .then(() => {
            setInterval(() => {
              setLoading(false)
          }, 2000);
              Alert.alert(
                  'Thank You!',
                  'Your feedback has been published Successfully!',
              );
              
             
          })
          .catch((error) => {
              console.log('Something went wrong with added post to firestore.', error);
              alert("Something went wrong! Please try again later.")
          });
      }
      else{
        setInterval(() => {
          setLoading(false)
      }, 2000);
          alert("Please fill the FeedBack")
      }
      setFeedBack(null);
   }

  return (
<KeyboardAwareScrollView>
      <View style={{ width: width, height: height, alignContent: 'center',}}backgroundColor="black">
      <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row'}}> 
      <Image source={require("../assets/Gold-Wings-Logo(New).png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center'}}>School Time</Text>
    </View>
        <TouchableOpacity onPress={navigation.openDrawer}>
        <Ionicons name="menu-outline" size={30} color="white" style={{alignSelf:'flex-start',marginRight: 20}} />
        </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>FeedBack</Text>
          <ActivityIndicator animating={isLoading} style={{alignSelf: 'center', justifyContent: 'center'}} size = {'large'} shadowColor ={'white'} color = {'white'}/>
          <ScrollView style={{flex:1, marginBottom:5}}>
                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10}}>
                <TextInput
                     editable
                     multiline
                     numberOfLines={4}
                    label="Describe your experience"
                    onChangeText={(text) => setFeedBack(text)}
                    containerStyle={{marginTop: 50}}
                    style={{margin:30}}
                />
                  <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                  <Pressable onPress={submitPost}>
                  <Text style={styles.buttonText}>
                    Submit
                  </Text>
                  </Pressable>
                 </Animated.View>
                </View>
                </ScrollView>
      </View>
      </KeyboardAwareScrollView>
  );

};
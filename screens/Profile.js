import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, Text, Dimensions, FlatList, ImageBackground,Image,TouchableOpacity,StyleSheet,Pressable,Modal,ScrollView,ActivityIndicator} from "react-native";
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
  const [modalVisible,setmodalVisible]=useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [DOB, setDOB] = useState(null)
  const [parentName, setParentName] = useState(null)
  const [classes, setClasses] = useState(null)
  const [schoolName, setSchoolName] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [pincode, setPincode] = useState(null)
  const [phone, setPhone] = useState(null)
  const formButtonScale = useSharedValue(1);
  useEffect(() => {
    const ReadData=async()=>{

      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setName(docSnap.data().name)
          setEmail(docSnap.data().email)
          setPassword(docSnap.data().password)
          setPhone(docSnap.data().phone)
          setAddress(docSnap.data().address)
          setPincode(docSnap.data().pincode)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
}
    }
    ReadData();
  }, []);
  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const updateData=async()=>{
    setLoading(true)
    const profileRef=doc(db,'users', auth.currentUser.uid)
    await updateDoc(profileRef,{
      name: name,
      email: email,
      password: password,
      address: address,
      pincode: pincode,
      phone: phone,
    }).then(()=>{
      setInterval(() => {
        setLoading(false)
    }, 2000);
      alert("Your Profile has been updated!")
    })
  }

  return (
<KeyboardAwareScrollView>
      <View style={{ width: width, height: height, alignContent: 'center',}}backgroundColor="black">
        <View style={{flexDirection:'row'}}> 
          <TouchableOpacity onPress={navigation.openDrawer}>
          <Image source={require("../assets/Gold-Wings-Logo(New).png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>School Time</Text>
        </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>Profile</Text>
          <ActivityIndicator animating={isLoading} style={{alignSelf: 'center', justifyContent: 'center'}} size = {'large'} shadowColor ={'white'} color = {'white'}/>
          <ScrollView style={{flex:1, marginBottom:5}}>
                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10}}>
                <TextInput
                    label="Name"
                    onChangeText={(text) => setName(text)}
                    containerStyle={{marginTop: 50}}
                    value={name}
                    style={{margin:30}}
                />
                  <TextInput
                    label="Email"
                    containerStyle={{marginTop: 10}}
                    value={email}
                    style={{margin:30}}
              
                  />
                  <TextInput
                    label="Password"
                    onChangeText={(text) => setPassword(text)}
                    containerStyle={{marginTop: 10}}
                    value={password}
                    style={{margin:30}}
              
                  />
                  <TextInput
                    label="Mobile No."
                    onChangeText={(text) => setPhone(text)}
                    containerStyle={{marginTop: 10}}
                    value={phone}
                    style={{margin:30}}
              
                  />
                  <TextInput
                    label="Address"
                    onChangeText={(text) => setAddress(text)}
                    containerStyle={{marginTop: 10}}
                    value={address}
                    style={{margin:30}}
              
                  />
                  <TextInput
                    label="Pincode"
                    onChangeText={(text) => setPincode(text)}
                    containerStyle={{marginTop: 10}}
                    value={pincode}
                    style={{margin:30}}
              
                  />
                  <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                  <Pressable onPress={updateData}>
                  <Text style={styles.buttonText}>
                    Save
                  </Text>
                  </Pressable>
                 </Animated.View>
                </View>
                </ScrollView>
      </View>
      </KeyboardAwareScrollView>
  );

};
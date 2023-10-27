import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Dimensions,
    Pressable,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import { Input, Button } from 'react-native-elements';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
  } from "react-native-reanimated";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import { auth, storage, db, addDoc,collection } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "../firebase";
// import { ActivityIndicator } from 'react-native-paper';
const { height, width } = Dimensions.get("window");

import styles from "../styles";
import { RFValue } from 'react-native-responsive-fontsize';


const CreatePost = () => {


    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [product, setProuduct] = useState(null);
    const [dimension, setDimension] = useState(null);
    const [classes, setClasses] = useState(null);
    const [school, setSchool] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [picture,setPicture]=useState(null);
    const [pincode,setPincode]=useState(null);
    const [schoolCity,setSchoolCity]=useState(null);
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

    const uploadImage = async (image) => {
        const blob =
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response)
                };
                xhr.error = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null)
            });
        try {
            const fileRef = ref(storage, 'school/image-' + Date.now());
            const result = await uploadBytes(fileRef, blob);
            blob.close();
            getDownloadURL(fileRef).then((downloadURL)=>{
                setPicture(downloadURL)
                console.log("Download",downloadURL);
                return  getDownloadURL(fileRef);
            })
           
        } catch (error) {
            alert(error)
        }

    }

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{scale: formButtonScale.value}]
        }
      })


    const choosePhotoFromLibrary = async () => {
        setLoading(true)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {


            const uploadURL = await uploadImage(result.assets[0].uri);
            setImage(uploadURL)
            setInterval(() => {
                setLoading(false)
            }, 2000);

        }
        else {
            setImage(null);
            setInterval(() => {
                setLoading(false)
            }, 2000);
        }
    };

    const submitPost = async () => {
      setLoading(true)
        if(product && picture && classes && school && schoolCity && pincode)
        {
        await addDoc(collection(db, 'posts'), {
            postImg: picture,
            product: product,
            dimension: dimension,
            class: classes,
            school: school,
            pincode: pincode,
            schoolCity: schoolCity,
            userEmail: auth.currentUser.email,
            userid: auth.currentUser.uid,
            date: date
            
        })
            .then(() => {
              setInterval(() => {
                setLoading(false)
            }, 2000);
                Alert.alert(
                    'Post published!',
                    'Your post has been published Successfully!',
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
            alert("Please fill in necessary fields including choosing a picture")
        }
        setProuduct(null);
        setPicture(null);
        setDimension(null);
        setClasses(null);
        setSchool(null);
        setPincode(null);
        setSchoolCity(null);
    }



    return (
<KeyboardAwareScrollView>
        <View styles={{flex:1}} backgroundColor="black" height={height} width={width}>
     <View style={{flexDirection:'row'}}> 
      <Image source={require("../assets/Gold-Wings-Logo(New).png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>New Post</Text>
    </View>
  
     
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.3,margin:10,marginTop:1,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
    <ActivityIndicator animating={isLoading} style={{alignSelf: 'center', justifyContent: 'center'}} size = {'large'} shadowColor ={'black'} color = {'black'}/>
    <ScrollView style={{flex:1, marginBottom:5}}>
      {picture && <Image source={{ uri: picture }} style={{width: '93%', height: RFValue(100), alignSelf: 'center', resizeMode: 'contain'}} />}
      <Pressable onPress={choosePhotoFromLibrary} style={{alignSelf:'center',height:50,width:150,backgroundColor:'black',borderRadius:30,justifyContent:'center', marginTop: 10}}>
     
              <Text style={{color:'white',alignSelf:'center',textAlign:'center'}}>
               Choose Image
              </Text>
            </Pressable>
      <Input
          placeholder='Product *'
          placeholderTextColor={'gray'}
          containerStyle={{marginTop: 5}}
          value={product}
          onChangeText={(text) => setProuduct(text)}
          
            />
        <Input
          placeholder='Dimension'
          placeholderTextColor={'gray'}
          value={dimension}
          onChangeText={(text) => setDimension(text)}
          
            />
        <Input
          placeholder='Class *'
          placeholderTextColor={'gray'}
          value={classes}
          onChangeText={(text) => setClasses(text)}

            />
        <Input
          placeholder='School *'
          placeholderTextColor={'gray'}
          value={school}
          onChangeText={(text) => setSchool(text)}
         
            />
        <Input
          placeholder='School city *'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'gray'}
          value={schoolCity}
          onChangeText={(text) => setSchoolCity(text)}
         
            />
          <Input
          placeholder='Pincode *'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'gray'}
          value={pincode}
          onChangeText={(text) => setPincode(text)}
         
            />
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={submitPost}>
              <Text style={styles.buttonText}>
               Submit
              </Text>
            </Pressable>
            </Animated.View>
            </ScrollView>
            </View>
     
      
    </View>
    </KeyboardAwareScrollView>
  );
}

export default CreatePost;
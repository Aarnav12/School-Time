import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../styles";
import {storage, db, addDoc,collection } from "../firebase";
import {signInWithEmailAndPassword,auth,sendPasswordResetEmail,createUserWithEmailAndPassword,setDoc,doc} from "../firebase"

import Animated, {
  useSharedValue,
  useAnimatedStyle,

} from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility";
export default function Register({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('')
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);

  let validateAndSet = (value,setValue) => {
   setValue(value)
}


  const forgotPassword=()=>{
if(email!=""){
  sendPasswordResetEmail(email)
  .then(() => {
    alert('Email sent to the specified mail-id');
  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setValidationMessage(errorMessage);
    // ..
  });
}
else{
    setValidationMessage('Please enter the email-id');
}
  }
const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    setLoading(true)
    email === '' || password === '' || confirmPassword === '' || name === ''
    ? setValidationMessage('All the fields are required')
    : ''
    
  
    
    await  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

       setDoc(doc(db,'users', auth.currentUser.uid), {
        name: name,
       email: email,
       password:password,
       confirmPassword:confirmPassword,
       phone: "",
       address: "",
       pincode: ""
      })

    alert("Welcome to SchoolTime");
    navigation.replace('DrawerNavigator');
    setEmail(null);
    setName(null);
    setPassword(null);
    setConfirmPassword(null);
     
    }).catch ((error) =>{
     // setValidationMessage(error.message);
     alert(error.message)
      
    });
    setInterval(() => {
      setLoading(false)
  }, 2000);
    
  }
  return (
<KeyboardAwareScrollView>
    <View styles={{flex:1}} backgroundColor="black" height={height} width={width}>
     
     <View style={{flexDirection:'row'}}> 
      <Image source={require("../assets/Gold-Wings-Logo(New).png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>School Time</Text>
    </View>
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.4,margin:10,marginTop:20,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
      <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 15, marginTop: 10, color: '#00ff00',alignSelf: 'center', justifyContent: 'center' }}>REGISTER</Text>
      <ActivityIndicator animating={isLoading} style={{alignSelf: 'center', justifyContent: 'center'}} size = {'large'} shadowColor ={'black'} color = {'black'}/>
      <Input
          placeholder='Name'
          placeholderTextColor={'gray'}
          containerStyle={{marginTop: 10}}
          value={name}
          onChangeText={(text) => setName(text)}
         
          leftIcon={<Ionicons name="person-outline" size={16} color="black" />}
          
            />
        
        
        
        <Input
          placeholder='Email'
          placeholderTextColor={'gray'}
          containerStyle={{marginTop: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
         
          leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color="black" />}
          
            />
        <Input
          placeholder='Pin'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          
         // rightIcon={<Icon name={rightIcon} size={16} color="black" onPress={handlePasswordVisibility}/>}
          leftIcon={<Icon name='key' size={16} color="black"/>}
          rightIcon={<Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>}
          

            />
        <Input
          placeholder='Confirm Pin'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'gray'}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
         
          leftIcon={<Icon name='key' size={16} color="black"/>}
         
          onBlur={()=>checkPassword(password,confirmPassword)}
            />  
            {<Text style={styles.error}>{validationMessage}</Text>}
        
        <Animated.View style={[styles.formNewButton, formButtonAnimatedStyle]}>
            <Pressable onPress={createAccount}>
              <Text style={styles.buttonText}>
               REGISTER
              </Text>
            </Pressable>
            </Animated.View>
            </View>
    
      
    </View>
</KeyboardAwareScrollView>
  );
}
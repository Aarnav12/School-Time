import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, Text, Dimensions, FlatList, ImageBackground,Image,TouchableOpacity,StyleSheet,Pressable,Modal, Alert, Linking } from "react-native";
import { db, collection, addDoc, setDoc, doc, auth, getDocs ,onSnapshot,deleteDoc, query} from "../firebase"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getDoc, orderBy } from "firebase/firestore";
import styles from "../styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  color,
} from "react-native-reanimated";
export default function Feed({navigation}) {
  const[data,setData]=useState([]);
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);
  const [modalVisible,setmodalVisible]=useState(false);
  const [deleted,setDeleted] = useState(false);
  const [userEmail,setUserEmail] = useState(null)
  const [isAvailable, setIsAvailale] = useState(false);

  const getData = async () => {
  
    const postData = (collection(db, 'posts'));
    const q = query(postData, orderBy('date'))
    const querySnapshot = await getDocs(q);
    const journal = [];
    querySnapshot.forEach((doc) => {
      journal.push({
        ...doc.data(),
        post: doc.data().product,
        postImg: doc.data().postImg,
        dimension: doc.data().dimension,
        class: doc.data().class,
        school:doc.data().school,
        userEmail:doc.data().userEmail,
        userid:doc.data().userid,
        dateAdded:doc.data().date,
        schoolCity:doc.data().schoolCity,
        pincode:doc.data().pincode,
        id: doc.id,
      });
     //  console.log(doc.id, " => ", doc.data());
    });
    setData(journal);
   };

  useEffect(() => {
   // getData();
  getData();
  }, [data]);

  useEffect(()=>{
    getData()
    setDeleted(false);
  },[deleted]);

  const setModalVisible=(visible)=> {
    setmodalVisible(visible);
  }
  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  return (
   
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
        {
          data ?
            <FlatList
            style={{flex:1,height:height,width:width, marginBottom:60}}
            scrollEnabled
              data={data}
              renderItem={({ item }) =>
                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10, borderColor:'white'}}>
                 
                  <Image source={{ uri: item.postImg }}style={{height:210,width:width-20,borderRadius:30}}></Image>
                  
                  <Text style={{ fontSize: 15,padding:10,color: 'white'}}>{item.post}, Dimension-{item.dimension}</Text>
                
                  <Text style={{ fontSize: 15,padding:10,marginTop:0,color: 'white'}}>Class-{item.class}, School-{item.school}</Text>

                  <Text style={{ fontSize: 15,padding:10,marginTop:0,color: 'white'}}>School City-{item.schoolCity}, Pincode-{item.pincode}</Text>

                  <Animated.View style={[styles.sendEmailButton, formButtonAnimatedStyle]}>
                    <Pressable onPress={()=>{
                      Linking.openURL('mailto:askschooltime@gmail.com'+'?subject=Id - '+item.id+'&body=Product Name - '+item.post+' ,Dimension - '+item.dimension+' ,class - '+item.class+' ,school - '+item.school+' ,Date Added - '+item.dateAdded)
                    }}>
                      <Text style={styles.buttonText}>
                        Get It!
                       </Text>
                    </Pressable>
                  </Animated.View>
                </View>}
              keyExtractor={item => item.id}
        
            />
            :<Text style={{textAlign:'center',fontSize:30,color:'red',alignSelf:'center'}}>No data at the moment</Text>
        }
      </View>
 
   
  );

};

const style= StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    height:40,
    marginBottom: 15,
    textAlign: "center",
   // fontWeight:'bold',
    fontSize:15,
    color:'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonClose: {
    backgroundColor: "black", 
  },
  textStyle: {
    color: "white",
    //fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'3%'
  },
 
})
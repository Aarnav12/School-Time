import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, Text, Dimensions, FlatList, ImageBackground,Image,TouchableOpacity,StyleSheet,Pressable,Modal, Alert } from "react-native";
import { db, collection, addDoc, setDoc, doc, auth, getDocs ,onSnapshot,deleteDoc, query} from "../firebase"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { orderBy } from "firebase/firestore";
export default function Feed({navigation}) {
  
  const[data,setData]=useState([]);
  const { height, width } = Dimensions.get("window");
  const [modalVisible,setmodalVisible]=useState(false);
  const [deleted,setDeleted] = useState(false);

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
        userid:doc.data().userid,
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

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = async(postId) =>{
    await deleteDoc(doc(db, "posts", postId)).then(()=>{
      alert('Your post has been deleted!')
      setDeleted(true)
    });
  }

  const setModalVisible=(visible)=> {
    setmodalVisible(visible);
  }
  renderItem=({item})=>{
    if(auth.currentUser.uid == item.userid){
      return(<View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10, borderColor:'white'}}>
        <Image source={{ uri: item.postImg }} style={{ height: 210, width: width - 20, borderRadius: 30 }}></Image><Text style={{ fontSize: 15, padding: 10, color: 'white' }}>{item.post}, Dimension-{item.dimension}</Text><Text style={{ fontSize: 15, padding: 10, marginTop: 0, color: 'white' }}>Class-{item.class}, School-{item.school}</Text>
        <TouchableOpacity
        onPress = {()=> handleDelete(item.id)}
        style={{alignItems: 'center'}}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
       
      </View>)

  }
  else{
    return(
      <Text>No posts found</Text>
    )
  }
}

  

  return (
   
      <View style={{ width: width, height: height, alignContent: 'center',}}backgroundColor="black">
        <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row'}}> 
      <TouchableOpacity onPress={navigation.openDrawer}>
      <Image source={require("../assets/Gold-Wings-Logo(New).png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
      </TouchableOpacity>
    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>School Time</Text>
    </View>
          </View>
        {
          data ?
            <FlatList
            style={{flex:1,height:height,width:width, marginBottom:60}}
            scrollEnabled
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
        
            />
            :<Text style={{textAlign:'center',fontSize:30,color:'red',alignSelf:'center'}}>No data at the moment</Text>
        }
      </View>
 
   
  );

};
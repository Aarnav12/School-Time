// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,addDoc,setDoc,doc,getDocs,collection,onSnapshot,getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth,onAuthStateChanged,signInWithPopup,signInWithEmailAndPassword,sendPasswordResetEmail,createUserWithEmailAndPassword,signOut} from 'firebase/auth';
import { getStorage,uploadBytes, ref, getDownloadURL} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdqoNAbqsISunvU4auk9tzCgrEzaglCzg",
  authDomain: "school-leader-91c26.firebaseapp.com",
  projectId: "school-leader-91c26",
  storageBucket: "school-leader-91c26.appspot.com",
  messagingSenderId: "710328078879",
  appId: "1:710328078879:web:051b881af90a7c7be03b2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 const auth = getAuth();
 const storage = getStorage(app);

 //const provider = new GoogleAuthProvider();
//provider.setCustomParameters({ prompt: 'select_account' });

export {app,storage,db,auth,onSnapshot,collection,ref,getDownloadURL,uploadBytes,deleteDoc,addDoc,setDoc,doc,getDocs,getDoc,query,signOut,updateDoc,where,onAuthStateChanged,signInWithEmailAndPassword,sendPasswordResetEmail,createUserWithEmailAndPassword}
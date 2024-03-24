// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore" ;

const firebaseConfig = {
  apiKey: "AIzaSyAG0cCnEGeIlkmEW6CxMMPEyOKJ3ZNQQqs",
  authDomain: "match-nurba.firebaseapp.com",
  projectId: "match-nurba",
  storageBucket: "match-nurba.appspot.com",
  messagingSenderId: "734026031551",
  appId: "1:734026031551:web:189c92362986d427c9410a",
  measurementId: "G-7M7B7HTTTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) ;

export default db
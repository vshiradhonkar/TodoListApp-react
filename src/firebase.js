import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBsM7BJMfktxEXDoYnF1xuZWNNqmvg4hS0",
  authDomain: "todolist-app1.firebaseapp.com",
  projectId: "todolist-app1",
  storageBucket: "todolist-app1.appspot.com",
  messagingSenderId: "654752008354",
  appId: "1:654752008354:web:c9ee21e96c73f2cbc82ffb",
  measurementId: "G-2GW60RVC2G"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();


export {db}; 
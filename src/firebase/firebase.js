import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATBocD4YY63wKoUius5P9-C6Fp2MIgjYo",
  authDomain: "logindashboard-b14c2.firebaseapp.com",
  databaseURL: "https://logindashboard-b14c2-default-rtdb.firebaseio.com",
  projectId: "logindashboard-b14c2",
  storageBucket: "logindashboard-b14c2.appspot.com",
  messagingSenderId: "633859684511",
  appId: "1:633859684511:web:2aab8474e8d9e52eb60aaa",
  measurementId: "G-5X0TVTBS3V"
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
export default app;

//const auth = firebase.auth();

//export { auth } ;

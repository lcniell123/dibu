
import firebase from 'firebase/app';
import 'firebase/firestore'
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAefSPoSiVDFlxbp5Dwf-1q5777oKHq01s",
    authDomain: "dibu-7a1c1.firebaseapp.com",
    databaseURL: "https://dibu-7a1c1.firebaseio.com",
    projectId: "dibu-7a1c1",
    storageBucket: "dibu-7a1c1.appspot.com",
    messagingSenderId: "847388907720",
    appId: "1:847388907720:web:9cd1a336eee42cd0adedfd"
  };

//Initialize Firebase 
firebase.initializeApp(firebaseConfig);

export default firebase
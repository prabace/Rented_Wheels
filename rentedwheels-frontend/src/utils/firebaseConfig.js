import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBS3HTRJoQ1Cxx-QpCiaVcida2XA7iKik",
  authDomain: "rentedwheels-d0b3c.firebaseapp.com",
  projectId: "rentedwheels-d0b3c",
  storageBucket: "rentedwheels-d0b3c.appspot.com",
  messagingSenderId: "56371201589",
  appId: "1:56371201589:web:04d2c97fdb2102ab97537c",
  measurementId: "G-MNXN08H7WV"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const storage=firebase.storage();

export { auth, db, storage};
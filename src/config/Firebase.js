// Import the functions you need from the SDKs you need

import { firebase, initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxljtF6nTqXySxejEO_po2HfYnCejHKW0",
    authDomain: "timeboxing-56fe3.firebaseapp.com",
    projectId: "timeboxing-56fe3",
    storageBucket: "timeboxing-56fe3.appspot.com",
    messagingSenderId: "297978597253",
    appId: "1:297978597253:web:50dc0089f52afcae163eec",
    measurementId: "G-VBVQBEG4NP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = firebase.auth();
export default firebase;
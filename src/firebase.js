import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8mubfHxWLnmLklMMADlPP98OzBqeMTh0",
  authDomain: "react-snapchat-777.firebaseapp.com",
  projectId: "react-snapchat-777",
  storageBucket: "react-snapchat-777.appspot.com",
  messagingSenderId: "406936878400",
  appId: "1:406936878400:web:b18e4f5e2cc154ebb3cea5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage(); //to upload stuff

const provider = new firebase.auth.GoogleAuthProvider(); // that popeup we get to login from google is provider.

export { db, auth, storage, provider };

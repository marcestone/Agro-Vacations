import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD4U9Rd6BRf5tjNeSH9IEBUAAf9TT7gCiQ",
    authDomain: "vue-spas-d169d.firebaseapp.com",
    databaseURL: "https://vue-spas-d169d.firebaseio.com",
    projectId: "vue-spas-d169d",
    storageBucket: "vue-spas-d169d.appspot.com",
    messagingSenderId: "420119611118",
    appId: "1:420119611118:web:41a453a52e87a6b25ad5ff"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();
// Esta es una mouseHerramienta que nos servira para mas tarde

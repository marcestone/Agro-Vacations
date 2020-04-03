import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCW5upxm20LsmiWCxnQnXsEJtZ8_kQz0Co",
  authDomain: "agrovacations-c213d.firebaseapp.com",
  databaseURL: "https://agrovacations-c213d.firebaseio.com",
  projectId: "agrovacations-c213d",
  storageBucket: "agrovacations-c213d.appspot.com",
  messagingSenderId: "712842673749",
  appId: "1:712842673749:web:452859e2251fdffe6c9edc",
  measurementId: "G-CXLB801MJ3"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
// Esta es una mouseHerramienta que nos servira para mas tarde

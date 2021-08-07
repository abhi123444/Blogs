import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAsTZ4nXNqnf4eBiXd1YDOP5QVEzUIL0CA",
    authDomain: "personal-blog-32aed.firebaseapp.com",
    projectId: "personal-blog-32aed",
    storageBucket: "personal-blog-32aed.appspot.com",
    messagingSenderId: "603583021415",
    appId: "1:603583021415:web:0376deb8f8aef5250fafc2"
  };
  
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  export var auth = firebase.auth();
  export var provider = new firebase.auth.GoogleAuthProvider();
  export const storage = firebase.storage()
  export default db; 
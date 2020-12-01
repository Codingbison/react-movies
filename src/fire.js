// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB3uCqnoxmwcHtnUlFOf-HOsnvWiDSyAFY",
    authDomain: "movieapp-4f9c9.firebaseapp.com",
    databaseURL: "https://movieapp-4f9c9.firebaseio.com",
    projectId: "movieapp-4f9c9",
    storageBucket: "movieapp-4f9c9.appspot.com",
    messagingSenderId: "655189479913",
    appId: "1:655189479913:web:4493c901b39d4804223b78"
  };

  var fire=firebase.initializeApp(firebaseConfig);
  export default fire;
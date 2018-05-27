// Firebase App is always required and must be first
import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKxe9u75Kmk18xjpkaJBSe5v3VHMj7svw",
  authDomain: "proj-builder.firebaseapp.com",
  databaseURL: "https://proj-builder.firebaseio.com",
  projectId: "proj-builder",
  storageBucket: "proj-builder.appspot.com",
  messagingSenderId: "897550011802"
};
firebase.initializeApp(config);

export default config;

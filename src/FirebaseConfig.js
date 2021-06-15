import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAH06VLIvJSi-PhhaICkjcgRiS4GFPmSrM",
  authDomain: "users-c4427.firebaseapp.com",
  databaseURL: "https://users-c4427-default-rtdb.firebaseio.com",
  projectId: "users-c4427",
  storageBucket: "users-c4427.appspot.com",
  messagingSenderId: "649772692587",
  appId: "1:649772692587:web:4b92189c4645c495bd6d2e",
  measurementId: "G-0KCV44RBHL",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth(); //inicializamos auth
const storage = fire.firestore();
const storageImg = fire.storage();

export { auth, storage, storageImg }; //lo exportamos y está listo para ser usado en el proyecto

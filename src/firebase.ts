import { getApp, getApps ,initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyCxh4nV_wRqQ3RHiDEGPAKU8EPiR0U1mMk",

  authDomain: "chatgpt-16d23.firebaseapp.com",

  projectId: "chatgpt-16d23",

  storageBucket: "chatgpt-16d23.appspot.com",

  messagingSenderId: "336455597957",

  appId: "1:336455597957:web:55413f52275fa63eaa0eec"
  
  };
  


// Initialize Firebase

//const app = initializeApp(firebaseConfig);
console.log(getApps())
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

const auth = getAuth(app)
export {db, auth}

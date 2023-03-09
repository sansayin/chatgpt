import { getApp, getApps ,initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyBACNpc5CcLRsaao9uSBQHsaHlOLWE9fLI",
  
    authDomain: "chatgpt-messenger-8c5d7.firebaseapp.com",
  
    projectId: "chatgpt-messenger-8c5d7",
  
    storageBucket: "chatgpt-messenger-8c5d7.appspot.com",
  
    messagingSenderId: "946178822070",
  
    appId: "1:946178822070:web:72f26b5983273f0a69bb17"
  
  };
  


// Initialize Firebase

//const app = initializeApp(firebaseConfig);
console.log(getApps())
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}
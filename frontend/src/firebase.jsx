// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCarpxw-7eAhnLgbTApsKN4pL3mfx5Cjyc",
  authDomain: "it-project-e2906.firebaseapp.com",
  projectId: "it-project-e2906",
  storageBucket: "it-project-e2906.appspot.com",
  messagingSenderId: "311771025011",
  appId: "1:311771025011:web:bf4f3353db8911412ca406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
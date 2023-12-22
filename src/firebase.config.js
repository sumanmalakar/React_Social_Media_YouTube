// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGVPQ1bpq6kj1KwdYYEBMtFLSbhb2BGKU",
  authDomain: "react-social-media-cd7fd.firebaseapp.com",
  projectId: "react-social-media-cd7fd",
  storageBucket: "react-social-media-cd7fd.appspot.com",
  messagingSenderId: "290000597909",
  appId: "1:290000597909:web:b7e1256443e2c0526a3c9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


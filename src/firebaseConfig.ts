// Firebase setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1AjEXRc_IotrRifitND0Mlak0KtmxIdU",
  authDomain: "hackguard-academy.firebaseapp.com",
  projectId: "hackguard-academy",
  storageBucket: "hackguard-academy.firebasestorage.app",
  messagingSenderId: "143507824850",
  appId: "1:143507824850:web:4d6eb50bfb2b857c4e4d0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

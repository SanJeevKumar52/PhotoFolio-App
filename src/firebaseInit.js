// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfLJWbJVoNpN3kYBWYpWZkcjGrxN3-oNI",
  authDomain: "photofolio-app-5d28e.firebaseapp.com",
  projectId: "photofolio-app-5d28e",
  storageBucket: "photofolio-app-5d28e.appspot.com",
  messagingSenderId: "68983327214",
  appId: "1:68983327214:web:dac96e8aad74d273c4a6ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
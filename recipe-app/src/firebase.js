// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAA6Ia4fRSTh0Mk25UGMhn4V0rPYks1xT4",
  authDomain: "recipe-app-4e72e.firebaseapp.com",
  databaseURL: "https://recipe-app-4e72e-default-rtdb.firebaseio.com",
  projectId: "recipe-app-4e72e",
  storageBucket: "recipe-app-4e72e.firebasestorage.app",
  messagingSenderId: "493402049823",
  appId: "1:493402049823:web:438e4ab808d5242c0b342a",
  measurementId: "G-3V82LS7TXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
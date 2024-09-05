import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD6fJo4IJnwoOZjOboMghBYQU7duUpHOgI",
    authDomain: "login-smit-b0f36.firebaseapp.com",
    projectId: "login-smit-b0f36",
    storageBucket: "login-smit-b0f36.appspot.com",
    messagingSenderId: "896063749015",
    appId: "1:896063749015:web:f13bd0f92b73cffaefa2d2",
    measurementId: "G-8S0CKFJHNJ"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

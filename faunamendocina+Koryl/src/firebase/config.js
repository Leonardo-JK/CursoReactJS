// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtGaEZqzNkB7XPj01Q-jL5e40asl7w9vM",
    authDomain: "faunamendocina.firebaseapp.com",
    projectId: "faunamendocina",
    storageBucket: "faunamendocina.appspot.com",
    messagingSenderId: "135291349033",
    appId: "1:135291349033:web:34c1f7866ba9732fe05438"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtw3coit5Y_E2gJInz7RavYXuthmhh35Q",
  authDomain: "authentic-idea-365202.firebaseapp.com",
  databaseURL: "https://authentic-idea-365202-default-rtdb.firebaseio.com",
  projectId: "authentic-idea-365202",
  storageBucket: "authentic-idea-365202.appspot.com",
  messagingSenderId: "497585289385",
  appId: "1:497585289385:web:a9ee5f59c4a17b793bd1b8",
  measurementId: "G-2HBL5FQBGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
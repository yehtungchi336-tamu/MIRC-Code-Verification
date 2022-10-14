import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyBtw3coit5Y_E2gJInz7RavYXuthmhh35Q",
  authDomain: "authentic-idea-365202.firebaseapp.com",
  projectId: "authentic-idea-365202",
  storageBucket: "authentic-idea-365202.appspot.com",
  messagingSenderId: "497585289385",
  appId: "1:497585289385:web:a9ee5f59c4a17b793bd1b8",
  measurementId: "G-2HBL5FQBGG"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}

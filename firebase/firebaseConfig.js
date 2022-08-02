// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYPk1vKcUt_yrCS9HpbzMWa2iK_Kg9jn0",
  authDomain: "home-two-f88fe.firebaseapp.com",
  databaseURL: "https://home-two-f88fe-default-rtdb.firebaseio.com",
  projectId: "home-two-f88fe",
  storageBucket: "home-two-f88fe.appspot.com",
  messagingSenderId: "307006079880",
  appId: "1:307006079880:web:edd8dedf305d6f7700703d",
  measurementId: "G-1P51TJCZ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()

export { app, db }

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

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
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)
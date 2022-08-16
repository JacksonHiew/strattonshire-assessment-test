// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHAQ1s_kJuK8e76AbuKMCBeu_PYigyImk",
    authDomain: "shratton-test.firebaseapp.com",
    projectId: "shratton-test",
    storageBucket: "shratton-test.appspot.com",
    messagingSenderId: "655260599628",
    appId: "1:655260599628:web:8a94a78525183345303be9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
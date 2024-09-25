// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSUpWyMvH_AMZ2ltZNkNR3KnFoLzTVwmI",
  authDomain: "app-teste-tese.firebaseapp.com",
  projectId: "app-teste-tese",
  storageBucket: "app-teste-tese.appspot.com",
  messagingSenderId: "730594593344",
  appId: "1:730594593344:web:0f0d8d861192cfa2846da5",
  measurementId: "G-QFTJD2E23R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
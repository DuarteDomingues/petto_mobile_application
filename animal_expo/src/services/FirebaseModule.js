// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence , initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
const firebaseConfig = {
    apiKey: "AIzaSyDSUpWyMvH_AMZ2ltZNkNR3KnFoLzTVwmI",
    authDomain: "app-teste-tese.firebaseapp.com",
    projectId: "app-teste-tese",
    storageBucket: "app-teste-tese.appspot.com",
    messagingSenderId: "730594593344",
    appId: "1:730594593344:web:0f0d8d861192cfa2846da5",
    measurementId: "G-QFTJD2E23R"
  };
*/

const firebaseConfig = {
  apiKey: "AIzaSyDSUpWyMvH_AMZ2ltZNkNR3KnFoLzTVwmI",
  authDomain: "app-teste-tese.firebaseapp.com",
  projectId: "app-teste-tese",
  storageBucket: "app-teste-tese.appspot.com",
  messagingSenderId: "730594593344",
  appId: "1:730594593344:web:0f0d8d861192cfa2846da5",
  measurementId: "G-QFTJD2E23R"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

export { firebaseApp, auth, firestore };

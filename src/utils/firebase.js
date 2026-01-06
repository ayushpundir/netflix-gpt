// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // from firebase docs

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL1UM_oB8AB-IEHiKRkpN5QICNkwAZkdE",
  authDomain: "netflixgpt-17560.firebaseapp.com",
  projectId: "netflixgpt-17560",
  storageBucket: "netflixgpt-17560.firebasestorage.app",
  messagingSenderId: "756454625166",
  appId: "1:756454625166:web:4bd63e182fd90582f71edf",
  measurementId: "G-428397GYJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

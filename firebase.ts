// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsCm2TfRXFylkSrlyCY2FIPyKgeg-8ymc",
  authDomain: "coffee-math-vite-react.firebaseapp.com",
  projectId: "coffee-math-vite-react",
  storageBucket: "coffee-math-vite-react.appspot.com",
  messagingSenderId: "24817736302",
  appId: "1:24817736302:web:0c531cf67d6e6d47b9647f",
  measurementId: "G-0CFNPPNQJN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// initializeFirestore(app, { localCache: memoryLocalCache() });
initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});

export const db = getFirestore(app);

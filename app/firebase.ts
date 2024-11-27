// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI4kzdwG-MPp2EijvVPDNpma3lJMgxN-E",
  authDomain: "scan-gourmet.firebaseapp.com",
  projectId: "scan-gourmet",
  storageBucket: "scan-gourmet.appspot.com",
  messagingSenderId: "648987104114",
  appId: "1:648987104114:web:af7cb444ad18e168fa83eb",
  measurementId: "G-Y6D29VBQ36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { app, analytics, auth, googleProvider, db, storage };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config before deploying to Vercel
const firebaseConfig = {
  apiKey: "AIzaSyCVenCuze6wiFnuZS8KqAHOq-KSbRuBZkU",
  authDomain: "seva-f5ac6.firebaseapp.com",
  databaseURL: "https://seva-f5ac6-default-rtdb.firebaseio.com",
  projectId: "seva-f5ac6",
  storageBucket: "seva-f5ac6.firebasestorage.app",
  messagingSenderId: "607135278812",
  appId: "1:607135278812:web:742dabee4e0c1f0e47f619",
  measurementId: "G-DXSLHBS17T"
};

let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db };

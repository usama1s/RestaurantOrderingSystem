import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD6h0rfuUsBltgmnH4jbNs3GHmbuB8MmbY",
  authDomain: "foodorderingapp-b360f.firebaseapp.com",
  projectId: "foodorderingapp-b360f",
  storageBucket: "foodorderingapp-b360f.appspot.com",
  messagingSenderId: "662608382412",
  appId: "1:662608382412:web:859cd0d1618089c8d8f569",
};
// Initializing Firebase
const app = initializeApp(firebaseConfig);
// Initializing Authentication, Firestore and Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe1PYOLIAFVlCrKa8ZHyFNJC6OPShucfw",
  authDomain: "sage-8ed76.firebaseapp.com",
  projectId: "sage-8ed76",
  storageBucket: "sage-8ed76.firebasestorage.app",
  messagingSenderId: "1053299490675",
  appId: "1:1053299490675:web:417c439d8469fe1ffd8f06",
  measurementId: "G-M5NETD5C38",
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

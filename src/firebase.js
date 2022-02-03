import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEDR50xY-8zR_Pc44U3MY9qa42s1MLN10",
  authDomain: "final-project-46b6c.firebaseapp.com",
  projectId: "final-project-46b6c",
  storageBucket: "final-project-46b6c.appspot.com",
  messagingSenderId: "626633957520",
  appId: "1:626633957520:web:0b2cc78f9d63ebcb547815",
  measurementId: "G-4R8P80PEY8"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseDatabase = getDatabase(app);

export { firebaseAuth, firebaseDatabase };
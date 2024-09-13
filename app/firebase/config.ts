// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCoLR3jjnfnDiE0DXZNWeiSGYhn1q582yc",
  authDomain: "portfolio-fcb32.firebaseapp.com",
  databaseURL: "https://portfolio-fcb32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-fcb32",
  storageBucket: "portfolio-fcb32.appspot.com",
  messagingSenderId: "706339784006",
  appId: "1:706339784006:web:8eda8028fffd36b90bd147",
  measurementId: "G-NHH2R14BPK"
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
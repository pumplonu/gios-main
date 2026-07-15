// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR337F7hEnGzNkaZrjL3vURgU27MInTQo",
  authDomain: "gios-inventario.firebaseapp.com",
  projectId: "gios-inventario",
  storageBucket: "gios-inventario.firebasestorage.app",
  messagingSenderId: "397188301351",
  appId: "1:397188301351:web:479caccf1baeb0dbc88402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ayuda a obtener la info de la base de datos
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Firebase
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Inicialice Cloud Firestore y obtenga una referencia al servicio
export const db = getFirestore(app);
//Provider Google
export const provider = new GoogleAuthProvider();
//Auth usuario
export const auth = getAuth(app);

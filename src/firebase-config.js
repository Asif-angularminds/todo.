import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgvgE58VLjwD8Wv8j-DGtxsM-2Wlg62EQ",
  authDomain: "react-fairbase.firebaseapp.com",
  projectId: "react-fairbase",
  storageBucket: "react-fairbase.appspot.com",
  messagingSenderId: "18196156753",
  appId: "1:18196156753:web:094b15c2c230723cd4c370",
  measurementId: "G-X2LQ8PGJD1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

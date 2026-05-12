import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB0GvvrVdYF0fbMblCoRxsR_nbbcnkdhao",
  authDomain: "catequesesystem.firebaseapp.com",
  projectId: "catequesesystem",
  storageBucket: "catequesesystem.firebasestorage.app",
  messagingSenderId: "527715789138",
  appId: "1:527715789138:web:bfeecc1dbc89297dbd728b",
  measurementId: "G-2EM9QHFS93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
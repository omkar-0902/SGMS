import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkyfUo_RZ0Ahc7xwQXKRI7w8xTmtD_xBM",
  authDomain: "ecosync-3a5c1.firebaseapp.com",
  databaseURL: "https://ecosync-3a5c1-default-rtdb.firebaseio.com",
  projectId: "ecosync-3a5c1",
  storageBucket: "ecosync-3a5c1.firebasestorage.app",
  messagingSenderId: "902374916444",
  appId: "1:902374916444:web:9877e3d389222690780199"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

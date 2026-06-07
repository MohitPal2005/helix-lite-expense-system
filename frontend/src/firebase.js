import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiPMep7muip_FlHOGieqWUymWSOJd_R6M",
  authDomain: "helix-lite.firebaseapp.com",
  projectId: "helix-lite",
  storageBucket: "helix-lite.firebasestorage.app",
  messagingSenderId: "911531866932",
  appId: "1:911531866932:web:ba933c2cb568598f974361"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
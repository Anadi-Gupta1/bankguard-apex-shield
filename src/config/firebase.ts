import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQmsYMFtcQofPZq6o12pku3jhk-iKcZpM",
  authDomain: "cybershield-2ab54.firebaseapp.com",
  projectId: "cybershield-2ab54",
  storageBucket: "cybershield-2ab54.firebasestorage.app",
  messagingSenderId: "973389366642",
  appId: "1:973389366642:web:4b4576ed554f571de649eb",
  measurementId: "G-SZZ5XGYJ9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;

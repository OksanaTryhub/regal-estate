import { initializeApp } from "firebase/app";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "regal-estate-e8ba3.firebaseapp.com",
  projectId: "regal-estate-e8ba3",
  storageBucket: "regal-estate-e8ba3.appspot.com",
  messagingSenderId: "842572375208",
  appId: "1:842572375208:web:8421d9a766e0eb530ece9d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

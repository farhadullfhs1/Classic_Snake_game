// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { getFirestore,collection,doc, updateDoc } from "firebase/firestore";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPij4qu-zzv4EOaaoVumh05GMfwxpWuhk",
  authDomain: "arise-8e4ab.firebaseapp.com",
  projectId: "arise-8e4ab",
  storageBucket: "arise-8e4ab.appspot.com",
  messagingSenderId: "852909299185",
  appId: "1:852909299185:web:c8363ea1407694a72ae050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Update the auth initialization with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const database = getFirestore();

// Function to update the high score
export const updateHighScore = async (userId, newHighScore) => {
  const userRef = doc(collection(database, 'users'), userId);
  await updateDoc(userRef, { highScore: newHighScore });
};

// Function to get the current user
// Function to get the current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe(); // Unsubscribe to avoid memory leaks
    }, (error) => {
      reject(error);
      unsubscribe(); // Unsubscribe to avoid memory leaks
    });
  });
};


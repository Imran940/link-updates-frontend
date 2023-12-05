import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC8W8r7DXuOjgkBfj1K9DIDLdDW93YdZpY",
  authDomain: "clone-dfd9a.firebaseapp.com",
  databaseURL: "https://clone-dfd9a.firebaseio.com",
  projectId: "clone-dfd9a",
  storageBucket: "clone-dfd9a.appspot.com",
  messagingSenderId: "263467331404",
  appId: "1:263467331404:web:0e22364c73980537b9a9e9",
  measurementId: "G-RHBQR6Z9PM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
// messaging.
export { app, messaging };

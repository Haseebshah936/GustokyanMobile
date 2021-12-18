import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./APIKeys";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleAuthProvider = firebase.auth.GoogleAuthProvider;

export { db, auth, storage, googleAuthProvider };

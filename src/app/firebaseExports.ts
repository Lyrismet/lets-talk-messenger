import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebaseConfig";
import {getFirestore} from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { app, auth, firestore };
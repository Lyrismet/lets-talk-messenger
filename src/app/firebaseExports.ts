import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebaseConfig";
import {getFirestore} from "firebase/firestore";
export const app = initializeApp(firebaseConfig);
export const config = getAuth(app);
export const firestore = getFirestore(app);
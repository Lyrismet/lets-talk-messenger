import Image from 'next/image'
import styles from './page.module.css'
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../firebaseConfig";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Home() {
    return (
        <main className={styles.main}>
            base
        </main>
    )
}

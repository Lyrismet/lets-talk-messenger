"use client";

import styles from './page.module.css'

import {useAuthState} from "react-firebase-hooks/auth";

import ChatRoom from "@/components/ChatRoom/ChatRoom";
import SignIn from "@/components/SignIn/SignIn";
import {app, config, firestore} from "@/app/firebaseExports";

export default function Home() {
    const [user] = useAuthState(config);

    return (
        <main className={styles.main}>
            {user ? <ChatRoom /> : <SignIn />}
        </main>
    );
}


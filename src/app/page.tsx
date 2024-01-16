"use client";

import styles from './page.module.css'

import {useAuthState} from "react-firebase-hooks/auth";

import ChatRoom from "@/components/ChatRoom/ChatRoom";
import SignIn from "@/components/SignIn/SignIn";
import {auth} from "@/app/firebaseExports";

export default function Home() {
    const [user] = useAuthState(auth);

    return (
        <main className={styles.main}>
            {user ? <ChatRoom /> : <SignIn />}
        </main>
    );
}


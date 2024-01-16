import s from './ChatRoom.module.scss'
import {firestore, auth} from "@/app/firebaseExports";
import { collection, query, orderBy, limit, serverTimestamp, addDoc } from "firebase/firestore";
import SignOut from "@/components/SignOut/SignOut";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
const ChatRoom = () => {
    const messageRef = collection(firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt'), limit(25));
    const [messages] = useCollectionData(q, {idField: 'id'} as any);
    const [formValue, setFormValue] = useState('')
    const sendMessage = async (e: any) => {
        e.preventDefault();
        const {uid, photoUrl}: any = auth.currentUser;
        const defaultUser = '/icons8-user-64.png';
        const sanitizedPhotoUrl = photoUrl || defaultUser;
        await addDoc((messageRef as any),{
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoUrl: sanitizedPhotoUrl
        })
        setFormValue('')
    }
    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.key} message={msg}/>)}
            </div>

            <form onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            
        <div>
            placeholder
            <SignOut/>
        </div>
        </>
    );
};

export const ChatMessage = (props: { message: any }) => {
    const {text, uid, photoUrl} = props.message;
    const messageClass = uid === auth.currentUser?.uid ? `${s.message} ${s.sent}` : `${s.message} ${s.received}`;
    return (
        <div>
            <img src={photoUrl} alt="photo"/>
            <p className={messageClass}>{text}</p>
        </div>
    );
}
export default ChatRoom;
import s from './ChatRoom.module.scss'
import {firestore, auth} from "@/app/firebaseExports";
import {collection, query, orderBy, limit, serverTimestamp, addDoc} from "firebase/firestore";
import SignOut from "@/components/SignOut/SignOut";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useRef, useState} from "react";
import Settings from "@/components/Settings/Settings";
import SidebarBlock from "@/components/ChatRoom/SideBarBlock/SidebarBlock";

const ChatRoom = () => {
    const dummy = useRef<HTMLDivElement>(null);
    const messageRef = collection(firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt'), limit(25));
    const [messages] = useCollectionData(q, {idField: 'id'} as any);
    const [formValue, setFormValue] = useState('')
    const sendMessage = async (e: any) => {
        e.preventDefault();
        const uid = auth.currentUser?.uid;
        const photoUrl = auth.currentUser?.photoURL;
        const defaultUser = '/icons8-user-64.png';
        const sanitizedPhotoUrl = photoUrl || defaultUser;
        await addDoc((messageRef as any), {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoUrl: auth.currentUser?.photoURL || sanitizedPhotoUrl,
            displayName: auth.currentUser?.displayName
        })
        setFormValue('')

        dummy.current!.scrollIntoView({behavior: 'smooth'})
    }


    return (
        <div className={s.chatRoomWrapper}>
            <div className={s.sideBarContainer}>
                <div className={s.profileWrapper}>
                    <div className={s.profileInfo}>
                        <img src={auth.currentUser?.photoURL ? auth.currentUser.photoURL : ''} alt="userPhoto"/>
                        <p className={s.name}>{auth.currentUser?.displayName}</p>
                    </div>
                    <div className={s.settings}>
                        <Settings/>
                        <SignOut/>
                    </div>

                </div>
                <div className={s.sideBarContent}>
                    <SidebarBlock
                        tag="about"
                        text="Welcome to the knowledge chat library!
                Each user can share knowledge, or use this chat room as a collection of cheat sheets for
                themselves. You can write necessary commands for git, necessary knowledge on any of the
                popular
                frameworks, etc. and consolidate them here. Try it now!"
                    />
                    <SidebarBlock
                        color={"#4756DF"}
                        tag={"updates"}
                        text={"This version of the app has an option to share messages in the general chat. Future updates will add customisation, changing profile details, other authentication methods, pinning messages, likes. "}
                    />
                </div>
            </div>
            <div className={s.chatContainer}>
                <div className={s.messageContainer}>
                    {messages && messages.map(msg => <ChatMessage key={msg.key} message={msg}/>)}
                    <div className={s.dummy} ref={dummy}/>
                </div>

                <form onSubmit={sendMessage}>
                    <input placeholder="Write a message..." type="text" value={formValue}
                           onChange={(e) => setFormValue(e.target.value)}/>
                    <button type="submit">
                        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="27.5" cy="27.5" r="27.5" fill="#4756DF"/>
                            <path
                                d="M38.1661 15.9696C38.0213 15.8494 37.8453 15.7728 37.6587 15.7487C37.472 15.7247 37.2824 15.7542 37.1118 15.8338L16.6472 25.4395V27.2982L25.2428 30.7363L30.7563 39.2188H32.6153L38.4894 16.9824C38.537 16.8003 38.5319 16.6084 38.4747 16.4291C38.4174 16.2498 38.3104 16.0904 38.1661 15.9696ZM31.4675 37.446L26.7284 30.1548L34.021 22.1674L32.8672 21.1139L25.5175 29.1635L18.4304 26.3287L36.6649 17.7695L31.4675 37.446Z"
                                fill="white"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export const ChatMessage = (props: { message: any }) => {
    const {text, uid, photoUrl, createdAt, displayName} = props.message;
    const messageClass = uid === auth.currentUser?.uid ? `${s.message} ${s.sent}` : `${s.message} ${s.received}`;
    const messageTime = createdAt ? new Date(createdAt.toDate()) : null;
    return (
        <div className={s.chatMessage}>
            <img src={photoUrl} alt="photo"/>
            <p className={messageClass}>
                <p className={s.messageName}>{displayName == auth.currentUser?.displayName ? 'You: ' : displayName}</p>
                {text}
                {messageTime && (
                    <span>{messageTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })}</span>
                )}
            </p>
        </div>
    );
}
export default ChatRoom;
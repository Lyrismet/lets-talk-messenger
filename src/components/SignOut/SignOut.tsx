import {config} from "@/app/firebaseExports";

const SignOut = () => {
    return config.currentUser &&(
        <button onClick={() => config.signOut()}>Sign Out</button>
    );
};

export default SignOut;
import firebase from "firebase/compat/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { User } from "./baseTypes";
import { NavigateFunction } from "react-router-dom";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const initFirebaseAPP = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
};

initFirebaseAPP();
export { firebase };
export const firebaseAuth = getAuth();

export const signInWithProvider = async (prov: string) => {
    let provider;
    switch (prov) {
        case "Google":
            provider = new GoogleAuthProvider();
            break;

        default:
            provider = new FacebookAuthProvider();
    }

    let user: UserCredential | undefined;
    let error = "";
    await signInWithPopup(firebaseAuth, provider)
        .then((res) => (user = res))
        .catch((err) => {
            error = trimFirebaseErrors(err.message);
        });

    return { user, error };
};

export const trimFirebaseErrors = (str: string) => {
    return str.replace("Firebase: Error (auth/", "").replaceAll("-", " ").replace(")", "");
};

export const completeSignIn = (userCredential: UserCredential | undefined, setUser: React.Dispatch<User | undefined>, navigate: NavigateFunction) => {
    if (userCredential) {
        const { displayName, email, photoURL, emailVerified } = userCredential.user;

        setUser({
            displayName: displayName || "",
            email: email || "",
            photoURL: photoURL || "",
            emailVerified: emailVerified,
        });
    }

    navigate("/");
};

export const signOut = (navigate: NavigateFunction) => {
    firebaseAuth.signOut().then(
        function () {
            console.log("Signed Out");
            navigate("/login");
        },
        function (error) {
            console.error("Sign Out Error", error);
        }
    );
};

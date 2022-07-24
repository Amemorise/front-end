import firebase from "firebase/compat/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { login } from "../redux/user";
import { isFirstTimeGuest, setReturningUser } from "./helpers";
import { api } from "./apiHelpers";
import { setToast } from "../redux/toast";
import { setIsLoading } from "../redux/loading";

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

export const completeSignIn = async (
    userCredential: UserCredential | undefined,
    dispatch: React.Dispatch<any>,
    navigate: NavigateFunction
) => {
    dispatch(setIsLoading(true));
    if (userCredential) {
        try {
            const { displayName, email, photoURL, emailVerified } = userCredential.user;

            const token = await userCredential.user.getIdToken();
            const res = await api.post(
                "/users/signIn",
                { displayName, email, photoURL, emailVerified },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (res.status === 200) {
                dispatch(login({ ...res.data }));
                if (isFirstTimeGuest()) {
                    setReturningUser();
                }

                navigate("/home");
            } else {
                dispatch(setToast({ type: "error", message: "Login Failed. Please try again" }));
            }
        } catch (err: any) {
            dispatch(setToast({ type: "error", message: err.message }));
            dispatch(setIsLoading(false));
            throw err;
        }
    }
    dispatch(setIsLoading(false));
};

export const signOut = async (navigate: NavigateFunction) => {
    try {
        await firebaseAuth.signOut();
        await api.get("/users/signOut");
        navigate("/login");
    } catch (err: any) {
        console.error("Sign Out Error", err);
    }
};

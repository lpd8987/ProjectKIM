import { GoogleAuthProvider, signInWithPopup, getAuth, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import router from '../../router';
import { fbApp } from "@/main";

function checkSignIn() : boolean {
    if (sessionStorage.key(0)) return true;
    let currUser = getAuth(fbApp).currentUser;
    if(currUser) return true;
    else return false;
}

async function googleSignIn () {
    const auth = getAuth(fbApp);
    const provider = new GoogleAuthProvider();
    
    setPersistence(auth, browserSessionPersistence).then(async () => {
        return await signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(!credential){
                throw new Error();
            }
            router.push("/")
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
}

async function signOutSession () {
    const auth = getAuth(fbApp);
    signOut(auth).then(() => {
        // Sign-out successful.
        sessionStorage.clear();
      }).catch((error) => {
        // An error happened.
      });
}

export {
    checkSignIn,
    googleSignIn,
    signOutSession
}
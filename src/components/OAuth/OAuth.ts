import { getAuth } from "firebase/auth";
import router from '../../router';

function checkSignIn() : boolean {
    let currUser = getAuth().currentUser;
    if(currUser) return true;
    else return false;
}

export {
    checkSignIn
}
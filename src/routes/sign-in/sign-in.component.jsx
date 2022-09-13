import { 
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        // We should always get one back now whether the user has just been created before or not. 
        const userDocRef = await createUserDocumentFromAuth( user )
        console.log('userDocRef' + userDocRef)
    }

    return (
        <>
        <button onClick={logGoogleUser}>
            Sign in with Google Popup
        </button>
        <SignUpForm />
        </>
       
    )
}

export default SignIn;


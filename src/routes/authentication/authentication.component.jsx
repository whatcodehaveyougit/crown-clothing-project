import { 
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from '../../components/sign-in/sign-in.component'
import './authentication.styles.scss'

const Authentication = () => {

    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     // We should always get one back now whether the user has just been created before or not. 
    //     const userDocRef = await createUserDocumentFromAuth( user )
    //     console.log('userDocRef' + userDocRef)
    // }

    return (
        <>
        {/* <button onClick={logGoogleUser}>
            Sign in with Google Popup
        </button> */}
        <div className='authentication-container'>
            <SignUp />
            <SignIn />
        </div>
        </>
       
    )
}

export default Authentication;


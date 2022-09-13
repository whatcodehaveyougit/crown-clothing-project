import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useDebugValue } from 'react';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCdcljlAc5r1gzRHQSrt5Pm_SZfzluMf48",
    authDomain: "crown-clothing-403e6.firebaseapp.com",
    projectId: "crown-clothing-403e6",
    storageBucket: "crown-clothing-403e6.appspot.com",
    messagingSenderId: "949498107088",
    appId: "1:949498107088:web:956712b00970164524fad5"
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

//   GoogleAuthProvider is a class we get from firebase.
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider )
  export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider )
  export const signInWithEmailAndPasswordNormal = () => signInWithEmailAndPassword( auth )

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async ( 
    userAuth, 
    additionalInfo = {  }
    ) => {

    if ( !userAuth ) return;

    // users is a reference to our collections
    const userDocRef = doc( db, 'users', userAuth.uid)

    // A snapshot allows us to check whether an instance of this already exists in DB
    const userSnapshot = await getDoc( userDocRef );

    // console.log( userSnapshot.exists )

    if (!userSnapshot.exists) {
        console.log('user does not exist');
        const { displayName, email } = userAuth;
        const createdAt = new Date;
        try {
            await setDoc( userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInfo
            })
        }   catch ( error ) {
            console.log( 'error creating user' + error );
        }
    }
    console.log('user does exist');
    return userDocRef;
  }


  export const createAuthUserWithEmailAndPassword = async ( email, password ) => {

    if ( !email || !password ) return;
    // const createdAt = new Date;
    const auth = getAuth()
    return await createUserWithEmailAndPassword( auth, email, password );

  }


  export const signInAuthUserWithEmailAndPassword = async ( email, password ) => {

    if ( !email || !password ) return;
    // const createdAt = new Date;
    const auth = getAuth()
    return await signInWithEmailAndPassword( auth, email, password );

  }

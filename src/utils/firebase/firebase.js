import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, provider )

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async ( userAuth ) => {
    // users is a reference to our collections
    const userDocRef = doc( db, 'users', userAuth.uid)

    // A snapshot allows us to check whether an instance of this already exists in DB
    const userSnapshot = await getDoc( userDocRef );

    // console.log( userSnapshot )
    // console.log( userSnapshot.exists )

    if (!userSnapshot.exists) {
        console.log('user does not exist');
        const { displayName, email } = userAuth;
        const createdAt = new Date;
        try {
            await setDoc( userDocRef, {
                displayName, 
                email,
                createdAt
            })
        }   catch ( error ) {
            console.log( 'error creating user' + error );
        }
    }
    console.log('user does exist');
    return userDocRef;
  }
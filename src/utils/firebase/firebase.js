import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, // retrieve docs inside of firebase db
  getDoc, // getting doc data
  setDoc, // in order to set the data on a doc
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { useDebugValue } from "react";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crown-clothing-403e6.firebaseapp.com",
  projectId: "crown-clothing-403e6",
  storageBucket: "crown-clothing-403e6.appspot.com",
  messagingSenderId: "949498107088",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  GoogleAuthProvider is a class we get from firebase.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider )
export const signInWithEmailAndPasswordNormal = () =>
  signInWithEmailAndPassword(auth);

export const db = getFirestore(); // once we have instantiated Firestore we can use it to acces our DB

// The function used to write JSON to the Firebase DB
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  // We write multiple different documents (which are objects at the start) into a collection
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // The collectionRef tells the docRef which DB we are using
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCatagoriesAndDocuments = async () => {
  const collectionRef = collection(db, "catagories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// This function takes the data we get from Auth Service
// And then we store that in Firestore...
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
  // When using sign-up-form component we won't get display name back
  // So we pass it in manually and spread it into the setDoc()
) => {
  if (!userAuth) return;
  // users is a reference to our collections
  const userDocRef = doc(db, "users", userAuth.uid);
  // A snapshot allows us to check whether an instance of this already exists in DB
  // Digs into that place in the DB with the UID we get from userAuth
  // Then that will determine if the user exists or not.
  const userSnapshot = await getDoc(userDocRef);

  // If User does not already exist - create a user
  // If a User does exist - return it to me
  if (!userSnapshot.exists) {
    // console.log('User exist pas, creating new entry in DB..');
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user" + error);
    }
  }
  return userDocRef;
};

// Naming this function the same as the real FireBase method used to interact with the API
// Gives a layer inbetween our front-end code and our interactions with Firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

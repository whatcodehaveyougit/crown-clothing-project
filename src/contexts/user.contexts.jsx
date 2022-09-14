import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase";

// The actual value I want to access
export const UserContext = createContext( {
    setCurrentUser: () => null,
    currentUser: null
});

// This is the actual component
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };

    // Forcing a sign out if the user is signed in
    // signOutUser();

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener( async ( user ) => {
            console.log( 'the user' + user );
            if ( user ) {
                await createUserDocumentFromAuth( user )
            }
            setCurrentUser( user )
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}> { children } </UserContext.Provider>
}

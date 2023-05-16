import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase";

// The actual value I want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// This is the actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // Centralising control of setting user, best here rather than on sign in/out component
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // This in theory creates the document in the Firebas DB (although no working atm)
        await createUserDocumentFromAuth(user);
      }
      // current user will be null if nobody is signed in
      // current user will be the object if someone is signed in
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

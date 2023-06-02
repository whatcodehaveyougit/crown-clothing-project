import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "../src/routes/shop/shop.component";
import Checkout from "../src/routes/checkout/checkout.component";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // Centralising control of setting user, best here rather than on sign in/out component
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // This in theory creates the document in the Firebas DB (although no working atm)
        await createUserDocumentFromAuth(user);
      }
      // current user will be null if nobody is signed in
      // current user will be the object if someone is signed in
      console.log(user);
      // setCurrentUser is creating an ACTION object for us
      // The dispath function to root reducer, which passes the action to every single reducer..!
      console.log(setCurrentUser(user));
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  // Don't need to pass dispatch into here, the function never changes, the linter is just a bit aggresive

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* Shop Component must have own routes inside, so it will manage what comes next */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;

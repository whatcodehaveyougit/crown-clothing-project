import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import Button from "../button/button.componet";
import {
  // signInWithGooglePopup,
  // createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const signInWithGoogle = async () => {
  //   await signInWithGooglePopup();
  //   // We should always get one back now whether the user has just been created before or not.
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // currentUser is set in UserContext, see UserContext for how
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong Password");
          break;
        case "auth/user-not-found":
          alert("Wrong Password");
          break;
        default:
          console.log(error);
      }
    }
    // We should always get one back now whether the user has just been created before or not.
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          {/* <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button" // This stops the form from submitting when we press the button
            onClick={signInWithGoogle}
          >
            Google Popup SignIn
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;

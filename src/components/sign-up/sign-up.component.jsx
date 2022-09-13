import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-up.styles.scss'
import Button from '../button/button.componet'
import { 
    createAuthUserWithEmailAndPassword,
    signInWithEmailAndPasswordNormal,
    createUserDocumentFromAuth
 } from "../../utils/firebase/firebase"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  
const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // console.log( formFields );


    const handleSubmit = async ( event ) => {
        event.preventDefault();
        
        if ( password != confirmPassword ) return;

        try {
            const { user } = await createAuthUserWithEmailAndPassword( 
                email, 
                password 
            )
            await createUserDocumentFromAuth( user, { displayName } )
            resetFormFields();
        } catch ( error ) {
            if ( error.code == 'auth/email-already-in-use' ) {
                alert('User already exists')
            }
            console.log('error in creating user' + error )
        }

        // We should always get one back now whether the user has just been created before or not. 
    }

    const resetFormFields = () => {
        setFormFields( defaultFormFields );
    }

    const handleChange = ( event ) => {
        const { name, value } = event.target;
        setFormFields( {...formFields, [name]: value } )
        console.log('hello');
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Display Name'
                type='text'
                required
                onChange={handleChange}
                name='displayName'
                value={displayName}
                />

                <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
                />

                <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
                />

                <FormInput
                label='Confirm Password'
                type='password'
                required
                onChange={handleChange}
                name='confirmPassword'
                value={confirmPassword}
                />
                <Button
                    type="submit"
                    // buttonType="google"
                >Sign up</Button>
            </form>
        </div>
    )
}

export default SignUp;
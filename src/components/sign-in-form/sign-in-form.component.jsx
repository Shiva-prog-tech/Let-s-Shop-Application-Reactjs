import React, { useContext } from "react";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.component";

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  // const {setCurrentUser}=useContext(UserContext);

  // console.log(formFields);

  const resetFormFealds = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    /*const { user } = */ await signInWithGooglePopup();
    // setCurrentUser(user); 
    // await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user}= await signInAuthUserWithEmailAndPassword(email,password);
      // setCurrentUser(user);
      resetFormFealds();
    } catch (error) {
  switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  
  return (
    <div className="sign-in-container">
      <h2>Already have account?</h2>
      <span>Sign in with your mail and password </span>
      <form onSubmit={handleSubmit}>
        {/* <FormInput 
        label="DisplayName"
        inputOptions={ {
        type:'text' ,
        onChange:handleChange ,
        name:'displayName' ,
        value:displayName ,
        required:true
        }}
        /> */}

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign-In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            {" "}
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;



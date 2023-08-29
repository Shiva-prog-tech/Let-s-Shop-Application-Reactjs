import React from "react";
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import './authentication.styles.scss'
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {

  // useEffect(() => {
  //   return async() => {
  //     const response = await getRedirectResult(auth);

  //   if(response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //     console.log(userDocRef);
  //   }
  //   };
  // }, []);

 
 
  return (
    <div className="authentication-container">
      
      
      {/* <button onClick={signInWithGoogleRedirect}>
        signInWithGoogleRedirect
      </button> */} 
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default Authentication;

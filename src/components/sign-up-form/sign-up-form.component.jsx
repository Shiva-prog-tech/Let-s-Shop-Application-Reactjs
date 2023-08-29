import React, { useContext } from 'react';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';

import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.component';

const defaultFormFields={
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;

    // const {setCurrentUser}=useContext(UserContext)

    // console.log(formFields);

    const resetFormFealds =()=>{
       setFormFields(defaultFormFields)
    }
    const handleSubmit =async(event)=>{
      event.preventDefault();
      if(password!==confirmPassword){
        alert("password donot match");
        return;
      }
      try{
        const {user}=await createAuthUserWithEmailAndPassword(email,password);
        // setCurrentUser(user);
        await createUserDocumentFromAuth(user,{displayName});
        resetFormFealds();
      }
      catch(error){
        if(error.code==="auth/email-already-in-use"){
          alert("cant crete user useing thie email, email is alredy in use");

        }else{
          console.log("user creation encounter an error", error);
        }
        
      }


    }

const handleChange = (event) =>{
 const {name, value}= event.target;
 setFormFields({...formFields,[name]:value});
} 
    
  return (
    <div className='sign-up-container'>
    <h2>i do not have account?</h2>
      <span>Sign Up with your mail and password </span>
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
        label="DisplayName" 
        type='text' 
        onChange={handleChange} 
        name='displayName' 
        value={displayName} 
        required />
        
        <FormInput label="Email" type='email' onChange={handleChange} name='email' value={email} required />
        
        <FormInput label="Password" type='password' onChange={handleChange} name='password' value={password} required />

        <FormInput label="Confirm password" type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword} required />
        <Button  type='submit'>Sign-Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;

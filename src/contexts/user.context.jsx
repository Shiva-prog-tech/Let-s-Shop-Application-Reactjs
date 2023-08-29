import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener,signOutUser,createUserDocumentFromAuth } from "../utils/firebase/firebase.component";


export const UserContext=createContext({
    currentUser:null,
    setCurrentUser: ()=>null
    

});


export const UserProvider=({children})=>{

const [currentUser,setCurrentUser]=useState(null);
const value={currentUser,setCurrentUser};

// signOutUser();

useEffect(()=>{
    const unsubScribe=onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user)
        }
       setCurrentUser(user)
       
    });
    

    return unsubScribe;
    }, []);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
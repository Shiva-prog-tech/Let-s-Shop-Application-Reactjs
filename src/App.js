import React from "react";
import Navigation  from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component"
// import SignIn from "./routes/sign-in/sign-in.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";


// const Shop =()=>{
//   return(
//       <h1>this is the shope page</h1>
//   )
// }

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path="shop/*" element={<Shop/>} />   
      <Route path="auth" element={<Authentication/>} />   
      <Route path="checkout" element={<CheckOut/>} />   
      
      </Route>
    </Routes>
  );
};

export default App;

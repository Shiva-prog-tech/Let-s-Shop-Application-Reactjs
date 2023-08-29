import React, { useContext } from "react"
import {Outlet, Link} from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as Shoplogo } from "../../assets/Shoplogo.svg";
import "./navigation.style.scss"
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation=()=>{
  const {currentUser/*, setCurrentUser*/}=useContext(UserContext);
// const signOutHandler=async()=>{
//   await signOutUser();
//   setCurrentUser(null);

// }

const {isCartOpen}=useContext(CartContext);

    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to="/">
        <Shoplogo className="logo"/> Let`s Shop

        </Link>
          <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
          <div>Shop</div>
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            ):(<Link className="nav-link" to="/auth">
          <div>SIGN IN</div>
          </Link>)
          }
          <CartIcon/>
          </div>
          {
            isCartOpen && <CartDropdown/>
          }
          
        </div>
      <Outlet/> 
      </Fragment>
    )
  }

export default Navigation
import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if the cartitems containes the producttoadd
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if found, increment quantity
  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems/new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  //find if the cartitems to remove
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if the quantity is equal to 1,  if it is remove that cart item from the cart
  if (existingCartItems.quantity===1) {
    
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    
  }

  //return back cartitems with matching cart item with reduced quantity

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem=(cartItems,cartItemToClear)=>cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
    
  

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  clearItemFromCart:()=>{},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal]=useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity*cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  
    const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

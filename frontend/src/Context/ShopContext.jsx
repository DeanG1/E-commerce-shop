import React, {createContext, useState} from "react";
import all_product from "../Components/Assets/all_product";
import CartItems from "../Components/CartItems/CartItems";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {};
    for(let i = 0; i <= all_product.length+1; i++){
        cart[i] = 0;
    }
    return cart
}
const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] + 1}));
        console.log(cartItems);
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] - 1}));
    }


    //This function will allow us to get the total amount of items in the cart
    //First we will create a variable that will store the total amount
    //Then we will loop through all the items in the all_product arraay/object
    //If the item is in the cart we will add the price of the item to the total amount
    //Finally we will return the total amount
    //This will allow us to get the total amount of items in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;

    }


    //This function will allow us to count the number of items in the cart
    //Then we are going to asign the variable to the cart in the navbar

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }


    const contextValue = {getTotalCartAmount, getTotalCartItems, all_product, cartItems, addToCart, removeFromCart, };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
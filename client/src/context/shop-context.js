import React, { createContext, useState} from 'react'
import { useFetch } from '../useFetch';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({children}) => {
    const [cartItems,setCartItems] = useState([]);
    const {products} = useFetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    const [searchResults,setSearchResults] = useState([]);

    const getQuantity = (itemId) =>{
        const quantity = cartItems.find(product =>product.id === itemId)?.amount;
        if (quantity === undefined){
            return 0;
        }
        return quantity;
    }

  const addToCart = (itemId) =>{
        const quantity = getQuantity(itemId)

        if (quantity === 0) {
            setCartItems(
                [...cartItems,
                    {id : itemId,
                    amount : 1}
                     ]

            )
        }
        else {
            setCartItems(
                cartItems.map(
                    product =>
                    product.id === itemId
                ? {...product, amount: product.amount + 1} : product
            ))
        }
    }
    const clearCart = (itemId) =>{
        setCartItems  (cartItems =>
            cartItems.filter(currentItem => {return currentItem.id !== itemId})
            )
    }
    const removeFromCart = (itemId) =>{
        const quantity = getQuantity(itemId)
        quantity === 1 ? clearCart(itemId) :
        setCartItems(
            cartItems.map(
                product =>
                product.id === itemId
            ? {...product, amount: product.amount - 1} : product
        ))
    }
    const getCurrentProducts = (itemId) =>{

        let productsArray = products.find(product => product.id === itemId)

        if (products === undefined) {
            return undefined
        }

        return  productsArray

      }

    const getTotalCost = () =>{
    let totalCost = 0;
    cartItems.map(cartItem=> {
        const currentProduct = getCurrentProducts(cartItem.id);
        totalCost += currentProduct.price * cartItem.amount
    });
    return totalCost

    }

    const getTotalAmount = () =>{
        let totalAmount = 0;
        cartItems.map(cartItem=>{
            totalAmount += cartItem.amount
        });
        return totalAmount
        }
    const contextValue = {cartItems, getQuantity, addToCart, removeFromCart, clearCart, products, getCurrentProducts, getTotalCost, setSearchResults,searchResults, getTotalAmount }
return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
};

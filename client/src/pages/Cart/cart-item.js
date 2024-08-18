import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import "./cart.css"
import {faPlus, faMinus, faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItem = ({amount, data}) => {

   const {removeFromCart, clearCart, addToCart} = useContext(ShopContext);

    return (

    <div className='shoppingList'>
        <img src={data?.image_link} alt={data?.name} className='cart-productimg'/>
        <div className='description'>
            <p className='cart-productname'>
                {data?.name}
            </p>
            <div className='cartbtns'>
            <button onClick={()=> removeFromCart(data?.id)}>
                <FontAwesomeIcon icon={faMinus}/>
            </button>
            <p className='cart-productamount'>
                {amount}
            </p>
            <button onClick={()=> addToCart(data?.id)}>
            <FontAwesomeIcon icon={faPlus}/>
            </button>
            </div>
        </div>
        <div className='cart-producttotal'>
            <p>
                {(amount * data?.price).toFixed(2)} €
            </p>
            <button onClick={()=> clearCart(data?.id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    </div>
)
}

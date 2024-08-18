import { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import { CartItem } from './cart-item';
import "./cart.css"
import React from 'react';

export const Cart = () => {

  const { cartItems, getQuantity, getCurrentProducts, getTotalCost, getTotalAmount } = useContext(ShopContext);

  const currentCartProducts = cartItems.map(cartItem => getCurrentProducts(cartItem.id))

    return (
    <div className='wrapper'>
      <h1>Your Cart Items</h1>
      <div className='cart'>
      <div className='cartItems'>
      { currentCartProducts.map(currentCartProduct =>( cartItems.length !== 0 && <CartItem amount={getQuantity(currentCartProduct?.id)} data={currentCartProduct} key={currentCartProduct?.id}/>)) }
      </div>
        <div className='totalcosts'>
        <p className='overview-title'>Overview</p>
        <hr/>
        <p className="nritems">Number of items: {getTotalAmount()}</p>
        <hr/>
        <p className='totalcost'>Total Cost: {getTotalCost().toFixed(2)} €</p>
        <hr/>
        <div className='paybtn'>
        <button>
          Pay
        </button>
        </div>
        </div>
      </div>
    </div>
  )
}

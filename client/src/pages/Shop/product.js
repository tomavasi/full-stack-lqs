import React, { useContext } from 'react'
import "../Shop/shop.css"
import { ShopContext } from '../../context/shop-context'

export const Product = ({product}) => {

  const { getQuantity, addToCart } = useContext(ShopContext);
  const cartItemAmount = getQuantity(product.id)


  return (
    <div>
        <div className='productbox'>
        <div className='productimg'>
        <img src={product.image_link} alt={product.name}/>
        </div>
        <div className='description'>
            <p className='productname'>
                {product.name}
            </p>
            <p className='productprice'>
                {product.price} €
            </p>
        </div>
        </div>
        <div className='productbtn'>
        <button className="addToCartBttn" onClick={()=> addToCart(product.id)}> Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}</button>
        </div>
    </div>
  )
}

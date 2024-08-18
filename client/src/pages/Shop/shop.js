import React from 'react'
import { Product } from './product'
import { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const {searchResults, products} = useContext(ShopContext);

  return (
    <div className="shop">
       <div className='shopTitle'>
        <h1> Products</h1>
        </div>
        <div className='products'>
         {products.filter(product=>product.name.toLowerCase().includes(searchResults)).map(product =>( <div className="product" key={product.id}><Product product={product} /></div>)) }
        </div>
    </div>
  )
}

import React from 'react'
import "./products.css"

const Products = (props) => {
const {product,cartHandler}=props
  return (
    <div>
        <div className="card">
            <img className='img-fluid img' src={product.img} alt="" />
            <h3 className= 'text-center mt-4'>{product.name}</h3>
            <p className='price'>Price: ${product.price}</p>
            <p className='ratings'>Ratings: {product.ratings} stars</p>
            <button onClick={()=>cartHandler(product)} className='btn'>ADD TO CART</button>
        </div>
    </div>
  )
}

export default Products
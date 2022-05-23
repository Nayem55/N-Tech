import React from 'react'
import './Cart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";

const Cart = ({item , removeItem}) => {
  return (
    <div className='cart'>
        <FontAwesomeIcon onClick={()=>removeItem(item)} className='icon' icon={faTrashCan}></FontAwesomeIcon>
        <p className='quantity'>{item.quantity}</p>
        <img className='w-25 img-height' src={item.img} alt="" />
        <h6>{item.name}</h6>
    </div>
  )
}

export default Cart
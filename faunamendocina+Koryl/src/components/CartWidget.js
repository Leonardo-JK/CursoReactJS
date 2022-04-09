import React, {useContext, useEffect, useState} from 'react';
import logoCarrito from "../img/logoCarrito.png";
import { CartContext } from '../contexts/CartContext';

function CartWidget(){
    let {un} = useContext(CartContext);
    
    return (
        <div className='cartWidget'>
            <div className='cartWidget__div'>
                <img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' />
                <div className='cartWidget__number'>
                    <p className='cartWidget__num'>{un}</p>
                </div>
            </div>
        </div>
    );
}

export default CartWidget;
import React, {useState} from 'react';
import logoCarrito from "../img/logoCarrito.png";


function CartWidget(num){
    
    return (
        <div className='cartWidget'>
            <div className='cartWidget__div'>
                <img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' />
                <div className='cartWidget__number'>
                    <p className='cartWidget__num'>{localStorage.getItem("cantidad")}</p>
                </div>
            </div>
        </div>
    );
}

export default CartWidget;
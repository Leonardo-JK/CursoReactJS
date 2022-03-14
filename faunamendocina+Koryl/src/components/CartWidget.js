import React from 'react';
import logoCarrito from "../img/logoCarrito.png";

function CartWidget(){
    return (
        <div className='cartWidget'>
            <img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' />
        </div>
    );
}

export default CartWidget;
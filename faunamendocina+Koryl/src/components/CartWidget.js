import React from 'react';
import logoCarrito from "../img/logoCarrito.png";
import BuyComand from './BuyComand';

function CartWidget(props){
    return (
        <div className='cartWidget'>
            <div className='cartWidget__div'>
                <img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' />
                <div className='cartWidget__number'>
                    <p className='cartWidget__num'>{props.num}</p>
                </div>
            </div>
        </div>
    );
}

export default CartWidget;
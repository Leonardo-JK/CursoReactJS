
import React, {useState, useEffect} from 'react';
import logoCarrito from "../img/logoCarrito.png";
import {styl, cantidad} from '../scripts/variables';
import {suma} from '../components/BuyComand';

function CartWidget(){
    let [styles, setStyles] = useState(styl);
    let [cant, setCant] = useState(suma);
    console.log(cantidad);
   
    return (
        <div className='cartWidget'>
            <div className='cartWidget__div'>
                <img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' />
                <div style={styl} className='cartWidget__number'>
                    <p className='cartWidget__num'>{cant}</p>
                </div>
            </div>
        </div>
    );
}

export default CartWidget;
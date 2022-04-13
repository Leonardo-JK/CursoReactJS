import React, {useContext} from 'react';
import logoCarrito from "../img/logoCarrito.png";
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function CartWidget(){
    let {un} = useContext(CartContext);
    
    return (
        <div className='cartWidget'>
            <div className='cartWidget__div'>
                <Link to="/cart"><img className='cartWidget__img' src={logoCarrito} alt='icono carrito de compras' /></Link>
                <div className='cartWidget__number'>
                    <p className='cartWidget__num'>{un}</p>
                </div>
            </div>
        </div>
    );
}

export default CartWidget;
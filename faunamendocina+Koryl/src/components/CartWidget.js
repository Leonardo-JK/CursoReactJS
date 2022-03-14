import React from 'react';
import logoCarrito from "../img/logoCarrito.png";

function CartWidget(){
    return (
        <div>
            <img src={logoCarrito} alt='icono carrito de compras' />
        </div>
    );
}

export default CartWidget;
import React from 'react';
import CartWidget from './CartWidget';

function NavBar (cant){
    return (
        <div className='navbar'>
            <div className='navbar__filtros'>
                <p>Filtros</p>
            </div>
            <div id='menu' className='navbar__menu'>
                <ul>
                    <li><a id='remeras' href='#'>TASAS</a></li>
                    <li><a id='tasas' href='#'>REMERAS</a></li>
                    <li><a id='adornos' href='#'>ADORNOS</a></li>
                    <li><a id='calendarios' href='#'>CALENDARIOS</a></li>
                </ul>
            </div>
            <div className='navbar__cart'>
                <CartWidget />
            </div>
        </div>
    );
}

export default NavBar;


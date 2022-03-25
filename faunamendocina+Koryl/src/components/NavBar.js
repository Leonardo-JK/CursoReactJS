import React from 'react';
import {Link} from 'react-router-dom';
import CartWidget from './CartWidget';

function NavBar (props){
    return (
        <div className='navbar'>
            <div className='navbar__filtros'>
                <p>Filtros</p>
            </div>
            <div id='menu' className='navbar__menu'>
                <ul>
                    <li><Link id='remeras' to='/Tasas'>TASAS</Link ></li>
                    <li><Link id='tasas' to='/Remeras'>REMERAS</Link></li>
                    <li><Link id='gorras' to='/Gorras'>GORRAS</Link></li>
                    <li><Link id='buzos' to='/buzos'>BUZOS</Link></li>
                </ul>
            </div>
            <div className='navbar__cart'>
                <CartWidget />
            </div>
        </div>
    );
}

export default NavBar;


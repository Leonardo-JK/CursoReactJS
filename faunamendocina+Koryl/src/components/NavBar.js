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
                    <li><Link id='remeras' to='/category/tasas'>TASAS</Link ></li>
                    <li><Link id='tasas' to='/category/remeras'>REMERAS</Link></li>
                    <li><Link id='gorras' to='/category/gorras'>GORRAS</Link></li>
                    <li><Link id='buzos' to='/category/buzos'>BUZOS</Link></li>
                </ul>
            </div>
            <div className='navbar__cart'>
                <CartWidget />
            </div>
        </div>
    );
}

export default NavBar;


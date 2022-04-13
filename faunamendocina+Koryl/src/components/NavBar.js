import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import CartWidget from './CartWidget';
import { CartContext } from '../contexts/CartContext';

function NavBar (){

    let {vista} = useContext(CartContext);

    useEffect(() => {

    },[vista]);

    return (
        <div className='navbar'>
            <div className='navbar__filtros'>
                <p>Filtros</p>
            </div>
            <div id='menu' className='navbar__menu'>
                <ul>
                    <li><Link id='tasas' to='/category/tasas'>TASAS</Link ></li>
                    <li><Link id='remeras' to='/category/remeras'>REMERAS</Link></li>
                    <li><Link id='gorras' to='/category/gorras'>GORRAS</Link></li>
                    <li><Link id='buzos' to='/category/buzos'>BUZOS</Link></li>
                </ul>
            </div>
            {vista ?
                    <div className='navbar__cart'>
                        <CartWidget />
                    </div>

                    :
                    <div className='navbar__cart'>
                    </div>
            }
            
            
        </div>
    );
}

export default NavBar;


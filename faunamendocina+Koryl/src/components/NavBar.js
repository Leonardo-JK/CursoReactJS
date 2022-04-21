import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import CartWidget from './CartWidget';
import { CartContext } from '../contexts/CartContext';
import LoginWidget from './LoginWidget';

function NavBar (){

    let {vista} = useContext(CartContext); 

    useEffect(() => {

    },[vista]);

    return (
        <div className='navbar'>
            <div id='menu' className='navbar__menu'>
                <ul>
                    <li><Link id='tasas' to='/category/tasas'>TASAS</Link ></li>
                    <li><Link id='remeras' to='/category/remeras'>REMERAS</Link></li>
                    <li><Link id='gorras' to='/category/gorras'>GORRAS</Link></li>
                    <li><Link id='buzos' to='/category/buzos'>BUZOS</Link></li>
                </ul>
            </div>
            <div className='navbar__login'>
                <LoginWidget />
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


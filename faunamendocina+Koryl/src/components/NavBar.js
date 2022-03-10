import React from 'react';
import logo1b from '../img/logo1b.png';

function NavBar() {
    return (
    
        <div className='navbar'>
            <div id='logo'>
                <img src={logo1b} alt={'Logo Fauna Mendocina'}/>
            </div>
            <div id='menu'>
                <ul><span className='tituloMenu'>MENU</span>
                    <li><a id='remeras' href='#'>PRODUCTOS ></a></li>
                    <li><a id='tasas' href='#'>TASAS ></a></li>
                    <li><a id='adornos' href='#'>ADORNOS ></a></li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;


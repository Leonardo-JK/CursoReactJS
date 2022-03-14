import React from 'react';
import logo from '../img/logo1b.png';

function Header() {
    return (
        <div className='header'>
            <div className='header__icon'>
                <img src={logo} alt='Logo Fauna Mendocina' />
            </div>
            <div className='header__head'>
                <div className='header__language'>
                    <p><a href='#'>ES</a> / <a href='#'>EN</a></p>
                </div>
                <div className='header__title'>
                    <h1>Fauna Mendocina</h1>
                </div>
            </div>
        </div>
    );
}

export default Header;
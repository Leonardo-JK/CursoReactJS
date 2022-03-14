import React from 'react';
import arrowDown from '../img/arrow-down.png';

function NavbarPrincipal() {
    return (
    <div className='navbarP'>
        <ul className='navbarP__list'>
            <li id='inicio' className='navbarP__inicio'><a href='#'>Inicio</a> 
                <img src={arrowDown} alt='flecha' />
                <ul className='navbarP__submenu'>
                    <li><a href='#'>Presentacion</a></li>
                    <li><a href='#'>Introduccion</a></li>
                </ul>
            </li>
            <li id='indice'><a href='#'>Indice</a>
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                    <li><a href='#'>Mamíferos</a></li>
                    <li><a href='#'>Aves</a></li>
                    <li><a href='#'>Reptiles/Anfibios</a></li>
                    <li><a href='#'>Insectos</a></li>
                    <li><a href='#'>Peces</a></li>
                </ul>
            </li>
            <li id='galeria'><a href='#'>Galería</a> 
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                <li><a href='#'>Mamíferos</a></li>
                    <li><a href='#'>Aves</a></li>
                    <li><a href='#'>Reptiles/Anfibios</a></li>
                    <li><a href='#'>Insectos</a></li>
                    <li><a href='#'>Peces</a></li>
                </ul>
            </li>
            <li id='tablas'><a href='#'>Tablas</a> 
                
            </li>
            <li id='juegos'><a href='#'>Juegos</a> 
                
            </li>
            <li id='tienda'><a href='#'>Tienda</a> 
                
            </li>
            <li id='contacto'><a href='#'>Contacto</a> 
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                    <li><a href='#'>Nuestras Redes</a></li>
                    <li><a href='#'>ONG's</a></li>
                    <li><a href='#'>Contactanos</a></li>
                </ul>
            </li>
        </ul>
    </div>
    )
}

export default NavbarPrincipal;

import React from 'react';
import { Link } from 'react-router-dom';
import arrowDown from '../img/arrow-down.png';

function NavbarPrincipal() {
    return (
    <div className='navbarP'>
        <ul className='navbarP__list'>
            <li id='inicio' className='navbarP__inicio'><Link to='#'>Inicio</Link> 
                <img src={arrowDown} alt='flecha' />
                <ul className='navbarP__submenu'>
                    <li><Link to='#'>Presentacion</Link></li>
                    <li><Link to='#'>Introduccion</Link></li>
                </ul>
            </li>
            <li id='indice'><Link to='#'>Indice</Link>
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                    <li><Link to='#'>Mamíferos</Link></li>
                    <li><Link to='#'>Aves</Link></li>
                    <li><Link to='#'>Reptiles/Anfibios</Link></li>
                    <li><Link to='#'>Insectos</Link></li>
                    <li><Link to='#'>Peces</Link></li>
                </ul>
            </li>
            <li id='galeria'><Link to='#'>Galería</Link> 
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                <li><Link to='#'>Mamíferos</Link></li>
                    <li><Link to='#'>Aves</Link></li>
                    <li><Link to='#'>Reptiles/Anfibios</Link></li>
                    <li><Link to='#'>Insectos</Link></li>
                    <li><Link to='#'>Peces</Link></li>
                </ul>
            </li>
            <li id='tablas'><Link to='#'>Tablas</Link> 
                
            </li>
            <li id='juegos'><Link to='#'>Juegos</Link> 
                
            </li>
            <li id='tienda'><Link to='/'>Tienda</Link> 
                
            </li>
            <li id='contacto'><Link to='#'>Contacto</Link> 
                <img src={arrowDown} alt='flecha'/>
                <ul className='navbarP__submenu'>
                    <li><Link to='#'>Nuestras Redes</Link></li>
                    <li><Link to='#'>ONG's</Link></li>
                    <li><Link to='#'>Contactanos</Link></li>
                </ul>
            </li>
        </ul>
    </div>
    )
}

export default NavbarPrincipal;

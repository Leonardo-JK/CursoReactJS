import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cargarImagen = require.context("./../img", true);

function Item(props) {

    const [imgCruz, setImgCruz] = useState(false); // --> Estado que maneja la imagen superpuesta cuando no hay stock <--

    // --> Inicio seteo montaje de imagen superpuesta.
    if(props.stock === 0 && imgCruz === false){
        setImgCruz(true);
    }
    // <-- Final seteo montaje de imagen superpuesta.

    return (
        <div className='items'>
            <div className='items__item'>
                <Link className='linkItem' to={"/item/" + props.id}>    
                    <div className='items__img'>
                        {imgCruz
                        ?
                        <img className='sinStock' src={cargarImagen(`./sinStock.png`)}/>
                        :
                        null
                        }
                        <img src={cargarImagen(`${props.src}`)} alt={props.alt} />
                    </div>
                    <div className='items__price'>
                        <p>$ {props.price}<sup>00</sup></p>
                    </div>
                    <div className='items__itemName'>
                        <p>{props.itemName}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Item;
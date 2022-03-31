import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

const cargarImagen = require.context("./../img", true);

function Item(props) {
    
    return (
        <div className='items'>
            <div className='items__item'>
                <Link className='linkItem' to={"/item/" + props.id}>    
                    <div className='items__img'>
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
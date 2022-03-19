import React from 'react';
import BuyComand from './BuyComand';

const cargarImagen = require.context("./../img", true);

function Item(props) {

    console.log(props.src);
    return (
        <div className='items'>
            <div className='items__item'>
                <img src={cargarImagen(`${props.src}`)}alt={props.alt} />
                <div className='items__price'>
                    <p>$ {props.price}<sup>00</sup></p>
                </div>
                <div className='items__itemName'>
                    <p>{props.itemName}</p>
                </div>
                <div className='items__compra'>
                    <BuyComand/>
                </div>
            </div>
        </div>
    )
}

export default Item;
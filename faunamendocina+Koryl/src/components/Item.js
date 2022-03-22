import React from 'react';
import ItemCount from './ItemCount';

const cargarImagen = require.context("./../img", true);

function Item(props) {

    console.log(props.src);
    return (
        <div className='items'>
            <div className='items__item'>
                <div className='items__img'>
                    <img src={cargarImagen(`${props.src}`)} alt={props.alt} />
                </div>
                <div className='items__price'>
                    <p>$ {props.price}<sup>00</sup></p>
                </div>
                <div className='items__itemName'>
                    <p>{props.itemName}</p>
                </div>
                <div className='items__compra'>
                    <ItemCount stock={props.stock} initial={1}/>
                </div>
            </div>
        </div>
    )
}

export default Item;
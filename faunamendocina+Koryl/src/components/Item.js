import React, {useState} from 'react';
import BuyComand from './BuyComand';

function Item(props) {
    const [img, setImg] = useState(props.src);
    return (
        <div className='items'>
            <div className='items__item'>
                <img src={require("../img/remeraCondor.png")} alt={props.alt} />
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
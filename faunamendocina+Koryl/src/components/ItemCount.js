import React from 'react';

function ItemCount(props) {
    
    console.log(props);
    return (
        <div className='itemCount'>
            <div className='itemCount__input'>
                <input id={'item'+ props.id} type='range' min={1} max={props.stock} step={1} 
                    name={'item'+ props.id} placeholder={1} value={props.cantidad} onInput={e => props.setCant(e.target.value)}/>
                <br></br>
                <label id={'item'+ props.id + 'Label'} htmlFor={'item'+ props.id}>Cantidad: {props.cantidad}</label>
                <br></br>
                <button id='addButton' className='itemCount__addButton' onClick={props.onAdd}>Agregar al Carrito</button>
            </div>

            <div className='itemCount__stock'>
                <p>Stock: {props.stock}</p>
            </div>        
        </div>
    )
}


export default ItemCount;
import React, {useState} from 'react';
import {cantidad, stockItem, actualizarStock, sumar} from '../scripts/variables';


let suma; 

function BuyComand(onAdd) {
    const [cant, setCant] = useState(1);
    let [stock, setStock] = useState(stockItem);
    

    function agregar(){
        console.log(cantidad);
        setStock(stock - cant);
        suma = cantidad + cant;
        sumar();
        actualizarStock(stock);
        setCant(0);
    }
    

    return (
        <div className='buyComand'>
            <div className='buyComand__input'>
                <input id='item1' type='range' min={1} max={stock} step={1} 
                    name='item1'placeholder={0} value={cant} onInput={e => setCant(e.target.value)}/>
                <br></br>
                <label for='item1' id='item1Label'>Cantidad: {cant}</label>
                <br></br>
                <button id='addButton' className='buyComand__addButton' onClick={agregar}>Comprar</button>
            </div>

            <div className='buyComand__stock'>
                <p>Stock: {stock}</p>
            </div>        
        </div>
    )
}


export {suma, BuyComand};
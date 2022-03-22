import React, {useState} from 'react';

function ItemCount(props) {
    let [stock, setStock] = useState(props.stock);
    let [cant, setCant] = useState(1);

    function agregar(){
        setStock(stock - cant);
        setCant(props.initial);
        if((stock - cant) === 0){
            setCant(0);
        }
        {props.onAdd(cant)}
    }

    return (
        <div className='itemCount'>
            <div className='itemCount__input'>
                <input id='item1' type='range' min={props.initial} max={stock} step={1} 
                    name='item1'placeholder={1} value={cant} onInput={e => setCant(e.target.value)}/>
                <br></br>
                <label id='item1Label' htmlFor='item1'>Cantidad: {cant}</label>
                <br></br>
                <button id='addButton' className='itemCount__addButton' onClick={agregar}>Comprar</button>
            </div>

            <div className='itemCount__stock'>
                <p>Stock: {stock}</p>
            </div>        
        </div>
    )
}


export default ItemCount;
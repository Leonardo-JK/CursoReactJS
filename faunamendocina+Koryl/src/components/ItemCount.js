import React, {useState} from 'react';

function ItemCount(props) {
    let [stock, setStock] = useState(JSON.parse(localStorage.getItem("stock" + props.id)));
    let [cant, setCant] = useState(1);
    let [cantCart, setCantCart] = useState(0);

    function agregar(){
        setStock(stock - cant);
        localStorage.setItem(("stock" + props.id), JSON.stringify(stock));
        setCant(1);
        if((stock - cant) === 0){
            setCant(0);
        }
        setCantCart(JSON.parse(cantCart) + JSON.parse(cant));
        console.log("suma " + cantCart); 
    }

    return (
        <div className='itemCount'>
            <div className='itemCount__input'>
                <input id={'item'+ props.id} type='range' min={props.initial} max={stock} step={1} 
                    name={'item'+ props.id} placeholder={1} value={cant} onInput={e => setCant(e.target.value)}/>
                <br></br>
                <label id={'item'+ props.id + 'Label'} htmlFor={'item'+ props.id}>Cantidad: {cant}</label>
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
import React, {useState} from 'react';

function BuyComand() {
    let cantidad = localStorage.cantidad;
    let [stock, setStock] = useState(localStorage.stock);
    console.log(stock);
    let [cant, setCant] = useState(1);

    function agregar(){
        setStock(stock - cant);
        setCant(1);
        if((stock - cant) === 0){
            setCant(0);
        }
        
        localStorage.setItem("cantidad", (JSON.parse(localStorage.cantidad) + JSON.parse(cant)));
        console.log(localStorage.cantidad);
    }

    return (
        <div className='buyComand'>
            <div className='buyComand__input'>
                <input id='item1' type='range' min={1} max={stock} step={1} 
                    name='item1'placeholder={1} value={cant} onInput={e => setCant(e.target.value)}/>
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


export default BuyComand;
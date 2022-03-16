import React, {useState} from 'react';
import { extraerItem, actualizarstock } from '../scripts/JsonManager';


function BuyComand() {
    const [cant, setCant] = useState([1]);
    let [stock, setStock] = useState(extraerItem("remeras", "Remera Guanaco Comica").stock);
    console.log(stock);

    function agregar(){
        
        setStock(stock - cant); 
        actualizarstock("remeras", "Remera Guanaco Comica", stock);
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
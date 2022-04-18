import React, {useState} from 'react';

function ItemCount(props) {
    
    const [disable, setDisable] = useState(false); // --> Estado que desabilita el itemCount. <--

    // --> Si no hay stock, desabilita el itemCount.
    if(props.stock === 0 && disable === false){
        setDisable(true);
    } 
    // <--

    return (
        <div className='itemCount'>
            {disable
            ?
            // --> Leyenda SIN STOCK.
            <div className='itemCount__input'>
                <p><span className='itemCount__sinStock'>¡SIN STOCK!</span></p>
            </div>
            // <--
            :
            <div>
                <div className='itemCount__input'>
                    <input id={'item'+ props.id} type='range' min={1} max={props.stock} step={1} 
                        name={'item'+ props.id} placeholder={1} value={props.cantidad} onInput={e => props.setCant(e.target.value)} disabled={props.state}/>
                    <br></br>
                    <label id={'item'+ props.id + 'Label'} htmlFor={'item'+ props.id}>Cantidad: {props.cantidad}</label>
                    <br></br>
                    <button id='addButton' className='itemCount__addButton' onClick={props.onAdd} disabled={props.state}>Agregar al Carrito</button>
                </div>

                <div className='itemCount__stock'>
                    <p>Stock: {props.stock}</p>
                </div>       
            </div>
            }
        </div>
    )
}


export default ItemCount;
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ItemCount from './ItemCount';

const cargarImagen = require.context("./../img", true);

function ItemDetail(props) {
    console.log(props.elemento);
    console.log(props.elemento.stock);

    let [stock, setStock] = useState(JSON.parse(props.elemento.stock));
    let [cant, setCant] = useState(1);
    let [taman, setTaman] = useState("");
    let [cantCart, setCantCart] = useState(0);
    console.log(stock);

    function agregar(){
        setStock(stock - cant);
        localStorage.setItem(("stock" + props.elemento.id), JSON.stringify(stock));
        setCant(1);
        if((stock - cant) === 0){
            setCant(0);
        }
        setCantCart(JSON.parse(cantCart) + JSON.parse(cant));
        console.log("suma " + cantCart);
        console.log(taman);


    }


    return (
        <div className='itemDetail'>
            <div className='itemDetail__img'>
                <img src={cargarImagen(`${props.elemento.url}`)} alt={props.elemento.alt} />
            </div>
            <div className='itemDetail__info'>
                <h2 className='itemDetail__title'>{props.elemento.nombre}</h2>
                <hr/>
                <h3 className='itemDetail__descrip'>Descripción</h3>
                <p className='itemDetail__descripcion'>{props.elemento.descripcion}</p>
                <hr/>
                <p className='itemDetail__precio'>$ {props.elemento.precio}<sup>00</sup></p>
                <hr/>
                <select onChange={(e) => {setTaman(e.target.value)}}>
                    {props.elemento.tamannos.map((tam) => {
                        return (
                            <option value={tam}>{tam}</option>
                        )
                    })}
                </select>
                <div className='itemDetail__itemCount'>
                    <ItemCount 
                        id={props.elemento.id} 
                        onAdd={agregar}
                        cantidad={cant}
                        setCant={setCant}
                        stock={stock}
                    />
                </div>
                <div className='itemDetail__terminar'>
                    <button className='itemDetail__terminarButton'><Link id='terminar' to='/cart'>Terminar Compra</Link ></button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;
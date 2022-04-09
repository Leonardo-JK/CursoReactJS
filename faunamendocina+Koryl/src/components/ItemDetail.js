import React, {useContext, useEffect, useState} from 'react';
import { CartContext } from '../contexts/CartContext';
import ItemCount from './ItemCount';
import {Link} from 'react-router-dom';

const cargarImagen = require.context("./../img", true);

function ItemDetail(props) {

    let [stock, setStock] = useState(JSON.parse(props.elemento.stock));
    let [cant, setCant] = useState(1);
    let [taman, setTaman] = useState("");
    let [state, setState] = useState(true);
    let {cart, addItem, isInCart, isTamId, mostrar, cantUn} = useContext(CartContext);

    let aux = cart;
    let inAux = 0;
    let inTam = 0;
    let isId = false;
    let isTam = false;

    if(taman !== "" && state === true){
        setState(false);
    }
        
    function agregar(){
        
        const item = {
            id: props.elemento.id,
            unidades: [{
                        tamanno: taman,
                        cantidad: parseInt(cant),
                    }],
            nombre: props.elemento.nombre,
            precio: props.elemento.precio,
            imagen: props.elemento.url
        }

        inAux = isInCart(item.id, aux)[0];
        isId = isInCart(item.id, aux)[1];

        if(isId){
            inTam = isTamId(aux[inAux].unidades, taman)[0];
            isTam = isTamId(aux[inAux].unidades, taman)[1];
            if(isTam){
                aux[inAux].unidades[inTam].cantidad = aux[inAux].unidades[inTam].cantidad + parseInt(cant);
                if(aux[inAux].unidades[inTam].cantidad > props.elemento.stock){
                    aux[inAux].unidades[inTam].cantidad = props.elemento.stock;
                    setState(true);
                }
            } else {
                aux[inAux].unidades.push({tamanno: taman, cantidad: parseInt(cant)});
            }
        } else {
            aux.push(item);
        }

        addItem(aux);
        
        setCant(1);
        if((stock - cant) === 0 || cant === 0){
            setCant(0);
        }
        mostrar();
    }

    useEffect(() => {

    }, [cart])

    console.log(cart);

    return (
        <div className='itemDetail'>
            <div className='itemDetail__img'>
                <img src={cargarImagen(`${props.elemento.url}`)} alt={props.elemento.nombre} />
            </div>
            <div className='itemDetail__info'>
                <h2 className='itemDetail__title'>{props.elemento.nombre}</h2>
                <hr/>
                <h3 className='itemDetail__descrip'>Descripción</h3>
                <p className='itemDetail__descripcion'>{props.elemento.descripcion}</p>
                <hr/>
                <p className='itemDetail__precio'>$ {props.elemento.precio}<sup>00</sup></p>
                <hr/>
                <div className='itemDetail__compra'>
                    <div className='itemDetail__select'>
                        <select className='itemDetail__tamanno' onChange={(e) => {setTaman(e.target.value)}}>
                            <option value={""} selected={true} disabled={true}>Elija el tamaño</option>
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
                                state={state}
                            />
                        </div>
                    </div>
                    <div className='itemDetail__terminar'>
                        <button className='itemDetail__terminarButton'><Link id='terminar' to='/cart'>Terminar Compra</Link ></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;
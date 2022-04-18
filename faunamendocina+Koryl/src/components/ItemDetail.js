import React, {useContext, useEffect, useState} from 'react';
import { CartContext } from '../contexts/CartContext';
import ItemCount from './ItemCount';
import {Link} from 'react-router-dom';

const cargarImagen = require.context("./../img", true);

function ItemDetail(props) {

    let [stock, setStock] = useState(JSON.parse(props.elemento.stock));
    let [cant, setCant] = useState(1);
    let [taman, setTaman] = useState("");
    let [state, setState] = useState(true); // --> Estado que habilita/desabilita el selector de cantidad y el boton agregar al carrito <--
    let {cart, addItem, isInCart, isTamId, mostrar} = useContext(CartContext);

    let aux = cart;
    let inAux = 0;
    let inTam = 0;
    let isId = false;
    let isTam = false;

    // --> Inicio desabilito state hasta que no se selecciona el tamaño.
    if(taman !== "" && state === true){
        setState(false);
    }
    // <-- Final desabilito state hasta que no se selecciona el tamaño.
        
    // --> Inicio busqueda si un producto ya se ha agregado y ejecuta segun corresponda.
    function agregar(){
        
        // --> Setea objeto item a agregar.
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
        // <--

        inAux = isInCart(item.id, aux)[0];  // --> Setea indice en el que se ubica el producto. <--
        isId = isInCart(item.id, aux)[1];   // --> Confirma la existencia del producto en el carrito. <--

        // --> Preparacion del array auxiliar que se seteara en el Cart.
        if(isId){
            inTam = isTamId(aux[inAux].unidades, taman)[0]; // --> Setea indice en el que se ubica el tamaño dado. <--
            isTam = isTamId(aux[inAux].unidades, taman)[1]; // --> Confirma la existencia de un tamaño para un determinado producto. <--
            
            if(isTam){
                // --> Suma la cantidad seleccionada al tamaño prexistente determinado.
                aux[inAux].unidades[inTam].cantidad = aux[inAux].unidades[inTam].cantidad + parseInt(cant); 
                // <--

                // --> Si el stock del tamaño determinado es menor a la suma total de unidades
                //      setea la cantidad final igual al stock.
                if(aux[inAux].unidades[inTam].cantidad > props.elemento.stock){
                    aux[inAux].unidades[inTam].cantidad = props.elemento.stock;
                    setState(true);
                }
                // <--
            } else {
                // --> Si el tamaño estipulado, no se encuentra aun en el array de unidades de dicho producto,
                //      se agrea el objeto correspondiente al array.
                aux[inAux].unidades.push({tamanno: taman, cantidad: parseInt(cant)});
                // <--
            }
        } else {
            // --> Si el producto estipulado, no se encuentra aun en el carrito,
            //      se agrea el objeto correspondiente al array.
            aux.push(item);
            // <--
        }
        // <--

        addItem(aux); 
        
        setCant(1); // --> Setea por defecto en 1 la cantidad en el selector de unidades. <--

        // --> Si la cantidad seleccionada es igual al stock, setea  en 0 la cantidad en el selector de unidades.
        if((stock - cant) === 0 || cant === 0){
            setCant(0);
        }
        // <--

        mostrar(); // --> Hace visible el CartWidget. <--
    }
    // <-- Final busqueda si un producto ya se ha agregado y ejecuta segun corresponda.

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
                                setState={setState}
                            />
                        </div>
                    </div>
                    <div className='itemDetail__terminar'>
                    <Link id='terminar' to='/cart'><button className='itemDetail__terminarButton'>Terminar Compra</button></Link >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;
import React from 'react'
import ItemCount from './ItemCount';

const cargarImagen = require.context("./../img", true);

function ItemDetail(props) {
    console.log(props.elemento);
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
                <ul className='itemDetail__tamanno'>
                    {props.elemento.tamannos.map((tam) => {
                        return (
                            <li><input type={"radio"} id={tam} name="tamanno" value={tam}/><label htmlFor={tam}>{tam}</label></li>
                        )
                    })}
                </ul>
                <div className='itemDetail__itemCount'>
                    <ItemCount id={props.elemento.id}/>
                </div>
                
            </div>
        </div>
    )
}

export default ItemDetail;
import React, { useState } from 'react';
import ItemDetail from './ItemDetail';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

function ItemDetailContainer() {
    let [item, setItem] = useState(false);
    const id = parseInt(useParams().id);

    const datos = new Promise((resolve, reject) => {
        setTimeout(function(){
            const aux = require('../data/stock.json');
            
            resolve(aux.filter((elemento) => elemento.id === id));
        }, 2000);
    });
        
    datos.then((respuesta) => {
        setItem(respuesta[0]);
        });

    return (
        <div className='detalles'>
            {item 
                ?   
                    <div className='detalles__div'>
                        <div className='detalles__button'>
                            <button className='seguir'><Link to='/'>Seguir comprando</Link></button>
                        </div>
                        <ItemDetail elemento={item}/>
                    </div>
                :   <h1 className='carga'>Cargando...</h1>
            }
        </div>
    )
}

export default ItemDetailContainer;
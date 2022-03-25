import React, { useState } from 'react';
import ItemDetail from './ItemDetail';
import {useParams} from 'react-router-dom';

function ItemDetailContainer() {
    let [item, setItem] = useState(false);
    const id = parseInt(useParams().id);
    console.log(id);

    const datos = new Promise((resolve, reject) => {
        setTimeout(function(){
            const aux = require('../data/stock.json');
            
            resolve(aux.filter((elemento) => elemento.id === id));
        }, 2000);
    });
        
    datos.then((respuesta) => {
        setItem(respuesta[0]); 
        console.log(respuesta);
        });

    return (
        <div className='detalles'>
            {item 
                ?   <ItemDetail elemento={item}/>
                :   <h1 className='carga'>Cargando...</h1>
            }
        </div>
    )
}

export default ItemDetailContainer;
import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function ItemDetailContainer() {
    let [item, setItem] = useState(false); // --> Estado que maneja la pantalla de carga <--
    const {id} = useParams();
    let prod;

    // --> Inicio solicitud de datos a la base de datos segun id.
    useEffect(() => {
        const docRef = doc(db, "items", id);
        
        getDoc(docRef)
            .then(doc => {
                prod = {id: doc.id, ...doc.data()};
            })
            .finally(() => {
                setItem(prod);
            })
    }, [id]);
    // <-- Final solicitud de datos a la base de datos segun id.

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
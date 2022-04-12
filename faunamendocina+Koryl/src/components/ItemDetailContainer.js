import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function ItemDetailContainer() {
    let [item, setItem] = useState(false);
    const {id} = useParams();
    let prod;

    useEffect(() => {
        const docRef = doc(db, "items", id);
        console.log(docRef);
        getDoc(docRef)
            .then(doc => {
                prod = {id: doc.id, ...doc.data()};
                console.log(doc);
                console.log(prod.id);
            })
            .finally(() => {
                setItem(prod);
            })

    }, [id]);

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
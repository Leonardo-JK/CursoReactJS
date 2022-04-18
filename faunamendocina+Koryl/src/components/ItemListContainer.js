import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';


function ItemListContainer() {
    let [info, setInfo] = useState(false); // --> Estado que maneja la pantalla de carga del itemListContainer <--
    let items;
    const {categoryid} = useParams();
    console.log(categoryid);

    // -->  Inicio solicitud de datos a la base de datos.
    //      Por defecto carga todo, y filtra segun el categoryid, obtenido por Link en el NavBar.js
    useEffect(() => {
        setInfo(false);
        
        const prodRef = collection(db, "items");
        let coleccion;
        categoryid === undefined ? coleccion = prodRef : coleccion = query(prodRef, where("categoria", "==", categoryid));
        
        getDocs(coleccion)
            .then(resp => {
                items = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                setInfo(items);
            })
    }, [categoryid])
    // <-- Final solicitud de datos a la base de datos.
    
    return (
        <div className='products'>
            {info ? 
                    <div className='products__list'>
                        <h2 className='products__title'>Catálogo</h2>
                        <ItemList 
                            elementos={info} 
                        />
                    </div>
                
                    : <h1 className='carga'>Cargando...</h1>
            }
        </div>
    )
}

export default ItemListContainer;

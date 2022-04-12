import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';


function ItemListContainer() {
    let [info, setInfo] = useState(false);
    let items;
    const {categoryid} = useParams();
    console.log(categoryid);

    useEffect(() => {
        setInfo(false);
        
        const prodRef = collection(db, "items");
        let q;
        categoryid === undefined ? q = prodRef : q = query(prodRef, where("categoria", "==", categoryid));
        
        getDocs(q)
            .then(resp => {
                items = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                console.log(items);
                setInfo(items);
                
            })
            // .finally(() => {
            //     if(categoryid){
            //         setInfo(items.filter((cat) => cat.categoria === categoryid));
            //     } else{
            //         setInfo(items);
            //     }   
            // }) 
    }, [categoryid])
    
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

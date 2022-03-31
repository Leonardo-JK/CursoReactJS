import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListContainer(props) {
    let [info, setInfo] = useState(false);
    
    const {categoryid} = useParams();
    console.log(categoryid);

    useEffect(() => {
        setInfo(false);

        const datos = new Promise((resolve, reject) => {
            setTimeout(function(){
                if(categoryid){
                    resolve(require('../data/stock.json').filter((cat) => cat.categoria === categoryid))
                } else{
                    resolve(require('../data/stock.json'));
                }
            }, 2000);
        });
            
        datos.then((respuesta) => {
            setInfo(respuesta);
            console.log(respuesta);
            });
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

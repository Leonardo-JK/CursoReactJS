import React, {useState} from 'react';
import ItemList from './ItemList';

function ItemListContainer(props) {
    let [info, setInfo] = useState([]);
    let [cantCart, setCantCart] = useState(0);

    function onAdd(cant){
        setCantCart(JSON.parse(cantCart) + JSON.parse(cant));
        console.log("suma " + cantCart);        
    }

    const datos = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(require('../data/stock.json'));
        }, 2000);
    });
        
    datos.then((respuesta) => {setInfo(respuesta); 
            console.log(respuesta)
        });

    return (
        <div className='products'>
            {info ? (info.map((dat) => {
                return (
                    <div key={dat.categoria} className='products__list'>
                        <h2 className='products__title'>{dat.categoria}</h2>
                        <ItemList elementos={dat.items} onAdd={onAdd} />
                    </div>
                )
            })): null}
        </div>
    )
}

export default ItemListContainer;

import React from 'react';
import ItemList from './ItemList';


let info;
console.log("inicio");
const datos = new Promise((resolve, reject) => {
      resolve(true);  
});
  
datos.then(result => {info = (require('../data/stock.json'))});


function ItemListContainer() {
    return (
        <div className='products'>
            {info.map((dat) => {
                return (
                    <div key={dat.categoria} className='products__list'>
                        <h2 className='products__title'>{dat.categoria}</h2>
                        <ItemList elementos={dat.items}/>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default ItemListContainer;

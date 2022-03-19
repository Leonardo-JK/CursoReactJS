import React from 'react';
import ItemList from './ItemList';
import data from '../data/stock';

function ItemListContainer() {
    return (
        <div className='products'>
            {data.map((dat) => {
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

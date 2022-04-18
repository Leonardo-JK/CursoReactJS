import React from 'react';
import Item from './Item';

function ItemList(props) {  
    
    return (
        <div className='itemList'>
            {props.elementos.map((item) => {
                return (
                    <div >
                        <Item 
                            itemName={item.nombre} 
                            price={item.precio} 
                            src={item.url} 
                            alt={item.nombre} 
                            id={item.id}
                            stock={item.stock}
                        />
                    </div>
                    
                )
            })}
        </div>
    )
}

export default ItemList;
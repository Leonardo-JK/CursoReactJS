import React from 'react';
import Item from './Item';

function ItemList(props) {  
    
    return (
        <div className='itemList'>
            {props.elementos.map((item) => {
                return (
                    <div >
                        <Item itemName={item.nombre} price={item.precio} src={item.url} alt={item.nombre} stock={item.stock} id={item.id}/>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default ItemList;
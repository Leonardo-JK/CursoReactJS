import React from 'react';
import Item from './Item';

function ItemList(props) {  
    
    return (
        <div className='itemList'>
            {props.elementos.map((item) => {
                return (
                    <div key={item.nombre}>
                        <Item itemName={item.nombre} price={item.precio} src={item.url} alt={item.nombre} stock={item.stock} onAdd={props.onAdd}/>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default ItemList;
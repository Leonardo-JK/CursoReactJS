import React from 'react';
import item from '../img/remeraGenericaChica.png';
import BuyComand from './BuyComand';

function ItemListContainer() {
  return (
    <div className='products'>
      <h2 className='products__title'>Catálogo de Productos</h2>  
      <div className='products__body'>
        <div className='products__item'>
          <img className='products__img' src={item} alt="Item" />
          <div className='products__price'>
            <p>$ 1.200,<sup>00</sup></p>
          </div>
          <div className='products__itemName'>
            <p>Remera Clásica Negra de Algodón</p>
          </div>
          <div className='products__compra'>
            <BuyComand />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemListContainer;

import React, {useContext, useEffect, useState} from 'react';
import { CartContext } from '../contexts/CartContext';
import {Link} from 'react-router-dom';

const imagen = require.context("./../img", true);

function Cart(){
    let {cart, removeItem, total, setUn, clear} = useContext(CartContext);
    
    useEffect(() => {
        if(cart.length === 0){
            setUn(0);
        } 
    }, [cart]);

    return (
        <div className='table'>
            <div className='botones'>
                <div>
                    <button className='seguir'><Link to='/'>Seguir comprando</Link></button>
                </div>
                <div>
                    <button className='vaciar' onClick={() => clear()}>Vaciar Carrito</button>
                </div>
            </div>
            
            {cart.length !==0
            
                ?
                <div className='table__list'>
                    <table className='table__first'>
                        <tr className='table__head'>
                            <td>Item<hr/></td>
                            <td>Producto<hr/></td>
                            <td>Descripcion<hr/></td>
                            <td className='table__col2'>Cantidad<hr/></td>
                            <td className='table__col2'>Tamaño<hr/></td>
                            <td className='table__col2'>Precio<hr/></td>
                            <td className='table__col2'>Subtotal<hr/></td>
                            <td className='table__col2'></td>
                        </tr>
                        {cart.map((item) => {
                            return (
                                <tr>
                                    <td className='table__td'>#{cart.indexOf(item) + 1}</td>
                                    <td className='table__td'><Link to={"/item/" + item.id}><img src={imagen(`${item.imagen}`)} alt={item.nombre} /></Link></td>
                                    <td className='table__desc'>{item.nombre}</td>
                                    <td className='table__td' colSpan={5}>
                                        <table className='table__second'>
                                            {item.unidades.map((un) => {
                                                return (
                                                    <tr>
                                                        <td className='table__col2 table__td'>{un.cantidad}</td>
                                                        <td className='table__col2 table__td'>{un.tamanno}</td>
                                                        <td className='table__col2 table__td'>$ {item.precio}</td>
                                                        <td className='table__col2 table__td'>$ {item.precio * un.cantidad}</td>
                                                        <td className='table__col2 table__td'>
                                                            <button className='table__delete' onClick={() => removeItem(item.id, un.tamanno)}>Eliminar Item</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </td>
                                    <tr/>
                                    <hr/>
                                </tr>                                                                                          
                            )
                        })} 
                        <tr><td colSpan={7}><hr/></td></tr>
                        <tr >
                            <td className='table__colT1' colSpan={6}>TOTAL</td>
                            <td className='table__colT2'>$ {total()}</td>
                        </tr>       
                    </table>   
                    <div className='botones2'>
                        <button className='procesar'><Link to='/checkout'>Procesar la Compra</Link></button>
                    </div>   
                </div>    
                :
                <h1 className='table__carga'>El carrito esta vacio</h1> 
            }         
        </div>
    )    
}

export default Cart;
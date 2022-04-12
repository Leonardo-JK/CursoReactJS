import React, {useContext, useEffect, useState} from 'react';
import { CartContext } from '../contexts/CartContext';
import {Link} from 'react-router-dom';

const imagen = require.context("./../img", true);

function Cart(){
    let {cart, removeItem, setUn} = useContext(CartContext);
    let [cartTable, setCartTable] = useState(cart);
    let [info, setInfo] = useState(false);
    console.log(cart);
    //     [
    //         {
    //             "id":2,
    //             "unidades":[
    //                 {"tamanno":"S","cantidad":39},
    //                 {"tamanno":"L","cantidad":35},
    //                 {"tamanno":"M","cantidad":52}
    //             ],
    //             "nombre":"Remera Puma",
    //             "precio":1300,
    //             "imagen":"./remeraPuma.png"
    //         },
    //         {
    //             "id":10,
    //             "unidades":[
    //                 {"tamanno":"M","cantidad":19},
    //                 {"tamanno":"L","cantidad":30},
    //                 {"tamanno":"XXL","cantidad":32}
    //             ],
    //             "nombre":"Gorra Puma",
    //             "precio":800,
    //             "imagen":"./gorraPuma.png"
    //         },
    //         {
    //             "id":5,
    //             "unidades":[
    //                 {"tamanno":"500ml","cantidad":1}
    //             ],
    //             "nombre":"Tasa Halcón Peregrino",
    //             "precio":600,
    //             "imagen":"./tasaHalconPeregrino.png"
    //         }
    //     ]
    // );

    function suma(){
        let sum = 0;

        for(let i = 0; i < cartTable.length; i++){
            for(let j = 0; j <cartTable[i].unidades.length; j++){
                sum += cartTable[i].unidades[j].cantidad * cartTable[i].precio;
            }
        }

        return sum;
    }

    useEffect(() => {
        if(cartTable.length !== 0){
            setInfo(true);
        } else {
            setInfo(false);
            setUn(0);
        }
    }, [cartTable])

    function borrar(i, j) {
        let aux = cart;
        console.log(aux);
        console.log(i);
        console.log(j);
        console.log(indexId(i));
        console.log(indexTam(indexId(i),j));
        console.log(aux[indexId(i)]);
        console.log(aux[indexId(i)].unidades);
        
        aux[indexId(i)].unidades.splice(indexTam(indexId(i),j),1);
        if(aux[indexId(i)].unidades.length === 0){
            aux.splice(indexId(i),1);
        }
        setCartTable(aux);
        removeItem(aux);
    }

    function indexId(id){
        for(let i = 0; i < cartTable.length; i++){
            if(cartTable[i].id === id){
                return i;
            }
        }
    }

    function indexTam(ind, tam){
        console.log(cartTable);
        for(let i = 0; i < cartTable[ind].unidades.length; i++){
            if(cartTable[ind].unidades[i].tamanno === tam){
                return i;
            }
        }
    }

    return (
        <div className='table'>
            {info
            
                ?
                <div className='table__list'>
                    <table className='table__first'>
                        <tr className='table__head'>
                            <td>#id<hr/></td>
                            <td>Item<hr/></td>
                            <td>Descripcion<hr/></td>
                            <td className='table__col2'>Cantidad<hr/></td>
                            <td className='table__col2'>Tamaño<hr/></td>
                            <td className='table__col2'>Precio<hr/></td>
                            <td className='table__col2'>Subtotal<hr/></td>
                            <td className='table__col2'></td>
                        </tr>
                        {cartTable.map((item) => {
                            return (
                                <tr>
                                    <td className='table__td'>{item.id}</td>
                                    <td className='table__td'><img src={imagen(`${item.imagen}`)} alt={item.nombre} /></td>
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
                                                            <button className='table__delete'>Eliminar Item</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </td>
                                    <tr/>
                                </tr>                            
                            )
                        })} 
                        <tr><td colSpan={7}><hr/></td></tr>
                        <tr >
                            <td className='table__colT1' colSpan={6}>TOTAL</td>
                            <td className='table__colT2'>$ {suma()}</td>
                        </tr>       
                    </table>      
                </div>    
                :
                <h1 className='table__carga'>El carrito esta vacio</h1> 
            }
            <div>
                <button className='seguir'><Link to='/'>Seguir comprando</Link></button>
            </div>
            
        </div>
    )    
}

export default Cart;
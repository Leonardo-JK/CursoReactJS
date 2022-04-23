import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { db } from "../firebase/config";


function Orders() {
    
    const {logUser} = useContext(LoginContext);
    const [ordenes, setOrdenes] = useState([]); // --> Almacen de las ordenes a cargar. <--

    console.log(logUser);

    useEffect(() => {
        const ordRef = collection(db, "ordenes");
            let lista = query(ordRef, where("comprador.usuario", "==", logUser.usuario));
            
            getDocs(lista)
                .then(resp => {
                    const items = resp.docs.map((docu) => ({id: docu.id, ...docu.data()}));
                    console.log(items);

                    if(ordenes.length === 0){
                        setOrdenes(items);
                    }                    
                })
    })

    console.log(ordenes);            
    
    return (
        <div className="order">
            {ordenes.map((orden) => {
                return (
                    <div className="order__ord">
                        <h3>Codigo de compra: {orden.id}</h3>
                        <div className='order__time'>
                            <div>
                                <p><span className='span'>Fecha:</span> {orden.fecha[0]}/{orden.fecha[1]}/{orden.fecha[2]}</p>
                            </div>
                            <div>
                                <p><span className='span'>Hora:</span> {orden.hora[0]}:{orden.hora[1]}:{orden.hora[2]}</p>
                            </div>
                        </div>
                        <div className='order__comprador'>
                            <p><span className='span'>Nombre y Apellido:</span> {orden.comprador.nombre}</p>
                            <p><span className='span'>Domicilio:</span> {orden.comprador.domicilio}</p>
                            <p><span className='span'>Email:</span> {orden.comprador.email}</p>
                            <p><span className='span'>Teléfono:</span> {orden.comprador.numero}</p>
                            <br></br>
                        </div>

                        <table className='order__table'>
                                <tr>
                                    <td><span className='span'>Cantidad</span><hr/></td>
                                    <td><span className='span'>Producto</span><hr/></td>
                                    <td><span className='span'>Tamaño</span><hr/></td>
                                    <td><span className='span'>Precio</span><hr/></td>
                                    <td><span className='span'>Subtotal</span><hr/></td>
                                </tr>
                                {orden.items.map((item) => {
                                    return (
                                        <tr>
                                            <td colSpan={5}>
                                                <table>
                                                {item.unidades.map((un) => {
                                                    return (
                                                        <tr>
                                                            <td>{un.cantidad}</td>
                                                            <td>{item.nombre}</td>
                                                            <td>{un.tamanno}</td>
                                                            <td>$ {item.precio}</td>
                                                            <td>$ {un.cantidad * item.precio}</td>
                                                        </tr>
                                                )                                            
                                                })}
                                                </table> 
                                            </td>
                                        </tr>                                       
                                    )                                        
                                })}
                        </table>

                        <div className='order__pagoCon'>
                            <p><span className='span'>TOTAL:</span> $ {orden.total}</p>
                            <p><span className='span'>Pago:</span> {orden.pago.cuotas} cuotas de $ {Math.round(orden.total/parseInt(orden.pago.cuotas))}</p>
                        </div>
                            
                        <div className='order__envio'>
                            <p><span className='span'>Entrega:</span> {orden.pago.envio}</p>
                        </div>
                    </div>
                )
            })}
        
        </div>
    )
}

export default Orders;
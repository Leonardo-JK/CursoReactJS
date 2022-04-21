import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import {Link} from 'react-router-dom';
import {db} from '../firebase/config';
import { collection, addDoc, doc, updateDoc, getDoc, getDocs, writeBatch, query, where, documentId } from 'firebase/firestore';


function Checkout() {
    const {cart, total, clear} = useContext(CartContext);
    const [comprador, setComprador] = useState({
        nombre: "",
        email: "",
        numero: "",
        domicilio: ""
    });
    const [pago, setPago] = useState({
        forma: "efectivo",
        tarjeta: "",
        numeroTar: "",
        venc: "",
        codigo: "",
        cuotas: "1",
        envio: ""
    })

    const [ticket, setTicket] = useState({}); // --> Estado que almacenara todos los datos de la compra. <--

    // --> Estados destinados a la habilitacion y desabilitacion de elementos y botones del checkout.
    const [submitComDisab, setSubmitComDisab] = useState(true);
    const [submitPagDisab, setSubmitPagDisab] = useState(true);
    const [buttonAntPagDisab, setButtonAntPagDisab] = useState(false);
    const [buttonConfDisab, setButtonConfDisab] = useState(false);
    const [buttonAntConfDisab, setButtonAntConfDisab] = useState(false);
    const [styleComButton, setStyleComButton] = useState({backgroundColor: "rgba(21, 133, 6, 0.2)"});
    const [stylePagButton, setStylePagButton] = useState({backgroundColor: "rgba(21, 133, 6, 0.2)"});
    const [styleAntPagButton, setStyleAntPagButton] = useState({backgroundColor: "rgba(21, 133, 6, 1)"})
    const [styleConfButton, setStyleConfButton] = useState({backgroundColor: "rgba(21, 133, 6, 1)"})
    const [styleAntConfButton, setStyleAntConfButton] = useState({backgroundColor: "rgba(21, 133, 6, 1)"})
    const [disableCom, setDisableCom] = useState(false);
    const [displayPag, setDisplayPag] = useState(false);
    const [displayTic, setDisplayTic] = useState(false);
    const [disableInputPag, setDisableInputPag] = useState(false);
    const [ticketID, setTicketID] = useState(null);
    const [sinStockState, setSinStockState] = useState([]);
    // <--
    
    // --> Funcion encargada de cargar los datos del comprador.
    const submitComp = (e) =>{
        e.preventDefault();
        
        const d = new Date();

        // --> Se comprueba que el valor almacenado tenga 2 cifras, agregado un 0, para valores menores a 10.
        const decena = (time) => {
            if(time < 10){
                return "0"+time
            } else {
                return time
            }
        }
        // <--

        // --> Se setea un objeto auxiliar con los datos del comprados.
        const aux = {
            fecha: [decena(d.getDate()), decena(d.getMonth()+1), d.getFullYear()],
            hora: [decena(d.getHours()), decena(d.getMinutes()), decena(d.getSeconds())],
            comprador: {...comprador},
            items: cart,
            pago: {},
            total: total()
        }
        // <--

        setTicket(aux);     // --> Actualizacion del Ticket de compra. <--
        setDisplayPag(true);    // --> Se despliega la seccion de formas de pago y envio. <--
        setDisableCom(true);    // --> Desabilitacion del boton siguiente en la seccion de datos de comprador. <--
        setSubmitComDisab(true);    // --> Desabilitacion de los inputs en la seccion de pago. <--
        setStyleComButton({backgroundColor: "rgba(21, 133, 6, 0.2)"}); // --> Cambia estilo al boton siguiente en la seccion de datos de comprador. <--
        setDisableInputPag(false);  // --> Habilita los inputs en la seccion de pago. <--
    }
    // <--

    // --> Funcion encargada de cargar los datos de Pago.
    const submitPago = (e) => {
        e.preventDefault();

        let aux = ticket;   // --> Crea un array auxiliar. <--
        aux.pago = pago;    // --> Agrega los datos de pago al array auxiliar. <--

        setTicket(aux);     // --> Actualizacion del Ticket de compra. <--
        setDisplayTic(true);    // --> Se despliega la seccion de confirmacion de compra. <--
        setSubmitPagDisab(true);    // --> Desabilitacion del boton siguiente en la seccion de datos de pago. <--
        setStylePagButton({backgroundColor: "rgba(21, 133, 6, 0.2)"}) // --> Cambia estilo al boton siguiente en la seccion de datos de pago. <--
        setButtonAntPagDisab(true); // --> Deshabilita el boton Anterior en la seccion de pago. <--
        setStyleAntPagButton({backgroundColor: "rgba(21, 133, 6, 0.2)"})    // --> Cambia estilo al boton anterior en la seccion de datos de pago. <--
        setDisableInputPag(true);   // --> Desabilita los inputs de la seccion de pago.
    }
    // <--

    // --> Funcion encargada de almacenar los datos de los inputs en la seccion de datos del comprador.
    const changeD = (e) =>{
        
        // --> Actuliza el valor correspondiente en el estado comprodor.
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        });
        // <--

        // --> Habilita el boton siguiente si en la seccion de datos de comprador, solo si todos los campos estan llenos.
        if(check(comprador)){
            setSubmitComDisab(false); // --> Habilita el boton Siguiente de la seccion datos de comprador. <--
            setStyleComButton({backgroundColor: "rgba(21, 133, 6, 1)"}) // --> Cambia estilo al boton siguiente en la seccion de datos de comprador. <--
        }
        // <--
    }
    // <--

    // --> Funcion encargada de almacenar los datos los datos de los inputs en la seccion de datos de pago.
    const changeP = (e) => {
        
        // --> Actuliza el valor correspondiente en el estado pago.
        setPago({
            ...pago,
            [e.target.name]: e.target.value
        })
        // <--

        // --> Habilita el boton siguiente si en la seccion de datos de pago, 
        //      solo si todos los campos estan llenos, discriminado si el pago es con tarjeta o en efectivo.
        if(check(pago) || (pago.forma === "efectivo" && pago.envio !== "")){
            setSubmitPagDisab(false);   // --> Habilita el boton Siguiente de la seccion datos de pago. <--
            setStylePagButton({backgroundColor: "rgba(21, 133, 6, 1)"}) // --> Cambia estilo al boton siguiente en la seccion de datos de pago. <--
        }
        // <--
    }
    // <--

    // --> Funcion encargada de si los campos de un objeto estan todos completos.
    const check = (objet) => {
        let values = Object.values(objet);
        for(let i = 0; i < values.length; i++){
            if(values[i] === ""){
                return false;
            }
        }

        return true;
    }
    // <--

    // --> Funcion encargada de volver a la seccion de detos de comprador.
    const volverCom = () => {
        setDisplayPag(false);
        setDisableCom(false);
        setSubmitComDisab(false);
        setStyleComButton({backgroundColor: "rgba(21, 133, 6, 1)"})
    }
    // <--

    // --> Funcion encargada de volver a la seccion de detos de pago.
    const volverPag = () => {
        setDisplayTic(false);
        setButtonAntPagDisab(false);
        setSubmitPagDisab(false);
        setStylePagButton({backgroundColor: "rgba(21, 133, 6, 1)"});
        setStyleAntPagButton({backgroundColor: "rgba(21, 133, 6, 1)"});
        setDisableInputPag(false);
    }
    // <--

    // --> Funcion encargada de generar una orden de compra.
    const pagar = async () => {

        // --> Desabilitacion de los botones de la seccion Confirmacion de compra.
        setButtonAntConfDisab(true);
        setStyleAntConfButton({backgroundColor: "rgba(21, 133, 6, 0.2)"});
        setButtonConfDisab(true);
        setStyleConfButton({backgroundColor: "rgba(21, 133, 6, 0.2)"});
        // <--

        // --> Pedido de datos de la base de datos segun los productos del carrito.
        const batch = writeBatch(db);
        const ticketRef = collection(db, "ordenes");
        const prodRef = collection(db, "items");
        const q = query(prodRef, where(documentId(), "in", cart.map((item) => item.id)));

        const produc = await getDocs(q);
        // <--

        const sinStock = [];

        // --> Verificacion de stock y actualizacion del mismo segun los datos de compra.
        produc.docs.forEach((doc) => {
            const elemento = cart.find((it) => it.id === doc.id)

            // --> Suma cantidad todal de unidades para un producto determinado.
            let suma = 0;
            elemento.unidades.forEach((el) => suma += el.cantidad);
            // <--

            // --> Prepara el batch de actualizacion de stock y filtra elementos sin stock suficiente.
            if(doc.data().stock >= suma){
                batch.update(doc.ref, {
                    stock: doc.data().stock - suma
                })
            } else {
                sinStock.push(elemento.nombre);
            }
            // <--
        })
        // <--

        // --> Determina si se envia el batch de actualizacion de stock junto con la generacion de 
        //      la orden de compra correspondiente o si carga la pantalla con la lista de productos 
        //      sin stock suficiente.
        if(sinStock.length > 0){
            setSinStockState(sinStock);
        } else {

            batch.commit();     // --> Envio del batch de actualizacion de estock.
            
            // --> Generacion de orden de compra.
            addDoc(ticketRef, ticket)
                .then((docu) => {
                    setTicketID(docu.id);
                    clear();
                    console.log(ticketID);
            })     
            // <--
        }
        // <--            
    }
    // <--

    // --> Si se encuentran prudctos sin stock suficiente, se muestra en pantalla.
    if(sinStockState.length > 0) {
        console.log(sinStockState);
        return (
            <div className='comprobante'>
                <h3 className='comprobante__title'>Lo siento hubo un erroe en la compra.</h3>
                <p className='comprobante__codigo'>Las cantidades solicitadas de los siguientes productos son mayores al stock disponible:</p>
                <ul className='comprobante__sinStock'>
                    {sinStockState.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
                
                <div>
                    <button className='seguir'><Link to='/'>Volver al catalogo</Link></button>
                </div>
            </div>
        )
    }
    // <--

    // --> Si la compra se realiza exitosamente muestra al cliente el codigo de ticket.
    if(ticketID){
        return (
            <div className='comprobante'>
                <h3 className='comprobante__title'>La compra se realizo Correctamente.</h3>
                <p className='comprobante__codigo'>Su codigo de compra es: <span>{ticketID}</span></p>
                <div>
                    <button className='seguir'><Link to='/'>Volver al catalogo</Link></button>
                </div>
            </div>
        )
    }
    // <--

    return (
        
        <div className='checkout'>
            <div>
                <button className='seguir'><Link to='/'>Volver al catalogo</Link></button>
            </div>

            <div className='checkout__datos'>
                <div className='checkout__inputs'>
                    <h2><span className='num'>1</span> INGRESE SUS DATOS</h2>
                    <form className='checkout__form' onSubmit={submitComp}>
                        <input  type={"name"} 
                                placeholder={"Nombre y Apellido"} 
                                value={comprador.nombre}
                                name="nombre" 
                                onChange={changeD}
                                required={true}
                                disabled={disableCom}>
                        </input>

                        <input  type={"email"} 
                                placeholder={"Email"} 
                                value={comprador.email}
                                name="email"
                                onChange={changeD}
                                required={true}
                                disabled={disableCom}>
                        </input>

                        <input  type={"telefono"} 
                                placeholder={"Teléfono"} 
                                value={comprador.numero}
                                name="numero"
                                onChange={changeD}
                                required={true}
                                disabled={disableCom}>
                        </input>

                        <input  type={"domicilio"} 
                                placeholder={"Domicilio"} 
                                value={comprador.domicilio}
                                name="domicilio"
                                onChange={changeD}
                                required={true}
                                disabled={disableCom}>
                        </input>

                        <button className='checkout__submitCom' disabled={submitComDisab} style={styleComButton}>Siguiente</button>
                    </form>
                </div>

                {displayPag
                ?
                <div className='checkout__revision'>
                    <h2><span className='num'>2</span> SELECCIONE FORMA DE PAGO</h2>  
                    <form className='checkout__pago' onSubmit={submitPago}>
                        <div>
                            <input  type={"radio"}
                                    id="domicilio"
                                    name='envio'
                                    value={"Envio a domicilio"}
                                    onChange={changeP}
                                    disabled={disableInputPag}>                            
                            </input>
                            <label htmlFor='domicilio'>Envio a domicilio</label>

                            <input  type={"radio"}
                                    id="sucursal"
                                    name='envio'
                                    value={"Retiro en sucursal"}
                                    onChange={changeP}
                                    disabled={disableInputPag}>                            
                            </input>
                            <label htmlFor='sucursal'>Retiro en Sucursal</label>
                        </div>
                        
                        <div>
                            <input  type={"radio"}
                                    id="efectivo"
                                    name='forma'
                                    value={"efectivo"}
                                    onChange={changeP}
                                    disabled={disableInputPag}>                            
                            </input>
                            <label htmlFor='efectivo'>Efectivo</label>

                            <input  type={"radio"}
                                    id="debito"
                                    name='forma'
                                    value={"debito"}
                                    onChange={changeP}
                                    disabled={disableInputPag}>                            
                            </input>
                            <label htmlFor='tarjetaDeb'>Tarjeta de Debito</label>
                            
                            <input  type={"radio"}
                                    id="credito"
                                    name='forma'
                                    value={"credito"}
                                    onChange={changeP}
                                    disabled={disableInputPag}>                            
                            </input>
                            <label htmlFor='efectivo'>Tarjeta de Credito</label>
                        </div>
                        {pago.forma !== "efectivo"
                        ?
                        <div className='checkout__tarjeta'>
                            <select onChange={changeP} name="tarjeta" disabled={disableInputPag}>
                                <option value={""} selected={true} disabled={true}>Seleccione un Banco</option>
                                <option value={"Santader"}>Santander</option>
                                <option value={"Macro"}>Macro</option>
                                <option value={"Credicoop"}>Credicoop</option>
                                <option value={"Galicia"}>Galicia</option>
                                <option value={"Supervielle"}>Supervielle</option>
                            </select>

                            <input  type={"text"} 
                                    placeholder={"Numero de Tarjeta"}
                                    value={pago.numeroTar}
                                    name="numeroTar"
                                    onChange={changeP}
                                    required={true}
                                    disabled={disableInputPag}>
                            </input>

                            <input  type={"month"} 
                                    placeholder={"Fecha Vencimiento"}
                                    value={pago.venc}
                                    name="venc"
                                    onChange={changeP}
                                    required={true}
                                    disabled={disableInputPag}>
                            </input>

                            <input  type={"number"} 
                                    placeholder={"Cod."}
                                    value={pago.codigo}
                                    name="codigo"
                                    onChange={changeP}
                                    required={true}
                                    disabled={disableInputPag}>
                            </input>

                            {pago.forma === "credito"
                            ?
                            <select onChange={changeP} name="cuotas" disabled={disableInputPag}>
                                <option value={""} selected={true} disabled={true}>Seleccione Cuotas</option>
                                <option value={1}>1 x $ {total()}</option>                                
                                <option value={3}>3 x $ {Math.round(total() / 3 + 10)}</option>
                                <option value={6}>6 x $ {Math.round(total() / 6  + 10)}</option>
                                <option value={12}>12 x $ {Math.round(total() / 12  + 10)}</option>
                                <option value={18}>18 x $ {Math.round(total() / 18  + 10)}</option>
                            </select>
                            :
                            <select onChange={changeP} name="cuotas" disabled={disableInputPag}>
                                <option value={""} selected={true} disabled={true}>Seleccione Cuotas</option>
                                <option value={1}>1 x $ {total()}</option>
                            </select>
                            }    
                        </div>
                        :

                        <div></div>
                        }

                        <div className='checkout__submitPagB'>
                            <button className='checkout__submitPag' onClick={volverCom} disabled={buttonAntPagDisab} style={styleAntPagButton}>Anterior</button>
                            <button className='checkout__submitPag' disabled={submitPagDisab} style={stylePagButton}>Siguiente</button>
                        </div>
                    </form>
                </div>
                :
                <div></div>
                } 

                {displayTic
                ?
                <div className='checkout__check'>
                    <h2><span className='num'>3</span> CONFIRMAR COMPRA Y PAGAR</h2>
                    <div className='checkout__confirmacion'>
                        <h3>Fauna Mendocina Store</h3>
                        <div className='checkout__time'>
                            <div>
                                <p><span className='span'>Fecha:</span> {ticket.fecha[0]}/{ticket.fecha[1]}/{ticket.fecha[2]}</p>
                            </div>
                            <div>
                                <p><span className='span'>Hora:</span> {ticket.hora[0]}:{ticket.hora[1]}:{ticket.hora[2]}</p>
                            </div>
                        </div>
                        <div className='checkout__comprador'>
                            <p><span className='span'>Nombre y Apellido:</span> {ticket.comprador.nombre}</p>
                            <p><span className='span'>Domicilio:</span> {ticket.comprador.domicilio}</p>
                            <p><span className='span'>Email:</span> {ticket.comprador.email}</p>
                            <p><span className='span'>Teléfono:</span> {ticket.comprador.numero}</p>
                            <br></br>
                        </div>

                        <table className='checkout__table'>
                                <tr>
                                    <td><span className='span'>Cantidad</span><hr/></td>
                                    <td><span className='span'>Producto</span><hr/></td>
                                    <td><span className='span'>Tamaño</span><hr/></td>
                                    <td><span className='span'>Precio</span><hr/></td>
                                    <td><span className='span'>Subtotal</span><hr/></td>
                                </tr>
                                {cart.map((item) => {
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

                        <div className='checkout__pagoCon'>
                            <p><span className='span'>TOTAL:</span> $ {total()}</p>
                            <p><span className='span'>Pago:</span> {ticket.pago.cuotas} cuotas de $ {Math.round(total()/parseInt(ticket.pago.cuotas))}</p>
                        </div>
                            
                        <div className='checkout__envio'>
                            <p><span className='span'>Entrega:</span> {ticket.pago.envio}</p>
                        </div>
                    </div> 

                    <div className='checkout__submitConfB'>
                            <button className='checkout__submitConf' onClick={volverPag} disabled={buttonAntConfDisab} style={styleAntConfButton}>Anterior</button>
                            <button className='checkout__submitConf' onClick={pagar} disabled={buttonConfDisab} style={styleConfButton}>PAGAR</button>
                    </div>
                </div>              
                :
                <div></div>
                }
            </div>            
        </div>
    )
}

export default Checkout;
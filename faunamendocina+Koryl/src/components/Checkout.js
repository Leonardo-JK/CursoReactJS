import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import {Link} from 'react-router-dom';
import {db} from '../firebase/config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

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
    const [ticket, setTicket] = useState({});
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
    
    let orden;


    console.log(cart);

    const submitComp = (e) =>{
        e.preventDefault();
        
        const d = new Date();

        const decena = (time) => {
            if(time < 10){
                return "0"+time
            } else {
                return time
            }
        }

        const aux = {
            fecha: [decena(d.getDate()), decena(d.getMonth()+1), d.getFullYear()],
            hora: [decena(d.getHours()), decena(d.getMinutes()), decena(d.getSeconds())],
            comprador: {...comprador},
            items: cart,
            pago: {},
            total: total()
        }

        orden = aux;
        setTicket(orden);
        setDisplayPag(true);
        setDisableCom(true);
        setSubmitComDisab(true);
        setStyleComButton({backgroundColor: "rgba(21, 133, 6, 0.2)"});
        setDisableInputPag(false);


        console.log(ticket);
        console.log(ticket.pago);
    }

    const submitPago = (e) => {
        e.preventDefault();

        let aux = ticket;
        aux.pago = pago;

        setTicket(aux);
        setDisplayTic(true);
        setSubmitPagDisab(true);
        setStylePagButton({backgroundColor: "rgba(21, 133, 6, 0.2)"})
        setButtonAntPagDisab(true);
        setStyleAntPagButton({backgroundColor: "rgba(21, 133, 6, 0.2)"})
        setDisableInputPag(true);

        console.log(ticket);
    }


    const changeD = (e) =>{
        console.log(e.target.name);
        console.log(e.target.value);
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        });

        console.log(comprador);

        if(check(comprador)){
            setSubmitComDisab(false);
            setStyleComButton({backgroundColor: "rgba(21, 133, 6, 1)"})
        }
    }

    const changeP = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);;
        setPago({
            ...pago,
            [e.target.name]: e.target.value
        })

        console.log(pago);

        if(check(pago) || (pago.forma === "efectivo" && pago.envio !== "")){
            setSubmitPagDisab(false);
            setStylePagButton({backgroundColor: "rgba(21, 133, 6, 1)"})
        }
    }

    const check = (objet) => {
        let values = Object.values(objet);
        for(let i = 0; i < values.length; i++){
            if(values[i] === ""){
                return false;
            }
        }

        return true;
    }

    const volverCom = () => {
        setDisplayPag(false);
        setDisableCom(false);
        setSubmitComDisab(false);
        setStyleComButton({backgroundColor: "rgba(21, 133, 6, 1)"})
    }

    const volverPag = () => {
        setDisplayTic(false);
        setButtonAntPagDisab(false);
        setSubmitPagDisab(false);
        setStylePagButton({backgroundColor: "rgba(21, 133, 6, 1)"});
        setStyleAntPagButton({backgroundColor: "rgba(21, 133, 6, 1)"});
        setDisableInputPag(false);
        console.log("hola");
    }

    const pagar = () => {
        setButtonAntConfDisab(true);
        setStyleAntConfButton({backgroundColor: "rgba(21, 133, 6, 0.2)"});
        setButtonConfDisab(true);
        setStyleConfButton({backgroundColor: "rgba(21, 133, 6, 0.2)"});

        const ticketRef = collection(db, "ordenes");

        updateDoc()
        
        addDoc(ticketRef, ticket)
            .then((docu) => {
                setTicketID(docu.id);
                clear();
                console.log(ticketID);
            })   
    }

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

                            <select onChange={changeP} name="cuotas" disabled={disableInputPag}>
                                <option value={""} selected={true} disabled={true}>Seleccione Cuotas</option>
                                <option value={1}>1 x $ {total()}</option>
                                <option value={3}>3 x $ {Math.round(total() / 3 + 10)}</option>
                                <option value={6}>6 x $ {Math.round(total() / 6  + 10)}</option>
                                <option value={12}>12 x $ {Math.round(total() / 12  + 10)}</option>
                                <option value={18}>18 x $ {Math.round(total() / 18  + 10)}</option>
                            </select>    
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
                                                            <td>{item.precio}</td>
                                                            <td>{un.cantidad * item.precio}</td>
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
                            <p><span className='span'>Pago:</span> {ticket.pago.cuotas} cuotas de $ {Math.round(total()/parseInt(ticket.pago.cuotas) + 10)}</p>
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
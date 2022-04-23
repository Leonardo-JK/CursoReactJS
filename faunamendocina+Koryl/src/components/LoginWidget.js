import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

function LoginWidget() {
    
    const {login, logUser, checkLog, endSession} = useContext(LoginContext);
    const [dispLogin, setDispLogin] = useState(false); // --> Estado que maneja el despliegue del login. <--
    const [userLog, setUserLog] = useState({
        usuario: "",
        pass: ""
    })
    const [errorLog, setErrorLog] = useState(); // --> Contiene el mensaje de datos invalidos.

    // --> Despliegue y ocultacion del login.
    const displayLogin = (comand) => {
        
        if(dispLogin === false && comand === "in"){
            setDispLogin(true)
        } 

        if(dispLogin === true && comand === "out"){
            setDispLogin(false)
        }         
    }
    // <--

    // --> Captura de datos del login.
    const changeLog = (e) => {
        setUserLog({
            ...userLog,
            [e.target.name]: e.target.value
        });
    }
    // <--

    // --> Verificacion de usuario y contraseña.
    const check = async () => {
        console.log(userLog);
        console.log(await checkLog(userLog));

        if(await checkLog(userLog)){
            console.log("Sesion iniciada");
            setErrorLog();
        } else {
            setErrorLog("¡Usuario y/o contraseña incorrectos!");
        }
    }
    // <--

    useEffect(() => {

    }, [dispLogin]);

    // --> Cierre de session.
    const cerrar = () => {
        endSession();
        setDispLogin(false);
        console.log("Sesion cerrada.");
    }
    // <--
    
    return (
        <div className="login" onMouseEnter={() => displayLogin("in")} onMouseLeave={() => displayLogin("out")}>
            {login 
            ?
            <div className="login__loged" >
                <div className="login__title">
                    <p >{logUser.usuario} &thinsp; &darr;</p>
                </div>

                {dispLogin
                ?
                <div className="login__count">
                    <h3>Bienvenido <span>{logUser.usuario}</span></h3>
                    
                    <ul>
                        <li><Link to="/orders">Mis Ordenes</Link></li>
                    </ul>

                    <button className="login__button login__endSession" onClick={() => cerrar()}>CERRAR SESION</button>
                </div>
                :
                null
                }

                
            </div>
            :
            <div className="login__unloged">
                <div className="login__title">
                    <p >INGRESAR &thinsp; &darr;</p>
                </div>

                {dispLogin
                ?
                <div className="login__inputs">
                    <input  type={"usuario"} 
                            placeholder={"Usuario"}
                            value={userLog.nombre}
                            name="usuario" 
                            onChange={changeLog}
                            required={true}
                            >
                    </input>

                    <input  type={"password"} 
                            placeholder={"Contraseña"} 
                            value={userLog.pass}
                            name="pass" 
                            onChange={changeLog}
                            required={true}>
                    </input>
                    <br></br>
                    
                    <p style={{color:"red"}}>{errorLog}</p>

                    <div className="login__buttons">
                        <Link to="/registro"><button className="login__button login__registro">REGISTRARSE</button></Link>
                        <button className="login__button login__ingreso" onClick={() => check()}>INGRESAR</button>
                    </div>
                </div>
                :
                null
                }
                
            </div>
            }
            
        </div>
    )
}

export default LoginWidget;
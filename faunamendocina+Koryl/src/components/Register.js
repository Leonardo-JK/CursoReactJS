import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

function Register() {
    
    const {userReg} = useContext(LoginContext);
    const [registro, setRegistro] = useState({
        nombre: "",
        domicilio: "",
        email: "",
        numero: "",
        ordenes: [],
        usuario: "",
        pass: "",
        repass: ""
    })
    const [validUser, setValidUser] = useState([null, null, true]);
    const [validUserStyle, setValidUserStyle] = useState({backgroundColor: "rgba(121, 138, 118, 0.8)"});
    const [regSucces, setRegSucces] = useState(false);
    
    const changeReg = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        });

        if(e.target.name === "usuario"){
            setValidUser([null, null, true]);
        }
        
        console.log(registro);
    }

    const check = async () => {
        
        console.log(registro);
    
        let aux = await userReg(registro.usuario, 1);
        console.log(aux);
        setValidUser(aux.slice(0,4));
        console.log(validUser);
        console.log(aux[3]);
        setValidUserStyle(aux[3]);        
    }

    const registrar = async (e) => {
        e.preventDefault();
    
        userReg(registro, 0);
        setRegSucces(true);        
    }

    console.log(validUser);

    if(regSucces){
        return (
            <div className="succes">
                <h2>¡Usuario registrado exitosamente!</h2>
                <h3>Bienvenido {registro.usuario} inicia sesión para entrar a tu cuenta.</h3>

                <div>
                    <button className='seguir'><Link to='/'>Volver al catalogo</Link></button>
                </div>
            </div>                
        )
    }

    return (
        <div className="register">
            <div className="register__inputs">
                <form className="register__form" onSubmit={registrar}>
                    <div>
                        <input  type={"text"}
                                placeholder="Nombre y Apellido"
                                name="nombre"
                                value={registro.nombre}
                                onChange={changeReg}
                                required={true}>
                        </input>

                        <input  type={"text"}
                                placeholder="Teléfono"
                                name="numero"
                                value={registro.numero}
                                onChange={changeReg}
                                required={true}>
                        </input>
                    </div>
                    
                    <input  type={"text"}
                            placeholder="Domicilio"
                            name="domicilio"
                            value={registro.domicilio}
                            onChange={changeReg}
                            required={true}>
                    </input>

                    <input  type={"text"}
                            placeholder="Email"
                            name="email"
                            value={registro.email}
                            onChange={changeReg}
                            required={true}>
                    </input>

                    <div className="linea"></div>

                    <div className="register__usuario">
                        <input  type={"text"}
                                placeholder="Usuario"
                                name="usuario"
                                value={registro.usuario}
                                onChange={changeReg}
                                required={true}>
                        </input>

                        <div onClick={check}>Comprobar usuario</div>

                        <p style={validUser[1]}>{validUser[0]}</p>
                    </div>
                    
                    <div className="register__pass">
                        <input  type={"password"}
                                placeholder="Contraseña"
                                name="pass"
                                value={registro.pass}
                                onChange={changeReg}
                                required={true}>
                        </input>

                        {registro.pass === registro.repass && registro.pass !== "" &registro.repass !== ""
                        ?
                        <p style={{color: "green"}}>Las contraseñas coinciden.</p>
                        :
                        <p style={{color: "red"}}>Las contraseñas NO son iguales.</p>
                        }
                        
                    </div>
                    

                    <div>
                        <input  className="register__repass" 
                                type={"password"}
                                placeholder="Repita Contraseña"
                                name="repass"
                                value={registro.repass}
                                onChange={changeReg}
                                required={true}>
                        </input>

                        <button className="register__enviar" 
                                type="submit" 
                                disabled={validUser[2]} 
                                style={validUserStyle}>ENVIAR</button>
                    </div>
                    

                </form>
            </div>
        </div>
    )
}

export default Register;
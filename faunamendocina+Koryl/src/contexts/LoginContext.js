import {createContext, useState} from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {

    const [login, setLogin] = useState(false);
    const [logUser, setLogUser] = useState({});
    
    console.log(logUser);

    const checkLog = async (log) => {
        console.log(log);
        let aux;
        const usersRef = collection(db, "usuarios");
        let usuario = query(usersRef, where("usuario", "==", log.usuario));
        
        await getDocs(usuario)
            .then(resp => {
                aux = (resp.docs.map((user) => ({...user.data()})));
            })

        console.log(aux[0].pass);
        console.log(log.pass);

        if(aux[0].pass === log.pass){
            setLogin(true);
            setLogUser(aux[0]);
            
            return true;
        } else {
            return false;
        }
    }

    const userReg = async (user, check) => {
        console.log(user);
        let aux;
        const usersRef = collection(db, "usuarios");
        let usuario = query(usersRef, where("usuario", "==", user));

        await getDocs(usuario)
            .then(resp => {
                aux = (resp.docs.map((use) => ({...use.data()})));
                console.log(aux);        
            });

        console.log(aux);
        console.log(check);
        
        if (aux.length !== 0 && check === 1) {
            console.log("no disponible");
            return ["¡Usuario NO disponible!", {color: "red"}, true, {backgroundColor: "rgba(121, 138, 118, 0.8)"}]
        } else if(aux.length === 0 && check === 1) {
            console.log("disponible");
            return ["¡Usuario disponible!", {color: "green"}, false, {backgroundColor: "rgb(21, 133, 6)"}]
        }
    
        if(check === 0){
            addDoc(usersRef, user)
        }
    }

    const endSession = () => {
        setLogin(false);
        setLogUser({});
    }

    return (
        <LoginContext.Provider value={{
            login,
            logUser,
            checkLog,
            userReg,
            endSession           
        }}>
            {children}
        </LoginContext.Provider>
    )
}

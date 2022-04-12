import {createContext, useState} from "react";



export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [un, setUn] = useState(0);
    let [vista, setVista] = useState(false);

    const cantUn = () =>{
        let suma = 0;
        for(let i = 0; i < cart.length; i++){
            for(let j = 0; j < cart[i].unidades.length; j++){
                suma += parseInt(cart[i].unidades[j].cantidad);
            }
        }
        console.log(suma);
        return suma;
    }  

    const addItem = (array) => {
        setCart(array);
        setUn(cantUn());
        console.log(cart);
    }

    const removeItem = (i, j) => {
        let aux = cart;
        aux[indexId(i)].unidades.splice(indexTam(indexId(i),j),1);
        if(aux[indexId(i)].unidades.length === 0){
            aux.splice(indexId(i),1);
        }
        setCart(aux);
        console.log(cart);
    }

    function indexId(id){
        for(let i = 0; i < cart.length; i++){
            if(cart[i].id === id){
                return i;
            }
        }
    }

    function indexTam(ind, tam){
        console.log(cart);
        for(let i = 0; i < cart[ind].unidades.length; i++){
            if(cart[ind].unidades[i].tamanno === tam){
                return i;
            }
        }
    }

    const isInCart = (num, array) => {
        if(array.length === 0){
            return [0, false];
        }
        for(let i = 0; i < array.length; i++){
            if(array[i].id === num){
                return [i, true];
            }
        }
        return [0, false];
    }

    const isTamId = (array, tam) =>{
        if(array.length === 0){
            return [0, false];
        }
        for(let i = 0; i < array.length; i++){
            if(array[i].tamanno === tam){
                return [i, true];
            }
        }
        return [0, false];
    }

    const mostrar = () => {
        if(un >= 0){
            setVista(true);
        } else {
            setVista(false);
        }
    }

    const clear = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{
            cart, 
            un, 
            vista, 
            setUn, 
            cantUn, 
            addItem, 
            removeItem, 
            isInCart, 
            isTamId, 
            mostrar, 
            clear
        }}>
            {children}
        </CartContext.Provider>
    )
}

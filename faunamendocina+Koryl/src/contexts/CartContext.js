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
    
    const total = () => {
        let suma = 0;
        for(let i = 0; i < cart.length; i++){
            for(let j = 0; j < cart[i].unidades.length; j++){
                suma += (parseInt(cart[i].unidades[j].cantidad) * parseInt(cart[i].precio));
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

        let newCart;
        let productDel = cart.find((item) => item.id === i)

        if (productDel.unidades.length > 0) {
            let unidadesNew = productDel.unidades.filter(uni => uni.tamanno !== j)
            productDel.unidades = unidadesNew

            newCart = cart.map((item) => item.id === i ? (item = productDel) : item)
        }

        if (productDel.unidades.length === 0) {
            newCart = cart.filter(item => item.id !== i)
        }

        setCart(newCart)
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
        setUn(0);
        setVista(false);
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
            clear, 
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

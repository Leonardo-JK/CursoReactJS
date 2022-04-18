import {createContext, useState} from "react";



export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);   // --> Estado que almacena el carrito. <--
    const [un, setUn] = useState(0);        // --> Estado que almacena las unidades totales del carrito. <-- 
    const [vista, setVista] = useState(false);  // --> Estado que setea la visibilidad o no del CartWidget. <--

    // --> Funcion encargada de sumar las unidades totales de los items.
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
    // <--
    
    // --> Funcion encargada de sumar el monto total a pagar.
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
    // <--

    // --> Funcion encargada de setear el carrito con los nuevos datos agregados.
    const addItem = (array) => {
        setCart(array);
        setUn(cantUn());
    }
    // <--

    // --> Funcion encargada de eliminar items individuales.
    const removeItem = (id, tam) => {

        let newCart;
        let productDel = cart.find((item) => item.id === id) // --> Filtra que producto que contiene el item a eliminar. <-- 

        // --> Si el producto contiene unidades, elimina las unidades del tamaño correspondiente.
        if (productDel.unidades.length > 0) {
            let unidadesNew = productDel.unidades.filter(uni => uni.tamanno !== tam)
            productDel.unidades = unidadesNew

            newCart = cart.map((item) => item.id === id ? (item = productDel) : item)
        }
        // <--

        // --> Si el producto se queda sin unidades luego de haber eliminado alguna, se elimina el producto completo.
        if (productDel.unidades.length === 0) {
            newCart = cart.filter(item => item.id !== id)
        }
        // <--

        // --> Si se elimina el ultimo item contenido, se desabilita la vista del CartWidget.
        if (newCart.length === 0){
            setVista(false)
        }
        // <-- 

        setCart(newCart); // --> Setea el estado contenedor del carrito con el objeto final. <--
    }
    // <--

    // --> Funcion que verifica si un producto ya se encuentra agregado al carrito.
    //      Retorna [a, b] - 
    //                  a: indice en la que se ubica dicho producto dentro del array del carrito.
    //                  b: Booleano que confirma si el producto se encuentra en el array.
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
    // <--

    // --> Funcion que verifica un tamaño determinado de un producto ya se encuentra en el carrito.
    //      Retorna [a, b] - 
    //                  a: indice en la que se ubica dicho tamaño dentro del array unidades.
    //                  b: Booleano que confirma si el tamaño se encuentra en el array unidades.
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
    // <--

    // --> Funcion encargada de habilitar/desabilitar la vista del CartWidget.
    const mostrar = () => {
        if(un >= 0){
            setVista(true);
        } else {
            setVista(false);
        }
    }
    // <--

    // --> Funcion encargada de vaciar el carrito por completo.
    const clear = () => {
        setCart([])
        setUn(0);
        setVista(false);
    }
    // <--

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

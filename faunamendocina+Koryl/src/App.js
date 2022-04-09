import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import {CartContext} from './contexts/CartContext';

function App() {
    
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

    const removeItem = (array) => {
        setCart(array);
        console.log(cart);
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

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <NavbarPrincipal />
                <CartContext.Provider value={{cart, un, vista, setUn, cantUn, addItem, removeItem, isInCart, isTamId, mostrar}}>
                    <NavBar />

                    <Routes>
                        <Route path='/' element={<ItemListContainer />}/>
                        <Route path="/category/:categoryid" element={<ItemListContainer />}/>
                        <Route path='/item/:id' element={<ItemDetailContainer/>}/>
                        <Route path='/cart' element={<Cart/>}/>

                        <Route path="*" element={<h1>Error404</h1>}/>
                    </Routes>
                </CartContext.Provider>    
            </div>
        </BrowserRouter>
            
            
    );
}

export default App;
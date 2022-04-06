import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";
import ItemDetailContainer from './components/ItemDetailContainer';
import {CartContext} from './contexts/CartContext';

function App() {
    
    const [cart, setCart] = useState([]);

    const addItem = (array) => {
        setCart(array);
    }

    const isInCart = (num, array) => {
        console.log(num);
        if(array.length === 0){
            return [0, false];
        }
        for(let i = 0; i < array.length; i++){
            console.log("aux id");
            console.log(array[i].id);
            if(array[i].id === num){
                return [i, true];
            }
        }
        return [0, false];
    }

    const isTamId = (array, tam) =>{
        console.log(tam);
        console.log(array);
        if(array.length === 0){
            return [0, false];
        }
        for(let i = 0; i < array.length; i++){
            console.log(array[i].tamanno);
            if(array[i].tamanno === tam){
                return [i, true];
            }
        }
        return [0, false];
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <NavbarPrincipal />
                <CartContext.Provider value={{cart, addItem, isInCart, isTamId}}>
                    <NavBar />

                    <Routes>
                        <Route path='/' element={<ItemListContainer />}/>
                        <Route path="/category/:categoryid" element={<ItemListContainer />}/>
                        <Route path='/item/:id' element={<ItemDetailContainer/>}/>

                        <Route path="*" element={<h1>Error404</h1>}/>
                    </Routes>
                </CartContext.Provider>    
            </div>
        </BrowserRouter>
            
            
    );
}

export default App;
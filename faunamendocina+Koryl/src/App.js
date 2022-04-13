import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import {CartProvider} from './contexts/CartContext';

function App() {

    return (
        <CartProvider>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <NavbarPrincipal />
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<ItemListContainer />}/>
                        <Route path="/category/:categoryid" element={<ItemListContainer />}/>
                        <Route path='/item/:id' element={<ItemDetailContainer/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        
                        <Route path="*" element={<h1>Error404</h1>}/>
                    </Routes>   
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
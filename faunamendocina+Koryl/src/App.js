import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import {CartProvider} from './contexts/CartContext';
import { LoginProvider } from "./contexts/LoginContext";
import Register from "./components/Register";
import Orders from "./components/Orders";

function App() {

    return (
        <CartProvider>
        <LoginProvider>
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
                        <Route path='/checkout' element={<Checkout/>}/>
                        <Route path='/registro' element={<Register />}/>
                        <Route path='/orders' element={<Orders />}/>

                        <Route path="*" element={<h1>Error404</h1>}/>
                    </Routes>   
                </div>
            </BrowserRouter>
        </LoginProvider>
        </CartProvider>
    );
}

export default App;
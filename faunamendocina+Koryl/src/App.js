import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
    
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <NavbarPrincipal />
                <NavBar />

                <Routes>
                    <Route path='/' element={<ItemListContainer />}/>
                    <Route path="/category/:categoryid" element={<ItemListContainer />}/>
                    <Route path='/item/:id' element={<ItemDetailContainer/>}/>

                    <Route path="*" element={<h1>Error404</h1>}/>
                </Routes>
                
            </div>
        </BrowserRouter>
            
            
    );
}

export default App;
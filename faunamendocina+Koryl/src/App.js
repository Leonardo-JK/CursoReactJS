import React, {useEffect, useState} from "react";
import NavBar from './components/NavBar';
import ItemListContainer from "./components/ItemListContainer";
import Header from "./components/Header";
import NavbarPrincipal from "./components/NavbarPrincipal";

localStorage.setItem("cantidad", 0);
localStorage.setItem("stock", 200);



function App() {
    
    return (
        <div className="App">
            <Header />
            <NavbarPrincipal />
            <NavBar />
            <ItemListContainer />
        </div>
        
    );
}

export default App;
import {suma} from '../components/BuyComand';

let cantidad = 0;
let stockItem = 200;
let styl = {display: 'none'};

function actualizarStock(valor){
    stockItem = valor;
}

function sumar(){
    if(suma !== cantidad){
        cantidad = parseInt(suma);
    }
}

function sty() {
    if(cantidad !== 0){
        styl = {display:'block'};
    } else {
        styl = {display:'none'};
    }
}
export {cantidad, stockItem, styl, actualizarStock, sumar, sty};
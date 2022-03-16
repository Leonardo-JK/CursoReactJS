import itemData from '../data/stock.json';
import fs from 'fs';

function extraerItem(category, name){
    for(let cat of itemData){
        if(category === cat.categoria){
            for(let item of cat.items){
                if(name === item.nombre){
                    return item;
                }
            }
        }
    }
}



function actualizarstock(category, name, newStock){
    let stockData = JSON.parse(itemData);

    for(let cat of stockData){
        if(category === cat.categoria){
            for(let item of cat.items){
                if(name === item.nombre){
                    item.stock = newStock;
                    stockData = JSON.stringify(stockData);
                    fs.writeFileSync('../data/stock.json', stockData);
                }
            }
        }
    }
}

export {extraerItem, actualizarstock};
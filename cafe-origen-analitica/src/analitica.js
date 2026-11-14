    const tabla = require("./datos.js");

// Cantidad*precio 
function valorVentas(ventas){
    let TotalVentas = 0;
    for (let i of ventas){
        TotalVentas = i.precio * i.cantidad 


    }
    console.log(TotalVentas)
}
valorVentas(tabla)

/*
//1. cuánto se vendió en total
let Totalprecio = 0;
for (let i of ventas){
    Totalprecio += i.precio
}
console.log("El total de ventas fueron: "+ Totalprecio)
*/


//2. cuántas unidades salieron


//3. cuál fue la venta más grande 

//4.cuánto gasta en promedio un cliente por compra (el ticket promedio)


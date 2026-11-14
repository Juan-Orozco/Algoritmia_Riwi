const ventas = require("./datos.js");

//Mostar todos los productos
/*
ventas
console.log(ventas );
*/

//Mostar la cantidad de productos
console.log(ventas.length );

//Primer producto
console.log(ventas[0]);

//Ultimo elemento 
console.log(ventas[ventas.length-1]);

//La propiedad producto del registro en la posición 4
console.log(ventas[4].producto)

//Toda la tabla
console.table(ventas);
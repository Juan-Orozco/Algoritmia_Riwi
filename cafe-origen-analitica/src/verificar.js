const { valorVentas,
    valorVentasM,
    totalVendidoM,
    totalVendido,
    unidadesVendidasM,
    UnidadesVendidas,
    ventasPorCiudadM,
    ventasPorCiudad } = require("./analitica");


console.log("------------------------------------Verificar ----",)
const ventas = require("./datos");

function comparacion(resultadoFor, resultadoMetodo) {
    if (Array.isArray(resultadoFor) && Array.isArray(resultadoMetodo)) {
        if (resultadoFor.length == resultadoFor.length && resultadoFor.every((ventas, i) => ventas == resultadoMetodo[i])) {
            return "OK es un arreglo y es igual"
        } else { return "Diferente" }

    } else {
        if (resultadoFor == resultadoMetodo) {
            return "ok es un valor y es igual"
        } else { return "Diferente" }
    }
}

console.log(comparacion("La operacion es igual: ", unidadesVendidasM(ventas), UnidadesVendidas(ventas)))


// ---------------------------------------- OBJETOS -------------------------------------------- //
//for
function totalPorCiudad(ventas) {
    totalciudad = {}
    for (let i of ventas) {
        if (totalciudad[i.ciudad.toLowerCase().trim()] == undefined) {
            totalciudad[i.ciudad.toLowerCase().trim()] = i.precio;
        } else {
            totalciudad[i.ciudad.toLowerCase().trim()] += i.precio
        }
    }
    return totalciudad
}
console.log(totalPorCiudad(ventas))


function unidadesPorProducto(ventas){
    unidadesProducto = {};
    for (let i of ventas) {
        if (unidadesProducto[i.producto.toLowerCase().trim()] == undefined) {
            unidadesProducto[i.producto.toLowerCase().trim()] = i.cantidad;
        } else {
            unidadesProducto[i.producto.toLowerCase().trim()] += i.cantidad
        }
    }
    return unidadesProducto
}
console.log(unidadesPorProducto(ventas))


function topProductosPorValor(ventas, k){
    
    top = [];
    top = Object.entries(unidadesPorProducto(ventas))
    top.sort((a, b) => b[1] - a[1]);
    return top
    
}
console.log(topProductosPorValor(ventas))

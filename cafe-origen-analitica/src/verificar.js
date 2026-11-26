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


// ---------------------------------------- OBJETOS CON FOR -------------------------------------------- //
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
    const topVentas = {};
    for(let i of ventas){
        if(topVentas[i.producto.toLowerCase().trim()] == undefined){
            topVentas[i.producto.toLowerCase().trim()] = i.precio * i.cantidad;
        } else {
            topVentas[i.producto.toLowerCase().trim()] += i.precio * i.cantidad;
        }
    }

    const Ranking = Object.entries(topVentas).sort((a,b) => b[1] - a[1]).slice(0, k).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    return Ranking
}
console.log(topProductosPorValor(ventas, 4))

// ---------------------------------------- OBJETOS CON METODOS DE ARREGLO -------------------------------------------- //


function totalPorCiudadM(ventas) {
    const resultado = ventas.reduce((totalciudad, i) => {   // ② y ①: nombre de la alcancía y de cada venta
    if (totalciudad[i.ciudad.toLowerCase().trim()] == undefined) {
                totalciudad[i.ciudad.toLowerCase().trim()] = i.precio;
            } else {
                totalciudad[i.ciudad.toLowerCase().trim()] += i.precio
            }                   // ③ IGUAL que en tu for
        return totalciudad;                                 // ⑤ NUEVO: devolver la alcancía en cada vuelta
    }, {});       
    return resultado;                                          // ① el valor inicial: la mesa vacía 
}
console.log("-----------------------------métodos de arreglo----------------------------------------------")
console.log(totalPorCiudadM(ventas))

function unidadesPorProductoM(ventas){
    const uniProducto = ventas.reduce((unidadesProducto, i) => {
      if (unidadesProducto[i.producto.toLowerCase().trim()] == undefined) {
            unidadesProducto[i.producto.toLowerCase().trim()] = i.cantidad;
        } else {
            unidadesProducto[i.producto.toLowerCase().trim()] += i.cantidad
        }  
    }, {})
    return uniProducto;
}
console.log(unidadesPorProductoM(ventas))

function topProductosPorValorM(ventas, k){

    const topVentas = ventas.reduce((topVentas, i) => {
        if(topVentas[i.producto.toLowerCase().trim()] == undefined){
            topVentas[i.producto.toLowerCase().trim()] = i.precio * i.cantidad;
        } else {
            topVentas[i.producto.toLowerCase().trim()] += i.precio * i.cantidad;
        }
        return topVentas;
    }, {});

    const Ranking = Object.entries(topVentas).sort((a,b) => b[1] - a[1]).slice(0, k).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    return Ranking;
}
console.log(topProductosPorValorM(ventas, 4))

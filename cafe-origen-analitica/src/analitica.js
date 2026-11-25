const ventas = require("./datos.js");
//const ventas = []

//-------------------------------- Ciclos for

// Cantidad*precio 
function valorVentas(ventas){
    const TodasLasVentas = [];
    for (const i of ventas) {
        
        TodasLasVentas.push(i.cantidad * i.precio) 
        
    }
    return TodasLasVentas
}
console.log("Devolvio:" ,valorVentas(ventas))
console.log("-----------------------------------")

//1. cuánto se vendió en total
function totalVendido(ventas){
    let TotalVendido = 0;
    for (const i of valorVentas(ventas)){
        TotalVendido += i
    }
    return TotalVendido
}

console.log("Total vendido" ,totalVendido(ventas))


//2. cuántas unidades salieron
function UnidadesVendidas(ventas)
{
    let TotalUnidades = 0;
    for (const i of ventas)
    {
        TotalUnidades += i.cantidad
    }
    return TotalUnidades
}
console.log("Unidades vendidas:" ,UnidadesVendidas(ventas))

//3. cuál fue la venta más grande 

function ventaMayor(ventas)
{
    let veMayor = 0;
    for (const i of ventas )
    {
          if (veMayor < i.precio)
          {
            veMayor = i.precio
          }
    }
    return veMayor
}
console.log("La venta mayor es: " , ventaMayor(ventas))

//4.cuánto gasta en promedio un cliente por compra (el ticket promedio)
function ticketPromedio(ventas)
{
    let Promedio = 0;

    Promedio = totalVendido(ventas) /UnidadesVendidas(ventas)
    
    return Promedio
}

console.log("El promedio es: " , ticketPromedio(ventas))

// 5. Total vendido por cada ciudad 

function ventasPorCiudad(ventas, ciudad){
    let totalCiudad = 0;
    for (i of ventas){
        
        if (i.ciudad.toLowerCase() == ciudad.toLowerCase()){
            totalCiudad += (i.precio*i.cantidad)
        }
    }
    return totalCiudad
}

console.log("El total por ciudad es:  " , ventasPorCiudad(ventas, "Medellín" ))


// -------------------------------- métodos de arreglo
console.log("-----------------------------métodos de arreglo----------------------------------------------")

function valorVentasM(ventas)
{
    const totalVenta = ventas.map((i) => i.cantidad * i.precio)
    return totalVenta
}

console.log("Devolvio:" ,valorVentasM(ventas))

function totalVendidoM(ventas)
{
    const TotalVendidos = valorVentas(ventas).reduce((sum , i) => sum += i, 0)
    return TotalVendidos
}
console.log("Total vendido:" ,totalVendidoM(ventas))

function unidadesVendidasM(ventas)
{
    const UnidadesVendidas = ventas.reduce((sum , i ) => sum += i.cantidad, 0)
    return UnidadesVendidas
}
console.log("Total unidades vendidas:" ,unidadesVendidasM(ventas))

function ventasPorCiudadM(ventas , ciudad)
{
   
    const TotalCiudad = ventas.reduce((CiTotal, i) => {
            if(ciudad.toLowerCase() == i.ciudad.toLowerCase() )
            {
                return CiTotal  + (i.cantidad * i.precio) 
            }
        return CiTotal
            
    }, 0)
    return TotalCiudad
    
}
console.log("Total valor ciudad:" ,ventasPorCiudadM(ventas , "medellín"))

module.exports = {
    valorVentas,
    valorVentasM,
    totalVendidoM,
    totalVendido,
    unidadesVendidasM,
    UnidadesVendidas,
    ventasPorCiudadM,
    ventasPorCiudad

};
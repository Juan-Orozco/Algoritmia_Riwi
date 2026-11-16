// Problema grande -> piezas pequeñas (SubProcesos)

SubProceso subtotal <- LeerPedido()
	// Lee precio y cantidad de cada plato; precio 0 termina el pedido (centinela)
	Definir subtotal, precio Como Real
	Definir cantidad Como Entero
	subtotal <- 0
	Escribir "Precio del plato (0 para terminar):"
	Leer precio
	Mientras precio <> 0 Hacer
		Escribir "Cantidad:"
		Leer cantidad
		subtotal <- subtotal + precio * cantidad
		Escribir "Precio del plato (0 para terminar):"
		Leer precio
	FinMientras
FinSubProceso

SubProceso valor <- CalcularPorcentaje(base, porcentaje)
	// Un solo SubProceso, usado dos veces (impuesto 8 % y propina 10 %)
	Definir valor Como Real
	valor <- base * porcentaje / 100
FinSubProceso

SubProceso ImprimirFactura(subtotal, impuesto, propina)
	Escribir "----- FACTURA -----"
	Escribir "Subtotal: $", subtotal
	Escribir "Impuesto (8 %): $", impuesto
	Escribir "Propina (10 %): $", propina
	Escribir "Total: $", subtotal + impuesto + propina
FinSubProceso

Algoritmo FacturaRestaurante
	Definir subtotal, impuesto, propina Como Real
	subtotal <- LeerPedido()
	impuesto <- CalcularPorcentaje(subtotal, 8)
	propina <- CalcularPorcentaje(subtotal, 10)
	ImprimirFactura(subtotal, impuesto, propina)
FinAlgoritmo

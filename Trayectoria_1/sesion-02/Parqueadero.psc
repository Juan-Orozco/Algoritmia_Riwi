Algoritmo Parqueadero
	Definir tipo, minutos, horas Como Entero
	Definir tarifa, valor Como Real
	Definir factura Como Caracter
	Escribir "Tipo de vehículo (1 = carro, 2 = moto):"
	Leer tipo
	Escribir "Minutos de permanencia:"
	Leer minutos
	Escribir "¿Tiene factura de compra? (S/N)"
	Leer factura
	factura <- Mayusculas(factura)
	Si minutos < 0 Entonces
		Escribir "Los minutos no pueden ser negativos"
	SiNo
		// Segun escoge la tarifa; De Otro Modo atrapa lo raro
		Segun tipo Hacer
			1:
				tarifa <- 4000
			2:
				tarifa <- 2000
			De Otro Modo:
				tarifa <- 0
		FinSegun
		Si tarifa = 0 Entonces
			Escribir "Tipo de vehículo no válido"
		SiNo
			// Gratis los primeros 15 = incluye el 15
			Si minutos <= 15 Entonces
				valor <- 0
			SiNo
				// (minutos + 59) / 60 redondea hacia arriba (hora o fracción)
				horas <- trunc((minutos + 59) / 60)
				valor <- horas * tarifa
				// El tope va ANTES del descuento
				Si valor > 30000 Entonces
					valor <- 30000
				FinSi
				Si factura = "S" Entonces
					valor <- valor / 2
				FinSi
			FinSi
			Escribir "Valor a pagar: $", valor
		FinSi
	FinSi
FinAlgoritmo

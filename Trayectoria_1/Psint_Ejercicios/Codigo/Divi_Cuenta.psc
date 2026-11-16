Algoritmo Divi_Cuenta
	Definir Total, personas, propina Como Real
	Escribir 'Cuanto costo la comida ? '
	Leer Total
	Escribir '¿ Cuantas personas son ? '
	Leer personas
	Escribir '¿Cuanto es el porcentaje en propina?'
	Leer propina
	Division <- (Total*(propina/100))
	Escribir 'La propina es de: ', Division
	Division <- Division+Total
	Escribir 'El totar a pagar serian: ', Division
	Division <- (Division)/personas
	Escribir 'La cuenta les toca de a ', Division
FinAlgoritmo

Algoritmo Piramide
	// Un ciclo dentro de otro
	Definir n, fila, j Como Entero
	Escribir "Altura de la pirámide:"
	Leer n
	Para fila <- 1 Hasta n Hacer
		// Espacios: n - fila (en la última fila es 0 y el ciclo no da vueltas)
		Para j <- 1 Hasta n - fila Con Paso 1 Hacer
			Escribir Sin Saltar " "
		FinPara
		// Asteriscos: 2 * fila - 1 (1, 3, 5, 7...)
		Para j <- 1 Hasta 2 * fila - 1 Hacer
			Escribir Sin Saltar "*"
		FinPara
		Escribir ""
	FinPara
FinAlgoritmo

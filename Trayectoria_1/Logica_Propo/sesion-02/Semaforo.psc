Algoritmo Semaforo
	// < 0 error | = 0 rojo: agotado | 1 a 10 amarillo: pedir | > 10 verde: todo bien
	Definir unidades Como Entero
	Escribir "Unidades en inventario:"
	Leer unidades
	Si unidades < 0 Entonces
		Escribir "Error: las unidades no pueden ser negativas"
	SiNo
		Si unidades = 0 Entonces
			Escribir "ROJO: agotado"
		SiNo
			Si unidades <= 10 Entonces
				Escribir "AMARILLO: pedir"
			SiNo
				Escribir "VERDE: todo bien"
			FinSi
		FinSi
	FinSi
FinAlgoritmo

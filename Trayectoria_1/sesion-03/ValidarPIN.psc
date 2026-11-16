Algoritmo ValidarPIN
	// Patrón: intentos limitados (3 intentos, luego se bloquea)
	Definir pin, intentos Como Entero
	Definir acceso Como Logico
	intentos <- 0
	acceso <- Falso
	Repetir
		Escribir "Ingresa tu PIN:"
		Leer pin
		intentos <- intentos + 1
		Si pin = 2580 Entonces
			acceso <- Verdadero
		FinSi
	// Corregido: era "acceso Y intentos = 3" (ciclo infinito). Se para si acierta O si se acaban los intentos
	Hasta Que acceso O intentos = 3
	Si acceso Entonces
		Escribir "Bienvenido"
	SiNo
		Escribir "Tarjeta bloqueada"
	FinSi
FinAlgoritmo

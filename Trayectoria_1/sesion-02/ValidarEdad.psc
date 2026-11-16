Algoritmo ValidarEdad
	// Válida:   edad >= 0 Y edad <= 120
	// Inválida (De Morgan): NO (A Y B) = NO A O NO B  ->  edad < 0 O edad > 120
	Definir edad Como Entero
	Escribir "Ingrese la edad:"
	Leer edad
	Si edad < 0 O edad > 120 Entonces
		Escribir "Edad inválida"
	SiNo
		Escribir "Edad válida"
	FinSi
FinAlgoritmo

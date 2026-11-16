# Algoritmia 1 · Sesión 2 · Lógica y decisiones

Evidencia de la sesión: tablas de verdad, tablas de decisión y pruebas de escritorio de cada ejercicio.

| Archivo | Qué hace |
|---|---|
| `ValidarRegistro.psc` | Registro si tiene 14 años o más **Y** acepta los términos |
| `ValidarEdad.psc` | Edad inválida usando la Ley de De Morgan |
| `Parqueadero.psc` | Cobro del parqueadero del centro comercial |
| `Semaforo.psc` | Semáforo de inventario |
| `Bisiesto.psc` | Año bisiesto |

---

## Actividades de pausa del video

**¿Se puede asegurar que llovió si Johan llegó con paraguas?**
No. La regla es "si llueve → paraguas", pero no dice lo contrario. Johan pudo llevar el paraguas por el sol o por si acaso. Paraguas ≠ llovió.

**¿Cuáles frases son proposiciones?**

| # | Frase | ¿Proposición? | Por qué |
|---|---|---|---|
| 1 | Hoy es lunes | Sí | Se responde V o F |
| 2 | ¿Qué hora es? | No | Es una pregunta |
| 3 | Cierra la puerta | No | Es una orden |
| 4 | 5 es mayor que 3 | Sí | Es V |
| 5 | La edad es mayor o igual a 18 | Sí | Depende de la edad, pero siempre da V o F |

Respuesta: **1, 4 y 5**.

---

## 1. ValidarRegistro.psc

Regla: `edad >= 14 Y respuesta = "S"`

### Tabla de verdad

| edad >= 14 | acepta | edad >= 14 Y acepta | Resultado |
|---|---|---|---|
| V | V | V | Registro exitoso |
| V | F | F | No puedes registrarte |
| F | V | F | No puedes registrarte |
| F | F | F | No puedes registrarte |

### Pruebas

| Edad | Respuesta | Después de Mayusculas | Esperado | Qué prueba |
|---|---|---|---|---|
| 14 | S | S | Registro exitoso | Borde: el 14 entra por el `>=` |
| 13 | S | S | No puedes registrarte | Falla la edad |
| 30 | n | N | No puedes registrarte | Falla la respuesta |
| 14 | s | S | Registro exitoso | `Mayusculas` convierte la minúscula |

Sin `Mayusculas`, la prueba `14 s` fallaría porque `"s" = "S"` es Falso.

---

## 2. ValidarEdad.psc

- Válida: `edad >= 0 Y edad <= 120`
- Negación con De Morgan: `NO (A Y B) = NO A O NO B`
- Inválida: `edad < 0 O edad > 120`

Al negar se cambia también el **Y por O**. Si se dejara el Y (`edad < 0 Y edad > 120`), ningún número cumpliría las dos condiciones y nunca saldría "inválida".

### Pruebas

| Edad | edad < 0 | edad > 120 | O | Esperado |
|---|---|---|---|---|
| -1 | V | F | V | Edad inválida |
| 0 | F | F | F | Edad válida |
| 120 | F | F | F | Edad válida |
| 121 | F | V | V | Edad inválida |

---

## 3. Parqueadero.psc

### Reglas del administrador

1. Carro: $4.000 por hora o fracción. Moto: $2.000.
2. Los primeros 15 minutos son gratis.
3. El cobro máximo del día es $30.000.
4. Con factura del centro comercial paga la mitad (después del máximo).
5. Tipo que no sea carro ni moto, o minutos negativos: error.

### Tabla de decisión

| Regla | Tipo | Minutos | Factura | Resultado |
|---|---|---|---|---|
| R1 | Cualquiera | Menos de 0 | Cualquiera | Error: minutos negativos |
| R2 | Ni 1 ni 2 | 0 o más | Cualquiera | Error: tipo no válido |
| R3 | Carro o moto | De 0 a 15 | Cualquiera | Gratis |
| R4 | Carro o moto | Más de 15 | No | Horas × tarifa, máximo $30.000 |
| R5 | Carro o moto | Más de 15 | Sí | Lo mismo que R4, dividido entre 2 |

### Valores de minutos que hay que probar (bordes)

`-1` (error) · `0` (gratis) · `15` (gratis) · `16` (cobra) · `60` (1 hora) · `61` (2 horas)

Los bugs se esconden donde la regla cambia.

### Casos borde

| # | Tipo | Min | Factura | Horas | Esperado |
|---|---|---|---|---|---|
| 1 | Carro (1) | 15 | No | - | 0 |
| 2 | Carro (1) | 16 | No | 1 | 4.000 |
| 3 | Carro (1) | 60 | No | 1 | 4.000 |
| 4 | Carro (1) | 61 | No | 2 | 8.000 |
| 5 | Moto (2) | 61 | Sí | 2 | 2.000 |
| 6 | Carro (1) | 600 | No | 10 | 30.000 (tope) |
| 7 | Carro (1) | 600 | Sí | 10 | 15.000 |
| 8 | 3 | 30 | No | - | Tipo no válido |
| 9 | Carro (1) | -5 | No | - | Los minutos no pueden ser negativos |

Caso 1: "gratis los primeros 15" **incluye** el 15, por eso es `minutos <= 15` y no `< 15`.

### Prueba de escritorio · Caso 7 (carro, 600 minutos, con factura)

| Paso | tipo | minutos | factura | tarifa | horas | valor |
|---|---|---|---|---|---|---|
| Lee datos | 1 | 600 | S | | | |
| Segun | 1 | 600 | S | 4000 | | |
| Calcula horas: trunc((600 + 59) / 60) | 1 | 600 | S | 4000 | 10 | |
| Calcula valor: 10 × 4000 | 1 | 600 | S | 4000 | 10 | 40000 |
| Aplica tope | 1 | 600 | S | 4000 | 10 | 30000 |
| Aplica factura | 1 | 600 | S | 4000 | 10 | **15000** |

Si se aplicara el descuento antes del tope: 40.000 / 2 = 20.000 (incorrecto). **El tope va antes del descuento.**

---

## 4. Semaforo.psc (Reto 1)

### Tabla de decisión

| Regla | Unidades | Resultado |
|---|---|---|
| R1 | < 0 | Error |
| R2 | = 0 | ROJO: agotado |
| R3 | 1 a 10 | AMARILLO: pedir |
| R4 | > 10 | VERDE: todo bien |

### Casos borde

| Unidades | Esperado | Qué prueba |
|---|---|---|
| -1 | Error | Negativo más cercano a 0 |
| 0 | ROJO: agotado | Límite error / rojo |
| 1 | AMARILLO: pedir | Límite rojo / amarillo |
| 10 | AMARILLO: pedir | Límite superior del amarillo (`<=`) |
| 11 | VERDE: todo bien | Primer verde |
| 12 | VERDE: todo bien | Ejemplo del video |

### Prueba de escritorio · unidades = 10

| Paso | unidades | Condición | Resultado |
|---|---|---|---|
| Lee dato | 10 | | |
| ¿unidades < 0? | 10 | F | sigue |
| ¿unidades = 0? | 10 | F | sigue |
| ¿unidades <= 10? | 10 | V | **AMARILLO: pedir** |

---

## 5. Bisiesto.psc (Reto 2)

Regla: divisible entre 4 **Y** no divisible entre 100, **O** divisible entre 400.

```
(anio MOD 4 = 0 Y anio MOD 100 <> 0) O anio MOD 400 = 0
```

`anio MOD 4 = 0` significa que el residuo de dividir entre 4 es 0, o sea, que es divisible entre 4.

### Tabla de verdad (A = ÷4, B = ÷100, C = ÷400)

| Año | A: MOD 4 = 0 | NO B: MOD 100 <> 0 | A Y NO B | C: MOD 400 = 0 | Resultado |
|---|---|---|---|---|---|
| 2024 | V | V | V | F | **Bisiesto** |
| 1900 | V | F | F | F | No es bisiesto |
| 2000 | V | F | F | V | **Bisiesto** |
| 2026 | F | V | F | F | No es bisiesto |

1900 es la trampa: es divisible entre 4, pero también entre 100 y no entre 400, así que febrero de 1900 tuvo 28 días.

### Prueba de escritorio · anio = 1900

| Paso | anio | Cálculo | Valor |
|---|---|---|---|
| Lee dato | 1900 | | |
| 1900 MOD 4 | 1900 | residuo 0 | A = V |
| 1900 MOD 100 | 1900 | residuo 0 → `<> 0` | NO B = F |
| A Y NO B | | V Y F | F |
| 1900 MOD 400 | 1900 | residuo 300 | C = F |
| F O F | | | **No es bisiesto** |

---


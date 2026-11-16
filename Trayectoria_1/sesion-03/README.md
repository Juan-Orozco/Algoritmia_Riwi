# Algoritmia 1 · Sesión 3 · Repetir y descomponer

Evidencia de la sesión: trazas del cajero y de la pirámide, árbol de componentes y pruebas de cada ejercicio.

| Archivo | Qué hace | Ciclo / idea |
|---|---|---|
| `CajeroParqueadero.psc` | Suma lo cobrado hasta que se cierra la caja con 0 | `Mientras` + centinela |
| `ValidarPIN.psc` | 3 intentos para el PIN, luego se bloquea | `Repetir` + intentos limitados |
| `Calificaciones.psc` | Promedio, aprobados, nota más alta y más baja de 5 estudiantes | `Para` + 4 patrones |
| `Piramide.psc` | Dibuja una pirámide de asteriscos | `Para` dentro de `Para` |
| `FacturaRestaurante.psc` | Factura con impuesto y propina | `SubProceso` |

---

## Reto: el caracol del pozo

El pozo mide 10 metros. El caracol sube 3 m de día y resbala 2 m de noche. ¿En cuántos días sale?

La trampa: pensar "avanza 1 m por día, así que 10 días". Está mal, porque el último día el caracol llega arriba y sale **antes** de resbalar.

| Día | Arranca | Sube hasta | ¿Salió? | Resbala a |
|---|---|---|---|---|
| 1 | 0 | 3 | No | 1 |
| 2 | 1 | 4 | No | 2 |
| 3 | 2 | 5 | No | 3 |
| 4 | 3 | 6 | No | 4 |
| 5 | 4 | 7 | No | 5 |
| 6 | 5 | 8 | No | 6 |
| 7 | 6 | 9 | No | 7 |
| 8 | 7 | **10** | **Sí** | - |

**Sale en 8 días.**

- **Ciclo:** los mismos pasos que se repiten hasta que se cumple una condición.
- **Traza:** la tabla que se acaba de llenar.
- **Error por uno:** dar una vuelta de más o de menos (decir 10 en vez de 8, por ejemplo).

## Todo ciclo tiene cuatro partes

| Parte | En el caracol |
|---|---|
| Inicio | `altura <- 0` |
| Condición | ¿no ha salido? |
| Cuerpo | sube y resbala |
| Actualización | la altura cambia |

Si falta la actualización, la condición nunca cambia y el ciclo **nunca termina**.

## Tres formas de repetir

| Ciclo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `Mientras ... FinMientras` | No sabes cuántas vueltas habrá; puede que no dé ninguna | Cobrar carros hasta cerrar caja |
| `Repetir ... Hasta Que` | Tiene que hacerse al menos una vez | Pedir el PIN |
| `Para ... FinPara` | Sabes exactamente cuántas vueltas son | Leer las notas de 5 estudiantes |

## Seis patrones

| Patrón | Pregunta que responde | Cómo se ve |
|---|---|---|
| Contador | ¿Cuántos? | `carros <- carros + 1` |
| Acumulador | ¿Cuánto suma todo? | `total <- total + valor` |
| Bandera | ¿Pasó algo al menos una vez? | `Si nota < 3 Entonces perdio <- Verdadero` |
| Máximo / mínimo | ¿Cuál es el mayor o el menor? | `Si nota > mayor Entonces mayor <- nota` |
| Centinela | ¿Cuándo dejo de leer? | `Mientras valor <> 0 Hacer` |
| Intentos limitados | ¿Cuántas oportunidades hay? | `Hasta Que acceso O intentos = 3` |

El acumulador se inicia en 0 **antes** del ciclo. Si se pone dentro del ciclo, se reinicia en cada vuelta.

## ¿Cuántas veces se repite cada ciclo?

| | Ciclo | Vueltas |
|---|---|---|
| A | `Para i <- 1 Hasta 10 Hacer` | **10** (1 a 10) |
| B | `Para i <- 0 Hasta 10 Hacer` | **11** (0 a 10) |
| C | `i <- 1` · `Mientras i < 10 Hacer` ... `i <- i + 1` | **9** (1 a 9; con 10 ya no entra) |

Una vuelta de diferencia es un error por uno. Para defenderse de eso, hay que hacer la traza.

---

## 1. CajeroParqueadero.psc

### El error del Robot

```
Leer valor
Mientras valor <> 0 Hacer
    total <- total + valor
    carros <- carros + 1
FinMientras
```

Falta `Leer valor` dentro del ciclo. Sin esa línea, `valor` siempre vale 4000, la condición nunca cambia y el ciclo es infinito. **Falta la parte 4: la actualización.**

### Traza con 4000, 8000, 2000 y 0

| Vuelta | valor | total | carros | Lee |
|---|---|---|---|---|
| Antes del ciclo | 4000 | 0 | 0 | - |
| 1 | 4000 | 4000 | 1 | 8000 |
| 2 | 8000 | 12000 | 2 | 2000 |
| 3 | 2000 | 14000 | 3 | 0 |
| Sale (0 <> 0 es Falso) | 0 | 14000 | 3 | - |

Consola:
```
Carros atendidos: 3
Total recaudado: $14000
```

El 0 es el **centinela**: es la señal de parar y no se cuenta como carro.

---

## 2. ValidarPIN.psc

### El error del Robot

```
Hasta Que acceso Y intentos = 3
```

Si el PIN está mal, `acceso = Falso` y `Falso Y lo que sea = Falso`, así que el ciclo sigue para siempre (intentos = 5, 99, 1704...). Y si acierta en el primer intento, tampoco para, porque `intentos = 3` es Falso.

### Corrección

```
Hasta Que acceso O intentos = 3
```

Se para si **acierta O** si **se acabaron los intentos**. Es la misma idea de De Morgan de la sesión 2: "seguir mientras NO acierte Y queden intentos" se convierte en "parar cuando acierte O no queden intentos".

### Pruebas (PIN correcto = 2580)

| PIN ingresados | intentos al salir | acceso | Esperado |
|---|---|---|---|
| 2580 | 1 | V | Bienvenido |
| 1111, 2580 | 2 | V | Bienvenido |
| 1111, 2222, 2580 | 3 | V | Bienvenido (borde: acierta en el último) |
| 1111, 2222, 3333 | 3 | F | Tarjeta bloqueada |

---

## 3. Calificaciones.psc

Un solo ciclo `Para` resuelve cuatro preguntas en una sola pasada:

| Pregunta | Patrón |
|---|---|
| Promedio | Acumulador |
| Cuántos aprobaron (3 o más) | Contador |
| Nota más alta y más baja | Máximo y mínimo |
| ¿Alguien perdió? | Bandera |

### Traza con 3.5, 2.8, 4.9, 3.0 y 4.2

| i | nota | suma | aprobados | mayor | menor | alguienPerdio |
|---|---|---|---|---|---|---|
| Antes | - | 0 | 0 | 0 | 5 | F |
| 1 | 3.5 | 3.5 | 1 | 3.5 | 3.5 | F |
| 2 | 2.8 | 6.3 | 1 | 3.5 | 2.8 | **V** |
| 3 | 4.9 | 11.2 | 2 | 4.9 | 2.8 | V |
| 4 | 3.0 | 14.2 | 3 | 4.9 | 2.8 | V |
| 5 | 4.2 | 18.4 | 4 | 4.9 | 2.8 | V |

| Promedio | Aprobados | Más alta | Más baja | ¿Refuerzo? |
|---|---|---|---|---|
| 18.4 / 5 = **3.68** | **4** | **4.9** | **2.8** | **Sí** |

`mayor` arranca en 0 y `menor` en 5, así la primera nota siempre los reemplaza. Si `menor` arrancara en 0, ninguna nota sería menor y el resultado diría 0. El 3.0 es un caso borde: aprueba, por el `>=`.

---

## 4. Piramide.psc

### El error del Robot

`Hasta 2 * fila` dibuja una escalera (2, 4, 6, 8) y no una pirámide. Lo correcto es `Hasta 2 * fila - 1` (1, 3, 5, 7). Es otro error por uno.

### Fórmulas

- Espacios por fila: `n - fila`
- Asteriscos por fila: `2 * fila - 1`

### Traza con altura 4

| fila | espacios (4 - fila) | asteriscos (2·fila - 1) | Se dibuja |
|---|---|---|---|
| 1 | 3 | 1 | `   *` |
| 2 | 2 | 3 | `  ***` |
| 3 | 1 | 5 | ` *****` |
| 4 | 0 | 7 | `*******` |

Última fila: 0 espacios. Con `Con Paso 1`, `Para j <- 1 Hasta 0` no da ninguna vuelta (si no se pone, PSeInt contaría hacia atrás). Este es el caso borde.

### Pruebas

Altura 1:
```
*
```

Altura 4:
```
   *
  ***
 *****
*******
```

Altura 6:
```
     *
    ***
   *****
  *******
 *********
***********
```

---

## 5. FacturaRestaurante.psc

Un problema grande se parte en piezas pequeñas:

| SubProceso | Qué hace |
|---|---|
| `LeerPedido()` | Lee los platos y devuelve el subtotal |
| `CalcularPorcentaje(base, porcentaje)` | `base * porcentaje / 100` |
| `ImprimirFactura(subtotal, impuesto, propina)` | Muestra subtotal, impuesto, propina y total |

¿Impuesto y propina son dos problemas o el mismo? Son **el mismo**: calcular un porcentaje. Por eso es **un solo SubProceso, usado dos veces** (con 8 y con 10).

El algoritmo principal se lee como una receta:

```
subtotal <- LeerPedido()
impuesto <- CalcularPorcentaje(subtotal, 8)
propina  <- CalcularPorcentaje(subtotal, 10)
ImprimirFactura(subtotal, impuesto, propina)
```

### Prueba: 25000 × 2, 12000 × 1 y 0

| Paso | Cálculo | Resultado |
|---|---|---|
| Plato 1 | 25000 × 2 | 50000 |
| Plato 2 | 12000 × 1 | 12000 |
| Precio 0 | termina (centinela) | subtotal = **62000** |
| Impuesto 8 % | 62000 × 8 / 100 | **4960** |
| Propina 10 % | 62000 × 10 / 100 | **6200** |
| Total | 62000 + 4960 + 6200 | **73160** ✔ |

---

## La página como árbol de cajas

Página de ejemplo: la tienda **Sabor Paisa** del video.

```
Página
├── Encabezado
│   ├── Logo
│   └── Menú
├── Contenido
│   ├── Banner
│   └── Lista de platos
│       └── Tarjeta de plato  (×3 · se repite = ciclo)
│           ├── Imagen
│           ├── Nombre y precio
│           └── Botón Agregar
└── Pie de página
```

### Mi página real: inicio de YouTube

```
Página
├── Encabezado
│   ├── Botón menú
│   ├── Logo
│   ├── Barra de búsqueda
│   └── Iconos de cuenta (crear, notificaciones, perfil)
├── Barra lateral
│   └── Enlace de sección  (×N · se repite = ciclo)
│       ├── Icono
│       └── Texto
└── Contenido
    ├── Filtros por tema
    │   └── Chip de filtro  (×N · se repite = ciclo)
    └── Cuadrícula de videos
        └── Tarjeta de video  (×N · se repite = ciclo)
            ├── Miniatura (con duración)
            ├── Foto del canal
            ├── Título
            └── Canal · vistas · fecha
```

Cada caja es una pieza que hace su trabajo y se puede reutilizar. La tarjeta de video se diseña una sola vez y se repite con un ciclo. Es la misma idea que el SubProceso en código, y en diseño (HTML) se arma con flexbox y grid.

---

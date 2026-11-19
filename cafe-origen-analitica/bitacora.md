# Bitácora de Análisis - Café Origen v0.1

## 1. Diccionario de datos (Minirreto 1)

| Propiedad | Tipo de dato | Significado |
| :---          | :---     |     :---|
| `id`          | int      | Identificador único de cada registro o venta.                 |
| `fecha`       | datetime | Fecha en la que se realizó la venta.                          |
| `cliente`     | string   | Código que identifica al cliente que realizó la compra.       |
| `producto`    | string   | Nombre del producto vendido.                                  |
| `ciudad`      | string   | Ciudad donde se realizó la venta.                             |
| `cantidad`    | int      | Número de unidades del producto vendidas.                     |
| `precio`      | Decimal  | Valor monetario del producto o de la venta, según el registro.|

---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**:
    En el apartado cantidad hay un valor 0, lo cual no es correcto porque si precio se multiplica por cantidad 
    daria 0, no seria una venta 
- **¿Cómo se debe tratar en el análisis?**:
    Con una funcion validar que el arrgelo no este vacio 
### Hallazgo 2:
- **Descripción**:
    En ciudad se presentan varios nombres con mayusculas y minusculas y tildes
- **¿Cómo se debe tratar en el análisis?**:
  Normalizar el texto para que no lo tome distinto si son May o Min
### Hallazgo 3:
- **Descripción**:
    Aunque el cliente pueda hacer varias comprar en distitos dias deberia concervar el mismo ID.
- **¿Cómo se debe tratar en el análisis?**:
    Antes de permitir ingresar a la base de datos validar que no exista
---

## 3. Patrones con ciclos manuales (Minirreto 2)
  Verifica a mano al menos dos resultados con una tabla de traza en la bitácora y comprueba que coinciden con los del programa. 

### valorVentas

| Vuelta | cantidad | ventas | Operación         | Resultado |
| :---:  | :---:    | :---:  | :---              | :---:     |
| 0      | -        | -      | -                 | -         |
| 1      | 2        | 42000  | cantidad * ventas | 84000     |
| 2      | 1        | 26000  | cantidad * ventas | 26000     |
| 3      | 2        | 95000  | cantidad * ventas | 190000    |
| 4      | 1        | 42000  | cantidad * ventas | 42000     |
| 5      | 3        | 45000  | cantidad * ventas | 135000    |
| 6      | 2        | 26000  | cantidad * ventas | 52000     |

### Total Precios (usa los resultados de valorVentas)

| Vuelta | ventas | Operación       | Resultado |
| :---:  | :---:  | :---            | :---:     |
| 0      | -      | -               | -         |
| 1      | 84000  | 0 + 84000       | 84000     |
| 2      | 26000  | 84000 + 26000   | 110000    |
| 3      | 190000 | 110000 + 190000 | 300000    |
| 4      | 42000  | 300000 + 42000  | 342000    |
| 5      | 135000 | 342000 + 135000 | 477000    |

---

## 4. Del ciclo al método: Preguntas de transformación y agrupación (Minirreto 3)

- **¿Qué filtro? (`.filter`)**:
- **¿Qué transformo? (`.map`)**:
- **¿Qué reduzco / acumulo? (`.reduce`)**:
- **¿Cómo agrupo en un diccionario?**:
- **¿Cómo ordeno sin modificar el arreglo original? (`.sort`)**:

---

## 5. Verificación del reporte y pureza de funciones (Minirreto 4)

- **¿Cómo comprobaste que el arreglo `ventas` original no fue modificado?**:
- **Comando para ejecutar el reporte**:

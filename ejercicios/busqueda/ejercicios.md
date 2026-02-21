# Busqueda

## Ejercicios propuestos

**Ejercicio 1.**\
Explica la diferencia entre búsqueda lineal y búsqueda binaria.

------------------------------------------------------------------------

**Ejercicio 2.**\
¿Por qué la búsqueda binaria requiere que el arreglo esté ordenado?

------------------------------------------------------------------------

**Ejercicio 3.**\

Tienes:

Un arreglo desordenado con 1 millón de elementos. Debes realizar 100,000 búsquedas.

- ¿Conviene usar búsqueda lineal cada vez?

- ¿Conviene ordenar primero y luego usar búsqueda binaria?

Justifica tu respuesta usando complejidad temporal.

------------------------------------------------------------------------

## Ejercicio ilustrativo

### Búsqueda binaria

Arreglo ordenado:

    [2, 5, 8, 12, 16, 23]

Buscar: 12

1.  Elemento central: 8 → 12 es mayor.
2.  Se descarta la mitad izquierda.
3.  Nuevo centro: 12 → encontrado.

**Complejidad en el peor caso:**\
O(log n)

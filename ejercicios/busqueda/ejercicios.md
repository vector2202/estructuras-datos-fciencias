# Busqueda

## Ejercicios propuestos

**Ejercicio 1.**\
Explica la diferencia entre busqueda lineal y busqueda binaria.

------------------------------------------------------------------------

**Ejercicio 2.**\
¿Por que la busqueda binaria requiere que el arreglo este ordenado?

------------------------------------------------------------------------

**Ejercicio 3.**\

Tienes:

Un arreglo desordenado con 1 millon de elementos. Debes realizar 100,000 busquedas.

- ¿Conviene usar busqueda lineal cada vez?

- ¿Conviene ordenar primero y luego usar busqueda binaria?

Justifica tu respuesta usando complejidad temporal.

------------------------------------------------------------------------

## Ejercicio ilustrativo

### Busqueda binaria

Arreglo ordenado:

    [2, 5, 8, 12, 16, 23]

Busqueda: 12

1.  Elemento central: 8 → 12 es mayor.
2.  Se descarta la mitad izquierda.
3.  Nuevo centro: 12 → encontrado.

**Complejidad en el peor caso:**\
O(log n)

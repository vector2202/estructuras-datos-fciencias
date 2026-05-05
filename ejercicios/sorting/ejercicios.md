# Ordenamiento (Sorting)

El ordenamiento es uno de los problemas fundamentales en ciencias de la computacion. Existen distintos algoritmos con diferentes uso de memoria y velocidad y facilidad de implementacion.

## Comparativa de Algoritmos

| Algoritmo | Mejor Caso | Caso Promedio | Peor Caso | Espacio |
| :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) |

## Escenarios de Rendimiento

No siempre el algoritmo con mejor complejidad promedio es la mejor opcion. Considera estos escenarios:

1.  **Arreglo Casi Ordenado**: *Insertion Sort* es extremadamente eficiente aqui (casi O(n)).
2.  **Muchos Duplicados**: Algunos algoritmos de particionamiento en *Quick Sort* pueden degradarse si no se manejan bien los repetidos.
3.  **Memoria Limitada**: *Quick Sort* u *Heap Sort* son preferibles sobre *Merge Sort* porque este ultimo requiere memoria extra para el mezclado.

---

## Retos de Programacion

### 1. Implementacion de Algoritmos
Completa los metodos en `SortAlgorithms.java`:
-   `bubbleSort`: El mas simple, basado en intercambios adyacentes.
-   `insertionSort`: Util para listas pequeñas o casi ordenadas.
-   `mergeSort`: Algoritmo estable de tipo Divide y Venceras.
-   `quickSort`: El mas rapido en la practica para la mayoria de los casos.

### 2. Analisis de Escenarios
En `AnalisisSorting.java`, implementaremos un pequeño banco de pruebas para ver como se comportan estos algoritmos ante:
-   Un arreglo en orden inverso (peor caso para muchos).
-   Un arreglo con el 90% de elementos iguales.
-   Un arreglo totalmente aleatorio.

### Pruebas
Ejecuta:
```bash
bazel test //sorting:SortTest
```

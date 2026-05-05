# Árboles Binarios de Búsqueda (BST)

Un **Binary Search Tree** es una estructura de datos jerárquica donde cada nodo tiene, como máximo, dos hijos. La propiedad clave es que para cualquier nodo, todos los elementos en el subárbol izquierdo son menores y todos los elementos en el subárbol derecho son mayores.

## Conceptos Clave

1.  **Inserción**: Se compara el valor con la raíz. Si es menor, se va a la izquierda; si es mayor, a la derecha. Se repite hasta encontrar un espacio vacío (`null`).
2.  **Búsqueda**: Similar a la inserción, permite encontrar un elemento en tiempo O(log n) si el árbol está balanceado.
3.  **Recorridos**:
    -   **Inorden**: (Izquierda, Raíz, Derecha). Produce una lista ordenada de los elementos.
    -   **Preorden**: (Raíz, Izquierda, Derecha). Útil para copiar el árbol.
    -   **Postorden**: (Izquierda, Derecha, Raíz). Útil para eliminar nodos o calcular el tamaño.

---

## Retos de Programación

### 1. Métodos Básicos
En `ArbolBinarioBusqueda.java`, completa la lógica de:
-   `insertar`: Agrega un nuevo valor manteniendo la propiedad del BST.
-   `contiene`: Verifica si un valor existe en el árbol.
-   `obtenerAltura`: Calcula la profundidad máxima.

### 2. Contar Hojas (NUEVO)
Implementa el método `contarHojas()`. Un nodo es una **hoja** si no tiene hijos (izquierdo y derecho son `null`).

### 3. Validación
Usa `esBST()` para verificar si un árbol binario cualquiera cumple con las reglas de orden de un BST.

### Pruebas
Ejecuta:
```bash
bazel test //arboles:ArbolBinarioBusquedaTest
```

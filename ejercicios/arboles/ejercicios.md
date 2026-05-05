# Binary Search Trees (BST)

Un **Binary Search Tree** es una estructura de datos jerarquica donde cada nodo tiene, como maximo, dos hijos. La propiedad clave es que para cualquier nodo, todos los elementos en el subarbol izquierdo son menores y todos los elementos en el subarbol derecho son mayores.

## Conceptos Clave

1.  **Inserción**: Se compara el valor con la raiz. Si es menor, se va a la izquierda; si es mayor, a la derecha. Se repite hasta encontrar un espacio vacío (`null`).
2.  **Búsqueda**: Parecido a insertar, permite encontrar un valor en tiempo O(log n) si el arbol esta balanceado.
3.  **Recorridos**:
    -   **Inorden**: (Izquierda, Raiz, Derecha). Produce una lista ordenada de los elementos.
    -   **Preorden**: (Raiz, Izquierda, Derecha). Util para copiar el arbol.
    -   **Postorden**: (Izquierda, Derecha, Raiz). Util para eliminar nodos o calcular el tamaño.

---

## Retos de Programacion

### 1. Implementacion
En `ArbolBinarioBusqueda.java`, completa la logica de:
-   `insertar`: Agrega un nuevo valor manteniendo la propiedad del BST.
-   `contiene`: Verifica si un valor existe en el arbol.
-   `obtenerAltura`: Calcula la profundidad máxima.

### 2. Contar Hojas
Implementa el método `contarHojas()`. Un nodo es una **hoja** si no tiene hijos (izquierdo y derecho son `null`).

### 3. Validacion
Usa `esBST()` para verificar si un árbol binario cualquiera cumple con las reglas de orden de un BST.

### Pruebas
Ejecuta:
```bash
bazel test //arboles:ArbolBinarioBusquedaTest
```

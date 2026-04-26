# Binary Search Trees (BST)

Un **Binary Search Tree** es una estructura de datos jerarquica donde cada nodo tiene, como maximo, dos hijos. La propiedad clave es que para cualquier nodo, todos los elementos en el subarbol izquierdo son menores y todos los elementos en el subarbol derecho son mayores.

## Ejercicios propuestos

**Ejercicio 1.**\
Dada la secuencia de insercion: `50, 30, 70, 20, 40, 60, 80`.
Dibuja el arbol binario resultante.

**Ejercicio 2.**\
Describe la diferencia entre un recorrido **Inorden**, **Preorden** y **Postorden**. 

---

## Reto de Programación

En la clase `ArbolBinarioBusqueda.java`, se han incluido dos métodos especiales como reto:

1.  **`obtenerAltura()`**: Calcula la profundidad máxima del árbol de forma recursiva.
2.  **`esBST()`**: Verifica si un árbol binario cumple con la propiedad de orden de un BST en todos sus nodos.

Puedes ejecutar las pruebas para validar tu lógica:
```bash
bazel test //arboles:ArbolBinarioBusquedaTest
```

# 🕸️ Gráficas

Las **Gráficas** son estructuras de datos que representan relaciones (aristas) entre un conjunto de objetos (vértices). A diferencia de los árboles, las gráficas pueden tener ciclos y múltiples conexiones entre nodos.

## Ejercicios propuestos

**Ejercicio 1.**\
Explica la diferencia entre una **Matriz de Adyacencia** y una **Lista de Adyacencia**. ¿Cuándo es mejor usar una sobre la otra?

**Ejercicio 2.**\
Define qué es un **Grafo Dirigido** y un **Grafo No Dirigido**. 

**Ejercicio 3.**\
Dada la siguiente conexión de nodos en un grafo no dirigido:
- A conecta con B y C
- B conecta con D
- C conecta con D

¿Cuál sería el orden de visita si empezamos en **A** usando **BFS**? ¿Y usando **DFS**?

---

## Reto de Programación

En `Grafo.java` se ha implementado el grafo mediante una **Lista de Adyacencia** usando un `Map` de Java.

Retos:
1.  **Recorrido BFS**: Explora los nodos nivel por nivel.
2.  **Recorrido DFS**: Explora lo más profundo posible antes de retroceder (implementado de forma recursiva).

Intenta ejecutar las pruebas:
```bash
bazel test //graficas:GrafoTest
```

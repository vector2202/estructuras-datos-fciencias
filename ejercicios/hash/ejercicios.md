# Tablas Hash

Las **Tablas Hash** son estructuras que permiten almacenar pares clave-valor proporcionando una busqueda, insercion y eliminacion extremadamente rapida, idealmente con una complejidad promedio de **O(1)**.

## ¿Cómo funcionan?

1.  **Función Hash**: Convierte una clave (como un String o un Objeto) en un índice entero.
2.  **Manejo de Colisiones**: Cuando dos claves distintas generan el mismo índice, se debe resolver el conflicto.
    -   **Encadenamiento (Chaining)**: Cada cubeta (bucket) tiene una lista de elementos.
    -   **Direccionamiento Abierto**: Se busca otra cubeta libre en la tabla.

## Ejercicios de Comprensión

**Ejercicio 1.**\
¿Qué es una **colision** en una tabla hash y por que ocurre? Explica el concepto de "Factor de Carga" (`load factor`).

**Ejercicio 2.**\
Si usamos una tabla hash de tamaño 10 y nuestra función hash es `h(k) = k % 10`, ¿dónde se insertarían las claves 12, 22 y 32? ¿Qué técnica de resolución de colisiones preferirías en este caso?

---

## Retos de Programación

### 1. Implementación Básica
Completa los métodos `put`, `get` y `remove` en `TablaHash.java`. Asegúrate de manejar correctamente las colisiones usando la lista ligada proporcionada en cada cubeta.

### 2. Aplicaciones Prácticas (NUEVO)
En el archivo `EjerciciosHash.java`, resuelve los siguientes problemas:

-   **Frecuencia de Caracteres**: Dado un String, cuenta cuántas veces aparece cada carácter.
-   **Primer Carácter No Repetido**: Encuentra el primer carácter de una cadena que no se repite en ninguna otra posición.

### Pruebas
Puedes ejecutar las pruebas para validar tu lógica:
```bash
bazel test //hash:TablaHashTest
bazel test //hash:EjerciciosHashTest
```

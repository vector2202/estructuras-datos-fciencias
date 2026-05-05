# Repositorio de Material Didáctico: Estructuras de Datos
**Universidad Nacional Autónoma de México - Facultad de Ciencias**

Este repositorio contiene los materiales didácticos, simuladores interactivos, códigos de prueba y notas teóricas desarrollados como parte del proyecto de **Servicio Social** para apoyar el proceso de enseñanza-aprendizaje de la unidad de aprendizaje de Estructuras de Datos.

## Estructura del Proyecto

El repositorio está organizado en las siguientes carpetas principales:

- **`proyectos/`**: Simuladores web interactivos (HTML/CSS/JS) para visualizar las estructuras de datos y algoritmos.
- **`notas/`**: Apuntes teóricos detallados en formato `.org` y `.md` y `.tex` divididos por unidades temáticas.
- **`ejercicios/`**: Implementaciones en Java de las estructuras de datos y pruebas unitarias (unit tests) utilizando el sistema de compilación **Bazel**.
- **`docs/`**: Contiene la documentación fundamental del servicio social, incluyendo el Informe Final.

## Como utilizar este material

### 1. Simuladores Interactivos
Para ejecutar los proyectos web, abre tu terminal, navega a la carpeta de proyectos y levanta un servidor de Python:

```bash
cd proyectos
python3 -m http.server 8000
```
Una vez que el servidor esté en ejecución, abre tu navegador y entra a: [http://localhost:8000/](http://localhost:8000/). Desde este menú podrás navegar por los visualizadores de Listas, Pilas, Colas, Árboles, Hash, Gráficas, y Algoritmos.

### 2. Pruebas Unitarias de Estructuras (Ejercicios)
El código de Java se encuentra orquestado con el build system Bazel. Para correr todas las pruebas integradas y validar las estructuras:

```bash
cd ejercicios
bazel test //...
```
*(Es necesario tener Bazel instalado en tu equipo).*

### 3. Notas Teóricas
Las notas se encuentran divididas en sus respectivos directorios bajo la carpeta `notas/`. Puedes abrir los archivos `.org` (compatibles con Emacs/Org-Mode) o los generados en sintaxis Markdown (`.md`) para apoyar tus métodos de estudio.

## Temario Cubierto
- Complejidad algorítmica
- Arreglos y Tipos de Datos Abstractos (TDA)
- Estructuras lineales: Listas, Pilas y Colas
- Estructuras no lineales: Árboles, Árboles Binarios (de Búsqueda, AVL, Rojinegros), Heaps, Tablas Hash y Gráficas
- Algoritmos de Búsqueda y Ordenamiento

---
*Desarrollado y mantenido por Victor Federico Torres Trejo.*

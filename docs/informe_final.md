# INFORME FINAL DE SERVICIO SOCIAL

**Desarrollo de Material Didáctico y Simuladores Interactivos para Estructuras de Datos y Algoritmos**

---

## FICHA DE IDENTIFICACIÓN DEL PROYECTO

| Campo | Detalles del Registro Académico |
| :--- | :--- |
| **Alumno:** | Victor Federico Torres Trejo |
| **No. de Cuenta:** | 422090690 |
| **Licenciatura:** | Ciencias de la Computación |
| **Institución / Facultad:** | Facultad de Ciencias, Universidad Nacional Autónoma de México |
| **Programa de Servicio Social:** | Apoyo al Personal Docente mediante la Elaboración de Material Didáctico |
| **Profesor Responsable:** | Pedro Ulises Cervantes |
| **Periodo de Realización:** | 28 de Noviembre de 2025 – 15 de Junio de 2026 |
| **Horas Totales Reportadas:** | 480 Horas |
| **Repositorio Digital:** | https://github.com/vector2202/estructuras-datos-fciencias |

---

## ÍNDICE GENERAL

1. [Resumen Ejecutivo / Abstract](#1-resumen-ejecutivo--abstract)
2. [Introducción y Justificación Académica](#2-introducción-y-justificación-académica)
3. [Objetivos del Proyecto](#3-objetivos-del-proyecto)
   * 3.1 [Objetivo General](#31-objetivo-general)
   * 3.2 [Objetivos Específicos](#32-objetivos-específicos)
4. [Diagnóstico Pedagógico y Marco Referencial](#4-diagnóstico-pedagógico-y-marco-referencial)
5. [Arquitectura Tecnológica del Proyecto](#5-arquitectura-tecnológica-del-proyecto)
   * 5.1 [Eje Teórico (Org-mode y LaTeX)](#51-eje-teórico-org-mode-y-latex)
   * 5.2 [Eje Visual (Simuladores Web Interactivos Vanilla)](#52-eje-visual-simuladores-web-interactivos-vanilla)
   * 5.3 [Eje Práctico (Laboratorios en Java y Compilación Hermética con Bazel)](#53-eje-práctico-laboratorios-en-java-y-compilación-hermética-con-bazel)
6. [Desarrollo Cronológico de Actividades (Bitácora Mensual)](#6-desarrollo-cronológico-de-actividades-bitácora-mensual)
7. [Resultados Obtenidos y Evidencia del Trabajo](#7-resultados-obtenidos-y-evidencia-del-trabajo)
   * 7.1 [Catálogo de Notas Didácticas (`/notas`)](#71-catálogo-de-notas-didácticas-notas)
   * 7.2 [Catálogo de Ejercicios y Casos de Prueba (`/ejercicios`)](#72-catálogo-de-ejercicios-y-casos-de-prueba-ejercicios)
   * 7.3 [Catálogo de Simuladores Visuales (`/proyectos`)](#73-catálogo-de-simuladores-visuales-proyectos)
8. [Pruebas de Calidad, Validación e Integración](#8-pruebas-de-calidad-validación-e-integración)
9. [Retos Técnicos, Experiencia Formativa y Autoaprendizaje](#9-retos-técnicos-experiencia-formativa-y-autoaprendizaje)
10. [Conclusiones y Recomendaciones Pedagógicas](#10-conclusiones-y-recommendaciones-pedagógicas)
11. [Referencias Bibliográficas](#11-referencias-bibliográficas)

---

## 1. Resumen Ejecutivo / Abstract

El estudio de las estructuras de datos y los distintos algoritmos tanto de las estructuras de datos como de otro estilo como ordenamiento, búsqueda, representan una parte fundamental en la formación de cualquier estudiante de Ciencias de la Computación. Aún así el pasar de los conceptos matemáticos abstractos como lo es un TDA, complejidades asintóticas, balanceo de árboles, a una implementación ya práctica suele ser una barrera muy fuerte para el estudiante universitario, puesto que hay conceptos que dificultan esta implementación de la teoría a la práctica.

Este proyecto de Servicio Social consiste en el diseño, desarrollo e integración de una serie de recursos didácticos, de código abierto. A través de distintos ejes desarrollados a lo largo de este proyecto, los cuales consisten en apuntes teóricos rigurosos, ejercicios prácticos programados en `Java` el cual es el lenguaje de programación usado a lo largo de la materia de estructuras de datos en la Facultad de Ciencias, bajo un robusto motor de compilación llamado `Bazel` el cual es desarrollado e utilizado por Google, y por último simuladores web dinámicos desarrollados con tecnologías puras (`HTML5/CSS3/JS`) se estructuró un repositorio de libre acceso para apoyar al personal docente de la facultad de ciencias de la UNAM. EL proyecto se completó conforme al cronograma establecido inicial de 480 horas, entregando un repositorio educativo interactivo, con tecnologías modernas y de código abierto y libre acceso para la comunidad académica.

---

## 2. Introducción y Justificación Académica

En el estudio de las ciencias de la computación, a menudo, la teoría y la práctica suelen sufrir una brecha constante generada por la gran abstracción de los conceptos matemáticos que a la hora de la implementación no resultan ser tan claros como lo es en la teoría. Los textos académicos por lo regular abordan estas estructuras de datos con un alto nivel de abstracción matemática, mientras que en las prácticas realizadas en los laboratorios es más implementación técnica y funcionalidad del código.

Este proyecto se justifica por la necesidad de contar con herramientas didácticas modernas, que ayuden al aprendizaje activo del alumno. El poder visualizar cómo se restructuran los punteros ante cualquier modificación en las distintas estructuras de datos, cómo se rotan los árboles balanceados al ser modificados, cómo se dividen las llamadas a los algoritmos recursivos, todo esto ayuda a que los ayudantes pasen de la intuición algorítmica a la implementación formal de las estructuras de datos y sus algoritmos de una manera más sencilla y sin tantas complicaciones.

Al estructurar todos estos recursos en este repositorio, se busca ayudar al docente con herramientas visuales robustas para sesiones síncronas de clases, y se busca ayudar a los alumnos con trabajo asíncrono con los ejercicios, que al incluir pruebas unitarias se busca que ellos no dependan de un profesor que verifique su solución.

---

## 3. Objetivos del Proyecto

### 3.1 Objetivo General

El objetivo de este proyecto de servicio social es el apoyar a los docentes de la Facultad de Ciencias de la UNAM con recursos didácticos modernos para la unidad de aprendizaje de estructuras de datos y algoritmos. Esto mediante la elaboración de material teórico riguroso, simuladores interactivos de código abierto, fortaleciendo así el proceso de aprendizaje en temas claves de algoritmos, análisis de complejidad y estructuras de datos.

### 3.2 Objetivos Específicos
1. **Investigar y Diseñar:** Analizar el plan de estudio de la unidad de aprendizaje de estructura de datos para definir los temas prioritarios y definir los requerimentos a cubrir.
2. **Desarrollar Contenido Teórico:** Escribir notas teóricas estructuradas con definciones formales, con ejemplos claros y casos de uso.
3. **Programar Simuladores Interactivos:** Diseñar y crear simuladores visuales dinámicos basados en tecnologías web, que permitan interactuar con la lógica de las estructuras de datos sin necesidad de configuraciones previas complejas.
4. **Construir Laboratorios Prácticos:** Diseñar e implementar ejercicios de programación en Java, utilizando un sistema de construcción industrial como Bazel para asegurar la reproducibilidad y el testing automatizado de las soluciones de los estudiantes.
5. **Consolidar e Integrar:** Estructurar el repositorio de manera ordenada y documentada.

---

## 4. Marco Referencial

El enseñar estructuras de datos y algoritmos a nivel universitario representa un reto único, ya que requiere que el alumno comprenda conceptos abstractos y matemáticos, los lleve a la implementación y la comprensión de estos temas determinará en gran parte la comprensión de otras unidades de aprendizaje. Es decir alumnos que tengan una buena base de estructura de datos se desempeñarán de mejor manera en unidades posteriores de la licenciatura. Es por ello que clases teóricas a veces necesitan de apoyo práctico y visual. Algunos temas que se observa que representan un reto para los alumnos son:

* **Invisibilidad de la Memoria Dinámica:** La asignación y liberación de memoria física, la manipulación de referencias y el comportamiento del recolector de basura son conceptos abstractos difíciles de mentalizar. Los alumnos suelen cometer errores lógicos debido a la falta de un modelo mental claro de la memoria.
* **Retroalimentación Asíncrona Deficiente:** En los laboratorios de la facultad, los estudiantes escriben soluciones de código y deben esperar a que se les proporcione retroalimentación formal. Sin pruebas unitarias locales, los estudiantes carecen de una retroalimentación inmediata sobre la correctitud de su código en casos que suelen romper el código y el alumno suele tardar en identificar.

La integración de **visualizadores interactivos en tiempo real** y **ejercicios con pruebas unitarias locales** ayuda a resolver estos retos. La interacción con un simulador interactivo ayuda a comprender los enlaces y punteros y operaciones estructurales necesarias. Mientras que un entorno como Bazel, provee la retroalimentación con solo correr un comando.

---

## 5. Arquitectura del Proyecto

Se propuso la siguiente arquitectura de desarrollo basada en tres distintas secciones:

### 5.1 Eje Teórico
La documentación teórica no debe depender de qué editor o lector de textos se utilice. Se usó `org-mode` (Emacs) debido a su excelente manejo de texto plano estruturado, su capacidad nativa para integrar bloques de código interactivos y su perfecta conversión a sistemas tipográficos científicos con `LaTeX`. Esto permite una flexibilidad de generar a partir de estos archivos distintos archivos (pdf, latex, html) según se requiera.

### 5.2 Eje Visual

El desarrollo de los simuladores visuales se hizo basándose en las tecnologías web (HTML5, CSS3 y JavaScript). Se buscó evitar el uso frameworks pesados (como React, Angular o Vue).
* **Justificación Técnica:** Los proyectos basados en frameworks web modernos requieren un proceso de construcción y mantenimiento complejo, y debido a que el propósito de este proyecto es facilitar el uso e instalación al estudiante, se evitó su uso. Al utilizar tecnologías nativas del navegador, se asegura que los simuladores puedan ejecutarse en cualquier sistema solamente abriendo el archivo `index.html` en el navegador, o levantando un servidor web básico con `python3 -m http.server`. Esto garantiza un uso simple para el estudiante y durabilidad del material.

### 5.3 Eje Práctico
Para el desarrollo y evaluación del código práctico se eligió **Java**, debido a que es el lenguaje utilizado por la unidad de aprendizaje. Java permite la manipulación de referencias, lo que es muy importante para la comprensión de las estructuras de datos. Para eliminar los problemas comunes de classpath e incompatibilidades de compilación en las distintas máquinas de los estudiantes, se integró **Google Bazel**.
* **Justificación Técnica:** Bazel proporciona una compilación hermética y reproducible mediante la especificación explícita de entradas y salidas en archivos `BUILD`. El uso de pruebas unitarias parametrizadas con JUnit permite una metodología de auto-evaluación donde el docente proporciona esqueletos de código (`// TODO`) y el estudiante valida su implementación local de forma determinista mediante el comando `bazel test //...`. Adicionalmente se considera que el uso de estas tecnologías pueden beneficiar al alumno a familiarizarse con herramientas profesionales de la industria.

---

## 6. Desarrollo Cronológico de Actividades

A continuación, se presenta el informe cronológico de las actividades ejecutadas durante la prestación del Servicio Social:

### Fase 1: Planeación General, Investigación y Diseño de Estructura (28 nov – 31 dic 2025)
* **Actividades Ejecutadas:**
  * Análisis del plan de estudios y material disponible de la unidad de aprendizaje de Estructuras de Datos y Algoritmos.
  * Definición de la estructura de directorios del repositorio git y selección del stack tecnológico.
  * Planteamiento del flujo de trabajo hermético para Java (configuración de Bazel en la raíz del proyecto).
* **Entregables:** Estructura inicial del repositorio organizada en carpetas (`/notas`, `/ejercicios`, `/proyectos`, `/docs`), y archivos de configuración del espacio de trabajo base `MODULE.bazel`, `.gitignore` y el `README.md` de bienvenida y especificaciones del proyecto.

Durante este periodo inicial, el reto principal consistió en concebir un esquema de archivos que fuera intuitivo para alumnos novatos pero técnicamente riguroso. Se optó por una división limpia de tres áreas fundamentales: teoría (`/notas`), práctica dirigida (`/ejercicios`) y visualización interactiva (`/proyectos`). La planeación incluyó la investigación profunda sobre sistemas de construcción, eligiendo a Bazel por su habilidad para descargar y cachear herramientas de compilación de forma transparente, aislando al estudiante de tener que instalar compiladores JDK específicos de manera local.

---

### Fase 2: Desarrollo del Material de Estructuras Lineales (1 ene – 31 ene 2026)
* **Actividades Ejecutadas:**
  * Redacción de apuntes teóricos detallados sobre estructuras de datos lineales las cuales son: Arreglos, Listas (simplemente ligadas, doblemente ligadas, circulares), Pilas y Colas.
  * Programación de los esqueletos de código en Java y definición de baterías de pruebas unitarias robustas en `/ejercicios` para cada estructura lineal.
* **Entregables:** 
  * Notas académicas en Org-mode para la introducción a la complejidad y estructuras lineales en `/notas/01_complejidad_algoritmica`, `/notas/02_tda`, `/notas/03_arreglos`, `/notas/04_listas/notas.org`, `/notas/05_pilas` y `/notas/06_colas`.
  * Laboratorios prácticos programados en Java con aserciones JUnit listas para autoevaluación en `/ejercicios/listas/`, `/ejercicios/pilas/` y `/ejercicios/colas/` junto con sus respectivos archivos de compilación `BUILD`.

En esta fase, los conceptos teóricos desarrollados fueron centrados en detallar los costos temporales de operaciones elementales. Para los ejercicios hechos en java se diseñaron pruebas unitarias usando JUnit cubriendo incluso casos extremos, forzando así al alumno a programar con robustez sus soluciones

---

### Fase 3: Diseño y Programación de Simuladores Lineales (1 feb – 29 feb 2026)
* **Actividades Ejecutadas:**
  * Diseño visual e implementación interactiva con JavaScript del visualizador de Listas y Arreglos dinámicos permitiendo operaciones dinámicas con animaciones CSS.
  * Creación de simuladores FIFO/LIFO dinámicos para representar el comportamiento de Pilas y Colas.
  * Integración de una base de estilos global (`global.css`) para dotar de una identidad visual premium y unificada a todos los simuladores.
* **Entregables:**
  * Simuladores web operacionales en `/proyectos/03_arreglos` (Simulador de Arreglos dinámicos), `/proyectos/04_listas` (Lista Doblemente Enlazada animada), `/proyectos/05_pilas` (Simulador de Pila) y `/proyectos/06_colas` (Simulador de Cola).
  * Carpeta de demostración rápida en `/proyectos/ejemplos_estructuras_lineales` y el sistema de diseño centralizado e identidades CSS visuales en `/proyectos/global.css` y `/proyectos/styles.css`.

El reto técnico más grande de esta fase fue sincronizar las animaciones del frontend con el estado interno de la estructura. Utilizando JavaScript moderno, se implementó un motor de animación asíncrono, junto con transiciones CSS controladas por clases. Esto permitió que al dar clic en "insertar nodo", el usuario pueda ver el nacimiento físico del nodo en pantalla, la animación del recorrido del puntero temporal buscando la posición, y la re-conexión física de las flechas de enlace en tiempo real, facilitando la comprensión intuitiva de la complejidad `O(N)` frente a `O(1)`.

---

### Fase 4: Teoría y Práctica de Estructuras No Lineales (1 mar – 31 mar 2026)
* **Actividades Ejecutadas:**
  * Redacción de las guías didácticas teóricas sobre Estructuras Jerárquicas y No Lineales: Árboles Binarios de Búsqueda (BST), Árboles Auto-balanceados (AVL, Rojinegros), Heaps, Tablas Hash y Gráficas.
  * Diseño de ejercicios prácticos retadores para Árboles y Hash Tables en Java.
  * Programación del simulador interactivo de Árboles y recorridos en preorden, inorden y postorden, así como simuladores de tablas hash, heaps y gráficas.
* **Entregables:**
  * Guías didácticas teóricas completas en `/notas/07_arboles`, `/notas/08_heaps`, `/notas/09_hash` y `/notas/10_graficas`.
  * Simuladores web e interactivos funcionales en `/proyectos/07_arboles` (recorrido de árboles binarios), `/proyectos/08_heaps` (visualización de montículos), `/proyectos/09_hash` (simulador de indexación y colisiones) y `/proyectos/10_graficas` (visualización de nodos y conexiones de grafos).
  * Laboratorios y pruebas unitarias complejas en `/ejercicios/arboles/`, `/ejercicios/hash/` y `/ejercicios/graficas/`.

Al migrar a estructuras no lineales, el grado de abstracción se incrementó. Para el simulador web de árboles binarios, se implementó una representación visual autogestionada mediante un algoritmo de distribución espacial que recalcula las coordenadas `(X, Y)` de los nodos secundarios dinámicamente al insertar o eliminar elementos. El simulador permite activar los recorridos (Preorden, Inorden, Postorden), iluminando progresivamente los nodos visitados para que el estudiante comprenda el flujo de la pila recursiva.

---

### Fase 5: Algoritmos de Búsqueda, Ordenamiento y Backtracking (1 abr – 30 abr 2026)
* **Actividades Ejecutadas:**
  * Desarrollo de la guía teórica y ejemplos prácticos de Análisis de Complejidad Temporal (notaciones Big-O, Big-Omega, Big-Theta).
  * Elaboración de simuladores dinámicos para visualizar algoritmos clásicos de ordenamiento (Bubble Sort, Insertion Sort, Quick Sort, Merge Sort) y algoritmos de búsqueda lineal y binaria.
  * Creación de un simulador específico altamente pedagógico para ilustrar la técnica de *Backtracking* (árboles de decisión en reversa).
* **Entregables:**
  * Apuntes teóricos dedicados en `/notas/11_ordenamientos`.
  * Simulador web de análisis en `/proyectos/01_complejidad_algoritmica` (visualizador interactivo de crecimiento de funciones y notación asintótica).
  * Simulador de backtracking y árboles recursivos en `/proyectos/simulador_backtracking/` junto con los visualizadores dinámicos integrados en el dashboard principal para algoritmos de ordenamiento lineal y binario.
  * Laboratorios prácticos estructurados en Java en `/ejercicios/sorting/` (Quick Sort, Merge Sort, etc.) y `/ejercicios/busqueda/` (Búsqueda Binaria/Lineal).

Esta fase se centró en la algoritmia y la eficiencia. El simulador de ordenamientos permite comparar visualmente la diferencia radical entre algoritmos cuadráticos (`O(N^2)`) y logarítmicos (`O(N log N)`) controlando la velocidad de reproducción de las barras de tamaño. Adicionalmente, el simulador de *Backtracking* resuelve dinámicamente problemas de ramificación y poda (como el laberinto o el problema de las N-Reinas), graficando al vuelo el árbol de llamadas de la recursión y coloreando de rojo los caminos fallidos antes de hacer un *rollback* visual, materializando un concepto comúnmente complejo de asimilar.

---

### Fase 6: Integración Final, Control de Calidad y Documentación (1 may – 15 jun 2026)
* **Actividades Ejecutadas:**
  * Unificación estética de todos los simuladores interactivos bajo una interfaz web global responsiva y atractiva.
  * Auditoría completa del código del repositorio, verificando que todos los casos de prueba compilen y corran exitosamente mediante comandos globales de Bazel (`bazel test //...`).
  * Redacción final de los manuales de usuario de las herramientas en sus respectivos archivos README y estructuración de este informe final.
* **Entregables:**
  * Dashboard unificado y responsivo en `/proyectos/index.html` que integra el acceso centralizado a los 11 simuladores.
  * Limpieza absoluta de la compilación y aprobación de pruebas de cobertura en `/ejercicios/` certificada mediante la suite Bazel.
  * Manuales e instrucciones didácticas en los READMEs de cada módulo y este documento final `/docs/informe_final.md` completado y listo para conversión a PDF.

Durante esta última fase, se realizó una revisión de código exhaustiva para limpiar advertencias de compilación y optimizar la accesibilidad de la página principal del proyecto así como revisar la legibilidad de los códigos. Se unificaron los estilos usando variables de CSS para soportar un modo oscuro nativo muy cómodo para el estudio nocturno de los alumnos. El éxito de la suite de pruebas unitarias ejecutadas a través de Bazel validó la integridad lógica del repositorio, entregando un producto docente listo para su implementación inmediata en el aula.

---

## 7. Resultados Obtenidos y Evidencia del Trabajo

El trabajo desarrollado se encuentra distribuido de manera ordenada y documentado en tres carpetas principales dentro del repositorio. A continuación se detallan los recursos entregados:

### 7.1 Catálogo de Notas Didácticas (`/notas`)
Se estructuró un conjunto de guías didácticas que abarcan el 100% de los temas críticos del temario oficial:
1. `01_complejidad_algoritmica`: Fundamento matemático y notación asintótica.
2. `02_tda`: Concepto teórico de Tipo de Dato Abstracto y encapsulamiento.
3. `03_arreglos`: Vectores estáticos y gestión física de memoria.
4. `04_listas`: Punteros y variantes de encadenamiento dinámico.
5. `05_pilas` y `06_colas`: Restricciones estructurales LIFO/FIFO.
6. `07_arboles`, `08_heaps` y `09_hash`: Estructuras no lineales y direccionamiento.
7. `10_graficas` y `11_ordenamientos`: Representaciones, recorridos (DFS/BFS) y ordenación.

### 7.2 Catálogo de Ejercicios y Casos de Prueba (`/ejercicios`)
Ejercicios estructurados en Java con arquitectura Bazel para evaluación automatizada:
* **/listas, /pilas, /colas**: Pruebas con JUnit para que los alumnos completen la lógica de inserción, borrado e iteración.
* **/sorting**: Laboratorios prácticos para implementar ordenamientos eficientes y de fuerza bruta y validar su corrección matemática de forma automatizada.

### 7.3 Catálogo de Simuladores Visuales (`/proyectos`)

Las aplicaciones web interactivas fueron desarrolladas con un diseño moderno, intuitivo y unificado bajo estilos consistentes que garantizan una experiencia responsiva. A continuación, se presenta la galería de evidencias de los simuladores completamente operativos y sus respectivos casos de uso implementados para facilitar el aprendizaje de los alumnos:

#### A) Análisis de Complejidades Asintóticas y Costos Temporales
* **Recursos en `/proyectos/01_complejidad_algoritmica`:** Simulador interactivo que permite graficar y comparar las tasas de crecimiento de las funciones de complejidad temporal de algoritmos tradicionales (logarítmica, lineal, lineal-logarítmica, cuadrática, exponencial).
  
  ![Crecimiento de Funciones y Notación Big-O](imagenes/simulador_complejidades.png)
  
  ![Tabla Comparativa de Costos Computacionales](imagenes/simulador_costos_comp.png)

#### B) Simulador de Arreglos y Vectores Dinámicos
* **Recursos en `/proyectos/03_arreglos`:** Visualización paso a paso de la asignación contigua de memoria, el acceso indexado en tiempo constante y el costo computacional de realizar corrimientos físicos en inserciones o eliminaciones intermedias.
  
  ![Simulador General de Arreglos](imagenes/simulador_arreglos.png)
  
  ![Casos de Uso y Escenarios en Vectores Dinámicos](imagenes/simulador_casos_uso_arreglo.png)

#### C) Simuladores de Estructuras de Datos Lineales (Listas, Pilas y Colas)
* **Listas Enlazadas en `/proyectos/04_listas`:** Representación animada en tiempo real de la manipulación y enlace dinámico de nodos simples, dobles y circulares.
  
  ![Simulador de Lista Simplemente Ligada](imagenes/simulador_listas_simple.png)
  
  ![Simulador de Lista Doblemente Ligada](imagenes/simulador_listas_doble.png)
  
  ![Simulador de Lista Circular](imagenes/simulador_listas_circular.png)
  
  ![Casos de Uso e Inserciones de Nodos en Listas](imagenes/simulador_casos_uso_listas.png)

* **Pilas y Colas en `/proyectos/05_pilas` y `/proyectos/06_colas`:** Simuladores dedicados a mostrar el comportamiento físico e interno de las políticas LIFO (`push`/`pop`) y FIFO (`enqueue`/`dequeue`), incluyendo el comportamiento circular en memoria fija.
  
  ![Simulador de Pilas LIFO](imagenes/simulador_pilas.png)
  
  ![Simulador de Cola Simple FIFO](imagenes/simulador_cola_simple.png)
  
  ![Simulador de Cola Circular](imagenes/simulador_cola_circular.png)
  
  ![Casos de Uso del Comportamiento en Pilas](imagenes/simulador_casos_uso_pilas.png)
  
  ![Casos de Uso del Comportamiento en Colas](imagenes/simulador_casos_uso_colas.png)

#### D) Simuladores de Estructuras Jerárquicas y No Lineales (Árboles, Montículos y Tablas Hash)
* **Árboles Binarios en `/proyectos/07_arboles`:** Visualizador dinámico que autogestiona el espacio y distribución física de las hojas y ramas en pantalla, permitiendo interactuar con inserciones, eliminaciones, balanceos AVL y recorridos recursivos.
  
  ![Simulador de Árbol Binario de Búsqueda BST](imagenes/simulador_abb.png)
  
  ![Simulador de Árbol AVL Balanceado](imagenes/simulador_avl.png)

* **Montículos y Tablas Hash en `/proyectos/08_heaps` y `/proyectos/09_hash`:** Representaciones del orden de prioridad de un montículo y visualización física de la resolución de colisiones mediante encadenamiento o direccionamiento abierto.
  
  ![Visualizador de Heaps y Montículos de Prioridad](imagenes/simulador_heaps.png)
  
  ![Simulador de Tabla Hash y Manejo de Colisiones](imagenes/simulador_hash.png)

#### E) Visualizadores de Gráficas y Algoritmos de Caminos Mínimos
* **Gráficas en `/proyectos/10_graficas`:** Representación interactiva de vértices, conexiones dirigidas y ponderadas, y la ejecución paso a paso del recorrido de Dijkstra para encontrar el camino más corto.
  
  ![Visualizador de Gráficas y Vértices](imagenes/simulador_graficas.png)
  
  ![Simulación de Recorridos en Gráficas](imagenes/simulador_graficas_recorrido.png)
  
  ![Algoritmo de Dijkstra para Caminos Mínimos](imagenes/simulador_graficas_dijkstra.png)

#### F) Algoritmos de Búsqueda, Ordenamiento y Backtracking
* **Algoritmos de Ordenamiento y Búsqueda:** Representación visual interactiva mediante barras dinámicas de alturas que comparan el coste y la velocidad de los diferentes ordenamientos clásicos e ilustran las búsquedas lineales y binarias.
  
  ![Algoritmo de Ordenación en Estado Inicial](imagenes/simulador_sorting_before.png)
  
  ![Algoritmo de Ordenación Completado](imagenes/simulador_sorting_after.png)
  
  ![Simulación de Búsqueda en Estado Inicial](imagenes/simulador_searching_before.png)
  
  ![Simulación de Búsqueda con Elemento Encontrado](imagenes/simulador_searching_after.png)

* **Algoritmo de Backtracking:** Muestra de manera sumamente clara la generación de la pila de llamadas recursivas y el cómo el algoritmo de backtracking va explorando todas las posibilidades hasta encontrar una solución. En este caso en un laberinto.
  
  ![Simulador de Backtracking e Interfaz del Problema de N-Reinas](imagenes/simulador_backtracking.png)

---

## 8. Pruebas de Calidad, Validación e Integración

Para certificar la robustez de los ejercicios prácticos se implementó un flujo continuo de validación local mediante comandos nativos de Bazel:

```bash
# Comando ejecutado para validar todas las pruebas unitarias y garantizar 0 errores de compilación
bazel test //...
```

La suite de pruebas ejecuta decenas de aserciones lógicas que validan:
* La correcta gestión de punteros de las listas bajo condiciones extremas.
* El manejo estricto de excepciones lógicas (como desbordamiento o subdesbordamiento).
* La correctitud de los algoritmos de ordenación.

![Ejecución Exitosa de la Suite de Pruebas con Bazel](imagenes/bazel_command.png)

## 9. Retos Técnicos, Experiencia Formativa y Autoaprendizaje

El desarrollo de este Servicio Social representó una oportunidad invaluable de autoaprendizaje que sin duda complementó la educación que adquirí a lo largo de mi licenciatura. Entre los principales aprendizajes y retos superados destacan:

1. **Gestión Asíncrona en el Frontend:** Diseñar animaciones que se ejecutaran en paralelo con la lógica del algoritmo de estructuras de datos requirió un dominio avanzado del bucle de eventos (*event loop*) de JavaScript y del uso sistemático de `Promises` y funciones `async/await` para poder pausar la ejecución en puntos clave sin congelar la interfaz de usuario.
2. **Dominio de Sistemas de Construcción Modernos:** Estructurar proyectos Java utilizando Bazel obligó a comprender las bases de la compilación reproducible y hermética, conocimientos altamente cotizados en la industria del desarrollo de software de gran escala.
3. **Didáctica y Síntesis Pedagógica:** Traducir conceptos matemáticos abstractos a simulaciones visuales intuitivas y guías sencillas fortaleció de gran manera mis habilidades de comunicación y síntesis, permitiéndome aprender a diseñar software pensando siempre en la experiencia del usuario final (en este caso, estudiantes de semestres introductorios).
4. **Diseño de interfaces:** Durante mi licenciatura siempre evité trabajar con la interfaz de usuario, sin embargo este proyecto me permitió entender la importancia de un buen diseño de interfaz y cómo irla mejorando, debido a que el primer diseño tuvo mejoras considerables, en lo personal nunca había tenido que diseñar una interfaz con estéticas tan pulidas y con animaciones tan fluidas y también considero que al ser tantos simuladores, pude desarrollar mi habilidad para el diseño de interfaces de manera significativa.
---

## 10. Conclusiones

### Conclusiones del Proyecto
El proyecto de Servicio Social concluyó cumpliendo el 100% de las metas establecidas en el plan de trabajo. Se logró consolidar un repositorio digital funcional y accesible que unifica teoría, visualización interactiva y ejercicios prácticos autoevaluables. 

Las tecnologías elegidas garantizan que el material no quede obsoleto y pueda seguir siendo utilizado y extendido sin esfuerzo técnico por el personal docente y futuras generaciones de estudiantes de la Facultad de Ciencias de la UNAM.

En lo personal me gratifica mucho entregar este proyecto ya que considero que estructura de datos es una materia fundamental en la formación de un licenciado en ciencias de la computación, ya que el entender bien esta materia facilitó mi comprensión de las demás materias, además que en el ámbito laboral, especialmente en el que yo me desempeño, el cual es ingeniería de software, en las entrevistas el dominio de estructuras de datos y algortitmos es algo indispensable, pues las entrevistas se basan en resolución de problemas y análisis de complejidad, por lo que el poder contribuir y apoyar a la enseñanza de esta materia es algo que considero de gran aportación, además de mi gusto por estos temas, considero que puede ayudar a los alumnos a su mejor comprensión, a su implementación correcta y considero que esto puede ayudar a su formación universitaria y profesional.


### Recomendaciones de Uso para Futuras Generaciones
Para maximizar el aprovechamiento de este material, se recomienda al personal docente:
1. **Uso en el Aula:** Proyectar los simuladores interactivos durante las clases teóricas para ilustrar dinámicamente las operaciones de las estructuras de datos (como la rotación de árboles o los punteros de listas).
2. **Metodología de Programación Activa:** Adoptar los ejercicios en `/ejercicios` en sus laboratorios, solicitando a los estudiantes que escriban la lógica de programación necesaria para que la suite de pruebas unitarias locales pase con éxito (`bazel test //...`). Esto fomenta una disciplina de ingeniería de software temprana.
3. **Fomento a la Contribución:** Alentamos a los estudiantes destacados a contribuir en el repositorio añadiendo nuevos simuladores de estructuras más complejas (árboles B, grafos con algoritmos de Dijkstra o Prim) bajo el mismo estándar preestablecido.

---

## 11. Referencias Bibliográficas

1. **Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009).** *Introduction to Algorithms* (3rd ed.). MIT Press.
2. **Sedgewick, R., & Wayne, K. (2011).** *Algorithms* (4th ed.). Addison-Wesley.
3. **Flanagan, D. (2020).** *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.
4. **Google LLC. (2026).** *Bazel Build System Documentation*. https://bazel.build
5. **Dominicus, M., & Emacs Community. (2026).** *Org Mode Compact Guide*. https://orgmode.org

---

<br><br><br>

<div align="center">
  
_____________________________________  
**Victor Federico Torres Trejo**  
*Prestador de Servicio Social*

<br>

_____________________________________  
**Pedro Ulises Cervantes**  
*Docente Responsable*
  
</div>

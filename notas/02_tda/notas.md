
# Table of Contents

1.  [Definicion](#org82a3197)
2.  [Abstraccion y encapsulamiento](#orgfabe571)
3.  [Componentes](#org9754290)
    1.  [Conjunto de datos](#org67ebfef)
    2.  [Cojunto de operaciones](#orgccda775)
    3.  [Comportamiento esperado](#org4a2c752)
4.  [Importancia](#org3916f2e)
5.  [Como se conecta con EDD ?](#org1d8ebd5)



<a id="org82a3197"></a>

# Definicion

Un **Tipo de dato abstracto** (TDA) es un modelo teorico, el cual describe un conjunto de datos y las operaciones que se pueden realizar sobre ellos, no entramos en detall del como, sino solo el que operaciones.

El objetivo principal de un TDA es definir el comportamiento logico de una estructura de datos, estableciendo sus operaciones y sus resultados, independientemente de su implementacion. Esto representa una abstraccion, ya que oculta el como y solo present la interfaz.


<a id="orgfabe571"></a>

# Abstraccion y encapsulamiento

El concepto de TDA esta relacionado con los principios de abstraccion y encapsulamiento.

Mientras que la **abstraccion** nos permite centrarnos en el que hace, sin preocuparnos en el como lo hace.

El **encapsulamiento** oculta la implementacion interna y expone unicamente las operaciones definidas.

Gracias a esto quien hace uso de un TDA no tiene que conocer:

-   organizacion en memoria
-   uso de punteros o memoria fija
-   algoritmos utilizados

Este concepto de abstraccion es muy importante no solo en estructura de datos sino en cursos mas adelante asi como en software real, muchas veces nos vamos a encontrar con ciertas cosas donde vale mucho saber abstraer lo mas importante que es basicamente es el que hace y que necesitas para hacerlo, sin adentrar en el como lo hace. De igual manera si estamos del otro lado, que tambien vamos a estarlo, es importante tener en claro como se va a poder abstraer lo que desarrollamos para que usuarios los cuales no esten familiarizados con nuestras implementaciones o no tengan tanto conocimiento del tema puedan hacer uso de los desarrollos sin matarse la cabeza entendiendo como funciona.


<a id="org9754290"></a>

# Componentes

Todo TDA se define a partir de 3 componentes fundamentales:


<a id="org67ebfef"></a>

## Conjunto de datos

Describe el tipo de informacion que maneja un TDA, estos pueden ser como por ejemplo todos de un mismo tipo o algo mas complejo


<a id="orgccda775"></a>

## Cojunto de operaciones

Define que acciones se realizan sobre estos datos, se debe especificar:

-   nombre de la operacion
-   parametros de entrada
-   resultado esperado


<a id="org4a2c752"></a>

## Comportamiento esperado

Indica que debe ocurrir al ejecutar cada operacion, sin detallar el como.


<a id="org3916f2e"></a>

# Importancia

Porque es importante primero definir un TDA antes que ver la implementacion:

-   nos ayuda a separar como va a funcionar logicamente antes de ver como esta implementado
-   nos permite cambiar la estructura interna sin modificar el codigo que la utiliza
-   nos permita darle mantenimiento de una forma mas facil y facilita la mejora del software
-   nos permite escalar la implementacion

Los TDA son el fundamento teorico de las estructuras de datos, cada estructura que se va a desarrollar implementa un TDA determinado, respetando las operaciones y comportamientos ya definidos.


<a id="org1d8ebd5"></a>

# Como se conecta con EDD ?

Vamos a ver operaciones a lo largo del curso las cuales van a ser las mismas a lo largo de las estructuras:

-   insertar
-   eliminar
-   buscar

Puede que igual veamos otras operaciones como consultas, recorridos, pero en escencia esas 3 operaciones siempre van a estar presentes.


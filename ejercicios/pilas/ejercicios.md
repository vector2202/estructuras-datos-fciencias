# Pilas

## Ejercicios propuestos

**Ejercicio 1.**\
Dada una pila inicialmente vacía, muestra el estado de la pila después
de ejecutar las siguientes operaciones:

    push(5)
    push(8)
    push(3)
    pop()
    push(2)
    pop()

Indica el contenido final de la pila y cuál elemento queda en el tope.

------------------------------------------------------------------------

**Ejercicio 2.**\
Implementa una pila como la vista en clase en java

------------------------------------------------------------------------

**Ejercicio 3.**\
Diseña un metodo que determine si una expresión con paréntesis está
correctamente balanceada utilizando una pila.

Ejemplo de entrada:

    ( ( ) ( ) )


------------------------------------------------------------------------

## Ejercicio ilustrativo

### Validación de paréntesis balanceados

Cadena:

    ( ( ) )

Procedimiento:

1.  Se recorre la cadena carácter por carácter.
2.  Si se encuentra `(` se inserta en la pila.
3.  Si se encuentra `)` se elimina el elemento superior.
4.  Al finalizar:
    -   Si la pila está vacía → la expresión está balanceada.
    -   Si no está vacía → hay error.

**Resultado:**\
La pila queda vacía → la expresión es correcta.

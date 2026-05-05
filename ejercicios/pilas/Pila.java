package pilas;

/**
 * Implementación de una Pila (Stack) usando nodos ligados.
 * Sigue el principio LIFO (Last In, First Out).
 * 
 * @param <T> el tipo de elementos en la pila.
 */
public class Pila<T> {
    private class Nodo {
        T valor;
        Nodo siguiente;

        Nodo(T valor) {
            this.valor = valor;
            this.siguiente = null;
        }
    }

    private Nodo tope;
    private int tamano;

    public Pila() {
        this.tope = null;
        this.tamano = 0;
    }

    /**
     * Agrega un elemento al tope de la pila.
     * 
     * @param valor el elemento a agregar.
     */
    public void push(T valor) {
        // TODO: Implementar el empuje (push)
        Nodo nuevo = new Nodo(valor);
        nuevo.siguiente = tope;
        tope = nuevo;
        tamano++;
    }

    /**
     * Elimina y retorna el elemento en el tope de la pila.
     * 
     * @return el elemento eliminado.
     * @throws IllegalStateException si la pila está vacía.
     */
    public T pop() {
        // TODO: Implementar la extracción (pop)
        if (isEmpty()) {
            throw new IllegalStateException("La pila esta vacia");
        }
        T valor = tope.valor;
        tope = tope.siguiente;
        tamano--;
        return valor;
    }

    /**
     * Retorna el elemento en el tope sin eliminarlo.
     * 
     * @return el elemento en el tope.
     */
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("La pila esta vacia");
        }
        return tope.valor;
    }

    /**
     * Verifica si la pila no tiene elementos.
     * 
     * @return true si está vacía, false de lo contrario.
     */
    public boolean isEmpty() {
        return tope == null;
    }
}

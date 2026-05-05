package colas;

/**
 * Implementación de una Cola (Queue) usando nodos ligados.
 * Sigue el principio FIFO (First In, First Out).
 * 
 * @param <T> el tipo de elementos en la cola.
 */
public class Cola<T> {
    private class Nodo {
        T valor;
        Nodo siguiente;

        Nodo(T valor) {
            this.valor = valor;
            this.siguiente = null;
        }
    }

    private Nodo frente;
    private Nodo fin;
    private int tamano;

    public Cola() {
        this.frente = null;
        this.fin = null;
        this.tamano = 0;
    }

    /**
     * Agrega un elemento al final de la cola.
     * 
     * @param valor el elemento a agregar.
     */
    public void enqueue(T valor) {
        // TODO: Implementar inserción al final
        Nodo nuevo = new Nodo(valor);
        if (isEmpty()) {
            frente = nuevo;
        } else {
            fin.siguiente = nuevo;
        }
        fin = nuevo;
        tamano++;
    }

    /**
     * Elimina y retorna el elemento al frente de la cola.
     * 
     * @return el elemento eliminado.
     * @throws IllegalStateException si la cola está vacía.
     */
    public T dequeue() {
        // TODO: Implementar extracción del frente
        if (isEmpty()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        T valor = frente.valor;
        frente = frente.siguiente;
        if (frente == null) {
            fin = null;
        }
        tamano--;
        return valor;
    }

    /**
     * Retorna el elemento al frente sin eliminarlo.
     * 
     * @return el elemento al frente.
     */
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        return frente.valor;
    }

    /**
     * Verifica si la cola no tiene elementos.
     * 
     * @return true si está vacía, false de lo contrario.
     */
    public boolean isEmpty() {
        return tamano == 0;
    }
}

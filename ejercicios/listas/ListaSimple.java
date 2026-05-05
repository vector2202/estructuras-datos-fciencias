package listas;

/**
 * Implementación de una Lista Simplemente Ligada.
 * 
 * @param <T> el tipo de elementos en la lista.
 */
public class ListaSimple<T> {
    private class Nodo {
        T valor;
        Nodo siguiente;

        Nodo(T valor) {
            this.valor = valor;
            this.siguiente = null;
        }
    }

    private Nodo cabeza;
    private int tamano;

    public ListaSimple() {
        this.cabeza = null;
        this.tamano = 0;
    }

    /**
     * Agrega un elemento al final de la lista.
     * 
     * @param valor el elemento a agregar.
     */
    public void add(T valor) {
        // TODO: Implementar agregado al final
        Nodo nuevo = new Nodo(valor);
        if (cabeza == null) {
            cabeza = nuevo;
        } else {
            Nodo actual = cabeza;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        tamano++;
    }

    /**
     * Obtiene el elemento en la posición especificada.
     * 
     * @param indice posición del elemento.
     * @return el elemento en esa posición.
     * @throws IndexOutOfBoundsException si el índice es inválido.
     */
    public T get(int indice) {
        if (indice < 0 || indice >= tamano) {
            throw new IndexOutOfBoundsException("Índice fuera de rango");
        }
        Nodo actual = cabeza;
        for (int i = 0; i < indice; i++) {
            actual = actual.siguiente;
        }
        return actual.valor;
    }

    /**
     * Retorna el número de elementos en la lista.
     * 
     * @return tamaño de la lista.
     */
    public int size() {
        return tamano;
    }

    /**
     * Invierte el orden de los elementos en la lista.
     * Complejidad: O(n)
     */
    public void reverse() {
        // TODO: Implementar inversión de la lista (in-place)
        Nodo anterior = null;
        Nodo actual = cabeza;
        Nodo siguiente = null;
        while (actual != null) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        cabeza = anterior;
    }
}

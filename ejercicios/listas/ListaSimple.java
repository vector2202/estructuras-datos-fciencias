package listas;

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

    public void add(T valor) {
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

    public int size() {
        return tamano;
    }

    public void reverse() {
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

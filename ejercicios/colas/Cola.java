package colas;

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

    public void enqueue(T valor) {
        Nodo nuevo = new Nodo(valor);
        if (isEmpty()) {
            frente = nuevo;
        } else {
            fin.siguiente = nuevo;
        }
        fin = nuevo;
        tamano++;
    }

    public T dequeue() {
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

    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        return frente.valor;
    }

    public boolean isEmpty() {
        return tamano == 0;
    }
}

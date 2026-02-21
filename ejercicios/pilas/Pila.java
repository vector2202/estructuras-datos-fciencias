package pilas;

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

    public void push(T valor) {
        Nodo nuevo = new Nodo(valor);
        nuevo.siguiente = tope;
        tope = nuevo;
        tamano++;
    }

    public T pop() {
        if (isEmpty()) {
            throw new IllegalStateException("La pila está vacía");
        }
        T valor = tope.valor;
        tope = tope.siguiente;
        tamano--;
        return valor;
    }

    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("La pila está vacía");
        }
        return tope.valor;
    }

    public boolean isEmpty() {
        return tope == null;
    }

}

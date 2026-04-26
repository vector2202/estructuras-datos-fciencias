package arboles;

import java.util.ArrayList;
import java.util.List;

public class ArbolBinarioBusqueda {

    private class Nodo {
        int valor;
        Nodo izquierdo, derecho;

        Nodo(int valor) {
            this.valor = valor;
            this.izquierdo = this.derecho = null;
        }
    }

    private Nodo raiz;

    public ArbolBinarioBusqueda() {
        this.raiz = null;
    }

    /**
     * Inserta un valor en el arbol.
     */
    public void insertar(int valor) {
        raiz = insertarRecursivo(raiz, valor);
    }

    private Nodo insertarRecursivo(Nodo raiz, int valor) {
        if (raiz == null) {
            return new Nodo(valor);
        }
        if (valor < raiz.valor) {
            raiz.izquierdo = insertarRecursivo(raiz.izquierdo, valor);
        } else if (valor > raiz.valor) {
            raiz.derecho = insertarRecursivo(raiz.derecho, valor);
        }
        return raiz;
    }

    /**
     * Determina si el arbol contiene un valor.
     */
    public boolean contiene(int valor) {
        return contieneRecursivo(raiz, valor);
    }

    private boolean contieneRecursivo(Nodo raiz, int valor) {
        if (raiz == null)
            return false;
        if (raiz.valor == valor)
            return true;
        return valor < raiz.valor
                ? contieneRecursivo(raiz.izquierdo, valor)
                : contieneRecursivo(raiz.derecho, valor);
    }

    /**
     * Retorna la altura del arbol.
     */
    public int obtenerAltura() {
        return obtenerAlturaRecursivo(raiz);
    }

    private int obtenerAlturaRecursivo(Nodo raiz) {
        if (raiz == null)
            return -1;
        return 1 + Math.max(obtenerAlturaRecursivo(raiz.izquierdo), obtenerAlturaRecursivo(raiz.derecho));
    }

    /**
     * Retorna el recorrido inorden.
     */
    public List<Integer> inorden() {
        List<Integer> resultado = new ArrayList<>();
        inordenRecursivo(raiz, resultado);
        return resultado;
    }

    private void inordenRecursivo(Nodo raiz, List<Integer> resultado) {
        if (raiz != null) {
            inordenRecursivo(raiz.izquierdo, resultado);
            resultado.add(raiz.valor);
            inordenRecursivo(raiz.derecho, resultado);
        }
    }

    /**
     * Valida si el arbol es un BST valido.
     */
    public boolean esBST() {
        return esBSTUtil(raiz, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }

    private boolean esBSTUtil(Nodo nodo, int min, int max) {
        if (nodo == null)
            return true;
        if (nodo.valor < min || nodo.valor > max)
            return false;
        return esBSTUtil(nodo.izquierdo, min, nodo.valor - 1) &&
                esBSTUtil(nodo.derecho, nodo.valor + 1, max);
    }
}

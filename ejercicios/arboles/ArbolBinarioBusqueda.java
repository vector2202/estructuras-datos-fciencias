package arboles;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementacion de un BST.
 */
public class ArbolBinarioBusqueda {

    /**
     * Clase interna para representar un nodo.
     */
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
     * Inserta un valor en el bst.
     * 
     * @param valor el valor a insertar.
     */
    public void insertar(int valor) {
        // TODO: Implementar inserción recursiva
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
     * Determina si el bst contiene un valor.
     * 
     * @param valor el valor a buscar.
     * @return true si se encuentra, false en caso contrario.
     */
    public boolean contiene(int valor) {
        // TODO: Implementar búsqueda recursiva
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
     * Calcula la altura del bst.
     * 
     * @return la altura del bst, o -1 si esta vacio.
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
     * Cuenta las hojas del bst.
     * 
     * @return el número total de hojas.
     */
    public int contarHojas() {
        // TODO: Implementar conteo de hojas
        return contarHojasRecursivo(raiz);
    }

    private int contarHojasRecursivo(Nodo nodo) {
        if (nodo == null)
            return 0;
        if (nodo.izquierdo == null && nodo.derecho == null)
            return 1;
        return contarHojasRecursivo(nodo.izquierdo) + contarHojasRecursivo(nodo.derecho);
    }

    /**
     * Retorna una lista con los elementos del bst en recorrido inorden.
     * 
     * @return lista de valores ordenados.
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
     * Valida si el arbol es un bst
     * 
     * @return true si es un BST, false de lo contrario.
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

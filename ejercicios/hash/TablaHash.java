package hash;

import java.util.LinkedList;

/**
 * Implementacion de una Tabla Hash usando encadenamiento (Chaining).
 */
public class TablaHash<K, V> {

    private class Entrada<K, V> {
        K clave;
        V valor;

        Entrada(K clave, V valor) {
            this.clave = clave;
            this.valor = valor;
        }
    }

    private LinkedList<Entrada<K, V>>[] cubetas;
    private int capacidad;
    private int tamano;

    @SuppressWarnings("unchecked")
    public TablaHash(int capacidadInitial) {
        this.capacidad = capacidadInitial;
        this.cubetas = new LinkedList[capacidad];
        this.tamano = 0;
        for (int i = 0; i < capacidad; i++) {
            cubetas[i] = new LinkedList<>();
        }
    }

    private int obtenerIndice(K clave) {
        return Math.abs(clave.hashCode()) % capacidad;
    }

    /**
     * Inserta o actualiza un par clave-valor en la tabla.
     * Si la clave ya existe, actualiza su valor.
     * 
     * @param clave la clave a insertar o actualizar.
     * @param valor el valor a asociar con la clave.
     */
    public void put(K clave, V valor) {
        // TODO: Implementar inserción con manejo de colisiones
        int indice = obtenerIndice(clave);
        for (Entrada<K, V> entrada : cubetas[indice]) {
            if (entrada.clave.equals(clave)) {
                entrada.valor = valor;
                return;
            }
        }
        cubetas[indice].add(new Entrada<>(clave, valor));
        tamano++;
    }

    /**
     * Busca el valor asociado a una clave.
     * 
     * @param clave la clave a buscar.
     * @return el valor asociado, o null si la clave no existe.
     */
    public V get(K clave) {
        // TODO: Implementar búsqueda en la cubeta correspondiente
        int indice = obtenerIndice(clave);
        for (Entrada<K, V> entrada : cubetas[indice]) {
            if (entrada.clave.equals(clave)) {
                return entrada.valor;
            }
        }
        return null;
    }

    /**
     * Elimina una clave y su valor asociado de la tabla.
     * 
     * @param clave la clave a eliminar.
     */
    public void remove(K clave) {
        // TODO: Implementar eliminación de una entrada
        int indice = obtenerIndice(clave);
        Entrada<K, V> aEliminar = null;
        for (Entrada<K, V> entrada : cubetas[indice]) {
            if (entrada.clave.equals(clave)) {
                aEliminar = entrada;
                break;
            }
        }
        if (aEliminar != null) {
            cubetas[indice].remove(aEliminar);
            tamano--;
        }
    }

    public int size() {
        return tamano;
    }
}

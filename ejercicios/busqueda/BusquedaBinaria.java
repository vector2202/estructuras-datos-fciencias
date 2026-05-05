package busqueda;

public class BusquedaBinaria {

    /**
     * Realiza una busqueda lineal en un arreglo.
     * 
     * @param arreglo  El arreglo donde buscar.
     * @param objetivo El valor a buscar.
     * @return El indice del objetivo o -1 si no se encuentra.
     */
    public static int busquedaLineal(int[] arreglo, int objetivo) {
        for (int i = 0; i < arreglo.length; i++) {
            if (arreglo[i] == objetivo) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Realiza una búsqueda binaria en un arreglo ordenado.
     * Complejidad: O(log n)
     * 
     * @param arreglo  El arreglo ordenado donde buscar.
     * @param objetivo El valor a buscar.
     * @return El índice del objetivo o -1 si no se encuentra.
     */
    public static int busquedaBinaria(int[] arreglo, int objetivo) {
        // TODO: Implementar búsqueda binaria (Divide y Vencerás)
        /* SOLUCIÓN:
        int inicio = 0;
        int fin = arreglo.length - 1;
        while (inicio <= fin) {
            int medio = inicio + (fin - inicio) / 2;
            if (arreglo[medio] == objetivo) return medio;
            if (arreglo[medio] < objetivo) inicio = medio + 1;
            else fin = medio - 1;
        }
        return -1;
        */
        int inicio = 0;
        int fin = arreglo.length - 1;

        while (inicio <= fin) {
            int medio = inicio + (fin - inicio) / 2;

            if (arreglo[medio] == objetivo) {
                return medio;
            }

            if (arreglo[medio] < objetivo) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }
        return -1;
    }
}

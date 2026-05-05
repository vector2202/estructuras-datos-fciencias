package sorting;

public class SortAlgorithms {

    /**
     * BubbleSort: Ordena comparando elementos contiguos e intercambiandolos.
     * 
     * @param arreglo el arreglo a ordenar.
     */
    public static void bubbleSort(int[] arreglo) {
        // TODO: Implementar BubbleSort
        int n = arreglo.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arreglo[j] > arreglo[j + 1]) {
                    int temp = arreglo[j];
                    arreglo[j] = arreglo[j + 1];
                    arreglo[j + 1] = temp;
                }
            }
        }
    }

    /**
     * InsertionSort: Construye el arreglo ordenado de uno en uno.
     * 
     * @param arreglo el arreglo a ordenar.
     */
    public static void insertionSort(int[] arreglo) {
        // TODO: Implementar InsertionSort
        int n = arreglo.length;
        for (int i = 1; i < n; ++i) {
            int llave = arreglo[i];
            int j = i - 1;
            while (j >= 0 && arreglo[j] > llave) {
                arreglo[j + 1] = arreglo[j];
                j = j - 1;
            }
            arreglo[j + 1] = llave;
        }
    }

    /**
     * MergeSort: Algoritmo de tipo Divide y Vencerás.
     * 
     * @param arreglo el arreglo a ordenar.
     */
    public static void mergeSort(int[] arreglo) {
        // TODO: Implementar MergeSort
        if (arreglo.length < 2)
            return;
        int mitad = arreglo.length / 2;
        int[] izq = new int[mitad];
        int[] der = new int[arreglo.length - mitad];

        System.arraycopy(arreglo, 0, izq, 0, mitad);
        System.arraycopy(arreglo, mitad, der, 0, arreglo.length - mitad);

        mergeSort(izq);
        mergeSort(der);
        merge(arreglo, izq, der);
    }

    private static void merge(int[] arreglo, int[] izq, int[] der) {
        // TODO: Implementar la mezcla de dos sub-arreglos
        int i = 0, j = 0, k = 0;
        while (i < izq.length && j < der.length) {
            if (izq[i] <= der[j])
                arreglo[k++] = izq[i++];
            else
                arreglo[k++] = der[j++];
        }
        while (i < izq.length)
            arreglo[k++] = izq[i++];
        while (j < der.length)
            arreglo[k++] = der[j++];
    }

    /**
     * Quicksort: Selecciona un pivote y particiona el arreglo.
     * 
     * @param arreglo el arreglo a ordenar.
     * @param bajo    índice inferior.
     * @param alto    índice superior.
     */
    public static void quickSort(int[] arreglo, int bajo, int alto) {
        // TODO: Implementar Quicksort
        if (bajo < alto) {
            int pi = particion(arreglo, bajo, alto);
            quickSort(arreglo, bajo, pi - 1);
            quickSort(arreglo, pi + 1, alto);
        }
    }

    private static int particion(int[] arreglo, int bajo, int alto) {
        // TODO: Implementar particion
        int pivote = arreglo[alto];
        int i = (bajo - 1);
        for (int j = bajo; j < alto; j++) {
            if (arreglo[j] < pivote) {
                i++;
                int temp = arreglo[i];
                arreglo[i] = arreglo[j];
                arreglo[j] = temp;
            }
        }
        int temp = arreglo[i + 1];
        arreglo[i + 1] = arreglo[alto];
        arreglo[alto] = temp;
        return i + 1;
    }
}

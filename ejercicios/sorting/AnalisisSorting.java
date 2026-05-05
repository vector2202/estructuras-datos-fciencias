package sorting;

import java.util.Arrays;
import java.util.Random;

/**
 * Clase para analizar el rendimiento de los algoritmos de ordenamiento 
 * bajo diferentes escenarios.
 */
public class AnalisisSorting {

    public static void main(String[] args) {
        int tamano = 10000;
        
        System.out.println("Escenario 1: Arreglo Inverso (Peor caso para Bubble/Insertion)");
        int[] inverso = generarArregloInverso(tamano);
        probarAlgoritmos(inverso);

        System.out.println("\nEscenario 2: Arreglo con muchos repetidos");
        int[] repetidos = generarArregloRepetidos(tamano);
        probarAlgoritmos(repetidos);

        System.out.println("\nEscenario 3: Arreglo Aleatorio");
        int[] aleatorio = generarArregloAleatorio(tamano);
        probarAlgoritmos(aleatorio);
    }

    private static void probarAlgoritmos(int[] original) {
        int[] copia;
        long inicio, fin;

        // BubbleSort
        copia = Arrays.copyOf(original, original.length);
        inicio = System.currentTimeMillis();
        SortAlgorithms.bubbleSort(copia);
        fin = System.currentTimeMillis();
        System.out.println("BubbleSort: " + (fin - inicio) + "ms");

        // QuickSort
        copia = Arrays.copyOf(original, original.length);
        inicio = System.currentTimeMillis();
        SortAlgorithms.quickSort(copia, 0, copia.length - 1);
        fin = System.currentTimeMillis();
        System.out.println("QuickSort: " + (fin - inicio) + "ms");

        // MergeSort
        copia = Arrays.copyOf(original, original.length);
        inicio = System.currentTimeMillis();
        SortAlgorithms.mergeSort(copia);
        fin = System.currentTimeMillis();
        System.out.println("MergeSort: " + (fin - inicio) + "ms");
    }

    private static int[] generarArregloInverso(int n) {
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = n - i;
        return arr;
    }

    private static int[] generarArregloAleatorio(int n) {
        Random rand = new Random();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }

    private static int[] generarArregloRepetidos(int n) {
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = i % 10; // Solo 10 valores distintos
        return arr;
    }
}

package sorting;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class SortTest {

    @Test
    void testBubbleSort() {
        int[] arreglo = {64, 34, 25, 12, 22, 11, 90};
        int[] esperado = {11, 12, 22, 25, 34, 64, 90};
        
        SortAlgorithms.bubbleSort(arreglo);
        assertArrayEquals(esperado, arreglo);
    }

    @Test
    void testQuickSort() {
        int[] arreglo = {10, 7, 8, 9, 1, 5};
        int[] esperado = {1, 5, 7, 8, 9, 10};
        
        SortAlgorithms.quickSort(arreglo, 0, arreglo.length - 1);
        assertArrayEquals(esperado, arreglo);
    }

    @Test
    void testInsertionSort() {
        int[] arreglo = {12, 11, 13, 5, 6};
        int[] esperado = {5, 6, 11, 12, 13};
        SortAlgorithms.insertionSort(arreglo);
        assertArrayEquals(esperado, arreglo);
    }

    @Test
    void testMergeSort() {
        int[] arreglo = {38, 27, 43, 3, 9, 82, 10};
        int[] esperado = {3, 9, 10, 27, 38, 43, 82};
        SortAlgorithms.mergeSort(arreglo);
        assertArrayEquals(esperado, arreglo);
    }

    @Test
    void testArregloVacio() {
        int[] arreglo = {};
        SortAlgorithms.bubbleSort(arreglo);
        SortAlgorithms.mergeSort(arreglo);
        assertEquals(0, arreglo.length);
    }

    @Test
    void testArregloUnElemento() {
        int[] arreglo = {1};
        SortAlgorithms.quickSort(arreglo, 0, 0);
        SortAlgorithms.insertionSort(arreglo);
        assertEquals(1, arreglo[0]);
    }
}

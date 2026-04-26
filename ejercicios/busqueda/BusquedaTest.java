package busqueda;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BusquedaTest {

    @Test
    void testBusquedaLineal() {
        int[] arreglo = {5, 3, 8, 1, 9};
        assertEquals(2, BusquedaBinaria.busquedaLineal(arreglo, 8));
        assertEquals(0, BusquedaBinaria.busquedaLineal(arreglo, 5));
        assertEquals(4, BusquedaBinaria.busquedaLineal(arreglo, 9));
        assertEquals(-1, BusquedaBinaria.busquedaLineal(arreglo, 10));
    }

    @Test
    void testBusquedaBinaria() {
        int[] arreglo = {1, 3, 5, 8, 9, 12}; // Debe estar ordenado
        assertEquals(3, BusquedaBinaria.busquedaBinaria(arreglo, 8));
        assertEquals(0, BusquedaBinaria.busquedaBinaria(arreglo, 1));
        assertEquals(5, BusquedaBinaria.busquedaBinaria(arreglo, 12));
        assertEquals(-1, BusquedaBinaria.busquedaBinaria(arreglo, 10));
    }

    @Test
    void testBusquedaBinariaVacio() {
        int[] arreglo = {};
        assertEquals(-1, BusquedaBinaria.busquedaBinaria(arreglo, 1));
    }
}

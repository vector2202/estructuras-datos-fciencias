package arboles;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

public class ArbolBinarioBusquedaTest {

    @Test
    void testInsertarYContiene() {
        ArbolBinarioBusqueda arbol = new ArbolBinarioBusqueda();
        arbol.insertar(50);
        arbol.insertar(30);
        arbol.insertar(70);
        arbol.insertar(20);

        assertTrue(arbol.contiene(50));
        assertTrue(arbol.contiene(30));
        assertTrue(arbol.contiene(20));
        assertFalse(arbol.contiene(100));
    }

    @Test
    void testInorden() {
        ArbolBinarioBusqueda arbol = new ArbolBinarioBusqueda();
        arbol.insertar(5);
        arbol.insertar(3);
        arbol.insertar(8);
        arbol.insertar(1);

        List<Integer> esperado = List.of(1, 3, 5, 8);
        assertEquals(esperado, arbol.inorden());
    }

    @Test
    void testAltura() {
        ArbolBinarioBusqueda arbol = new ArbolBinarioBusqueda();
        assertEquals(-1, arbol.obtenerAltura());
        arbol.insertar(10);
        assertEquals(0, arbol.obtenerAltura());
        arbol.insertar(5);
        arbol.insertar(15);
        assertEquals(1, arbol.obtenerAltura());
        arbol.insertar(2);
        assertEquals(2, arbol.obtenerAltura());
    }

    @Test
    void testEsBST() {
        ArbolBinarioBusqueda arbol = new ArbolBinarioBusqueda();
        assertTrue(arbol.esBST());
        arbol.insertar(10);
        arbol.insertar(5);
        arbol.insertar(15);
        assertTrue(arbol.esBST());
    }

    @Test
    void testContarHojas() {
        ArbolBinarioBusqueda arbol = new ArbolBinarioBusqueda();
        assertEquals(0, arbol.contarHojas());
        arbol.insertar(10);
        assertEquals(1, arbol.contarHojas());
        arbol.insertar(5);
        arbol.insertar(15);
        assertEquals(2, arbol.contarHojas()); // 5 y 15 son hojas
        arbol.insertar(2);
        assertEquals(2, arbol.contarHojas()); // 2 y 15 son hojas
    }
}

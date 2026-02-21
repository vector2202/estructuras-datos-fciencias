package pilas;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class PilaTest {
    private Pila<Integer> pila;

    @BeforeEach
    void setUp() {
        pila = new Pila<>();
    }

    @Test
    void testBasicOperations() {
        assertTrue(pila.isEmpty());
        pila.push(10);
        pila.push(20);
        pila.push(30);

        assertFalse(pila.isEmpty());
        Assertions.assertEquals(30, pila.peek());
        Assertions.assertEquals(30, pila.pop());
        Assertions.assertEquals(20, pila.pop());
        Assertions.assertEquals(10, pila.pop());
        assertTrue(pila.isEmpty());
    }

    @Test
    void testEmptyStack() {
        assertThrows(IllegalStateException.class, () -> pila.pop(), "Debe lanzar excepcion al hacer pop en pila vacia");
        assertThrows(IllegalStateException.class, () -> pila.peek(),
                "Debe lanzar excepcion al hacer peek en pila vacia");
    }
}

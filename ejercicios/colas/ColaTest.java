package colas;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class ColaTest {
    private Cola<Integer> cola;

    @BeforeEach
    void setUp() {
        cola = new Cola<>();
    }

    @Test
    void testBasicOperations() {
        cola.enqueue(10);
        cola.enqueue(20);
        cola.enqueue(30);

        assertEquals(10, cola.dequeue());
        assertEquals(20, cola.peek());
    }

    @Test
    void testEmptyQueue() {
        assertTrue(cola.isEmpty());
        assertThrows(IllegalStateException.class, () -> cola.dequeue(),
                "Debe lanzar excepcion al hacer dequeue en cola vacia");
        assertThrows(IllegalStateException.class, () -> cola.peek(),
                "Debe lanzar excepcion al hacer peek en cola vacia");
    }

    @Test
    void testSequence() {
        cola.enqueue(1);
        cola.dequeue();
        assertTrue(cola.isEmpty());
        cola.enqueue(2);
        assertEquals(2, cola.peek());
        assertEquals(2, cola.dequeue());
        assertTrue(cola.isEmpty());
    }
}

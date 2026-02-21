package listas;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ListTest {

    @Test
    void testAddAndSize() {
        ListaSimple<Integer> lista = new ListaSimple<>();
        lista.add(10);
        lista.add(20);
        lista.add(30);

        Assertions.assertEquals(3, lista.size());
    }

    @Test
    void testGet() {
        ListaSimple<String> lista = new ListaSimple<>();
        lista.add("A");
        lista.add("B");
        lista.add("C");

        Assertions.assertEquals("A", lista.get(0));
        Assertions.assertEquals("B", lista.get(1));
        Assertions.assertEquals("C", lista.get(2));
    }

    @Test
    void testInvalidIndex() {
        ListaSimple<Integer> lista = new ListaSimple<>();
        assertThrows(IndexOutOfBoundsException.class, () -> lista.get(0));
        lista.add(1);
        assertThrows(IndexOutOfBoundsException.class, () -> lista.get(1));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.get(-1));
    }
}

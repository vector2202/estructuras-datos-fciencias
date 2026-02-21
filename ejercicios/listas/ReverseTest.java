package listas;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReverseTest {

    @Test
    void testReverseMultipleElements() {
        ListaSimple<Integer> lista = new ListaSimple<>();
        lista.add(1);
        lista.add(2);
        lista.add(3);
        lista.add(4);

        lista.reverse();

        Assertions.assertEquals(4, lista.get(0));
        Assertions.assertEquals(3, lista.get(1));
        Assertions.assertEquals(2, lista.get(2));
        Assertions.assertEquals(1, lista.get(3));
    }

    @Test
    void testReverseSingleElement() {
        ListaSimple<Integer> lista = new ListaSimple<>();
        lista.add(100);
        lista.reverse();

        Assertions.assertEquals(100, lista.get(0));
        assertEquals(1, lista.size());
    }

    @Test
    void testReverseEmptyList() {
        ListaSimple<Integer> lista = new ListaSimple<>();
        lista.reverse();

        Assertions.assertEquals(0, lista.size());
    }
}

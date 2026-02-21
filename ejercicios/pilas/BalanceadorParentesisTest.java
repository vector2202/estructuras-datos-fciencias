package pilas;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BalanceadorParentesisTest {

    @Test
    void testBalanceado() {
        assertTrue(BalanceadorParentesis.estaBalanceado("(()())"));
        assertTrue(BalanceadorParentesis.estaBalanceado("((()))"));
        assertTrue(BalanceadorParentesis.estaBalanceado("()()()"));
    }

    @Test
    void testNoBalanceado() {
        assertFalse(BalanceadorParentesis.estaBalanceado("(()"), "Falta un cierre");
        assertFalse(BalanceadorParentesis.estaBalanceado("())"), "Sobra un cierre");
        assertFalse(BalanceadorParentesis.estaBalanceado("())("), "Desordenado");
        assertFalse(BalanceadorParentesis.estaBalanceado(")("), "Cierre antes de apertura");
    }

    @Test
    void testVacio() {
        assertTrue(BalanceadorParentesis.estaBalanceado(""), "Cadena vacia debe estar balanceada");
    }

    @Test
    void testConOtrosCaracteres() {
        // Asumiendo que ignora otros caracteres o que solo espera paréntesis
        assertTrue(BalanceadorParentesis.estaBalanceado("(a + b) * (c)"));
    }
}

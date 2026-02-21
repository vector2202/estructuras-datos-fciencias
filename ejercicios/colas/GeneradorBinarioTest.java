package colas;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

public class GeneradorBinarioTest {

    @Test
    void testGenerarCinco() {
        List<String> resultado = GeneradorBinario.generar(5);
        String[] esperado = { "1", "10", "11", "100", "101" };

        Assertions.assertNotNull(resultado);
        Assertions.assertEquals(esperado.length, resultado.size());
        for (int i = 0; i < esperado.length; i++) {
            Assertions.assertEquals(esperado[i], resultado.get(i));
        }
    }

    @Test
    void testGenerarUno() {
        List<String> resultado = GeneradorBinario.generar(1);
        Assertions.assertEquals(1, resultado.size());
        Assertions.assertEquals("1", resultado.get(0));
    }

    @Test
    void testGenerarCero() {
        List<String> resultado = GeneradorBinario.generar(0);
        assertTrue(resultado.isEmpty());
    }

    @Test
    void testGenerarNegativo() {
        List<String> resultado = GeneradorBinario.generar(-1);
        assertTrue(resultado.isEmpty());
    }
}

package hash;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class EjerciciosHashTest {

    @Test
    public void testContarFrecuencia() {
        String texto = "hola mundo";
        Map<Character, Integer> result = EjerciciosHash.contarFrecuencia(texto);
        
        assertEquals(1, result.get('h'));
        assertEquals(2, result.get('o'));
        assertEquals(1, result.get(' '));
        assertEquals(1, result.get('d'));
    }

    @Test
    public void testPrimerCaracterNoRepetido() {
        assertEquals('h', EjerciciosHash.primerCaracterNoRepetido("hola"));
        assertEquals('l', EjerciciosHash.primerCaracterNoRepetido("aabbccl"));
        assertEquals('\0', EjerciciosHash.primerCaracterNoRepetido("aabbcc"));
        assertEquals('r', EjerciciosHash.primerCaracterNoRepetido("vivir"));
    }
}

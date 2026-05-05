package hash;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TablaHashTest {

    @Test
    void testPutAndGet() {
        TablaHash<String, Integer> tabla = new TablaHash<>(10);
        tabla.put("Uno", 1);
        tabla.put("Dos", 2);
        tabla.put("Tres", 3);

        assertEquals(1, tabla.get("Uno"));
        assertEquals(2, tabla.get("Dos"));
        assertEquals(3, tabla.get("Tres"));
        assertEquals(3, tabla.size());
    }

    @Test
    void testUpdateValue() {
        TablaHash<String, String> tabla = new TablaHash<>(5);
        tabla.put("User1", "Normal");
        tabla.put("User1", "Admin");

        assertEquals("Admin", tabla.get("User1"));
        assertEquals(1, tabla.size());
    }

    @Test
    void testRemove() {
        TablaHash<Integer, String> tabla = new TablaHash<>(10);
        tabla.put(100, "Cien");
        tabla.put(200, "Docientos");
        
        tabla.remove(100);
        assertNull(tabla.get(100));
        assertEquals(1, tabla.size());
    }

    @Test
    void testColisiones() {
        // Forzamos colisión: supongamos que claves diferentes caen en misma cubeta
        TablaHash<Integer, String> tabla = new TablaHash<>(1); // Solo 1 cubeta
        tabla.put(1, "A");
        tabla.put(2, "B");
        tabla.put(3, "C");

        assertEquals("A", tabla.get(1));
        assertEquals("B", tabla.get(2));
        assertEquals("C", tabla.get(3));
        assertEquals(3, tabla.size());
    }
}

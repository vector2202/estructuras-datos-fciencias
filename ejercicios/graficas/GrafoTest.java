package graficas;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

public class GrafoTest {

    @Test
    void testAgregarVerticesYAristas() {
        Grafo<String> g = new Grafo<>();
        g.agregarArista("A", "B");
        g.agregarArista("B", "C");

        assertEquals(3, g.contarVertices()); // A, B, C
    }

    @Test
    void testBFS() {
        Grafo<Integer> g = new Grafo<>();
        g.agregarArista(1, 2);
        g.agregarArista(1, 3);
        g.agregarArista(2, 4);
        g.agregarArista(3, 4);

        List<Integer> resultado = g.bfs(1);
        
        // BFS de 1 en este grafo puede ser [1, 2, 3, 4] o [1, 3, 2, 4]
        assertEquals(1, resultado.get(0));
        assertTrue(resultado.contains(2));
        assertTrue(resultado.contains(3));
        assertEquals(4, resultado.get(3));
    }

    @Test
    void testDFS() {
        Grafo<String> g = new Grafo<>();
        g.agregarArista("A", "B");
        g.agregarArista("B", "C");
        g.agregarArista("A", "C");

        List<String> resultado = g.dfs("A");
        
        assertEquals(3, resultado.size());
        assertTrue(resultado.contains("A"));
        assertTrue(resultado.contains("B"));
        assertTrue(resultado.contains("C"));
    }

    @Test
    void testGrafoDesconectado() {
        Grafo<Integer> g = new Grafo<>();
        g.agregarVertice(1);
        g.agregarVertice(2);
        
        List<Integer> resultado = g.bfs(1);
        assertEquals(1, resultado.size());
        assertEquals(1, resultado.get(0));
    }
}

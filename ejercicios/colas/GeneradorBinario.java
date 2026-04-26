package colas;

import java.util.ArrayList;
import java.util.List;

public class GeneradorBinario {

    public static List<String> generar(int n) {
        List<String> resultado = new ArrayList<>();
        if (n <= 0)
            return resultado;

        // La cola ahora es dinamica, no requiere capacidad inicial
        Cola<String> cola = new Cola<>();
        cola.enqueue("1");

        while (resultado.size() < n) {
            String actual = cola.dequeue();
            resultado.add(actual);

            // Generar el siguiente par: actual + "0" y actual + "1"
            cola.enqueue(actual + "0");
            cola.enqueue(actual + "1");
        }

        return resultado;
    }
}

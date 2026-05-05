package hash;

import java.util.HashMap;
import java.util.Map;

public class EjerciciosHash {

    /**
     * Cuenta la frecuencia de cada caracter en una cadena.
     * 
     * @param texto la cadena a analizar.
     * @return un mapa con el carácter como clave y su frecuencia como valor.
     */
    public static Map<Character, Integer> contarFrecuencia(String texto) {
        // TODO: Implementar usando un HashMap
        Map<Character, Integer> frecuencias = new HashMap<>();
        for (char c : texto.toCharArray()) {
            frecuencias.put(c, frecuencias.getOrDefault(c, 0) + 1);
        }
        return frecuencias;
    }

    /**
     * Encuentra el primer caracter que no se repite en una cadena.
     * 
     * @param texto la cadena a analizar.
     * @return el primer caracter no repetido, o '\0' si no existe.
     */
    public static char primerCaracterNoRepetido(String texto) {
        // TODO: Implementar usando un HashMap para contar frecuencias
        Map<Character, Integer> frecuencias = contarFrecuencia(texto);
        for (char c : texto.toCharArray()) {
            if (frecuencias.get(c) == 1) {
                return c;
            }
        }
        return '\0';
    }
}

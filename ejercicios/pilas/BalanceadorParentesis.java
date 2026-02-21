package pilas;

public class BalanceadorParentesis {

    public static boolean estaBalanceado(String expresion) {
        // La pila ahora es dinámica, no requiere capacidad inicial
        Pila<Character> pila = new Pila<>();

        for (int i = 0; i < expresion.length(); i++) {
            char c = expresion.charAt(i);
            if (c == '(') {
                pila.push(c);
            } else if (c == ')') {
                if (pila.isEmpty()) {
                    return false;
                }
                pila.pop();
            }
        }
        return pila.isEmpty();
    }
}

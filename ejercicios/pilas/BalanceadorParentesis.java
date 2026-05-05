package pilas;

public class BalanceadorParentesis {

    /**
     * Verifica si una expresion tiene parentesis balanceados.
     * 
     * @param expresion la expresion a verificar.
     * @return true si la expresion tiene parentesis balanceados, false en caso
     *         contrario.
     */
    public static boolean estaBalanceado(String expresion) {
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

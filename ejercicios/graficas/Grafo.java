package graficas;

import java.util.*;

/**
 * Representacion de un Grafo utilizando Listas de Adyacencia.
 */
public class Grafo<T> {
    private Map<T, List<T>> adyacencias;

    public Grafo() {
        this.adyacencias = new HashMap<>();
    }

    /**
     * Agrega un vertice al grafo.
     * 
     * @param vertice el vertice a agregar.
     */
    public void agregarVertice(T vertice) {
        adyacencias.putIfAbsent(vertice, new ArrayList<>());
    }

    /**
     * Agrega una arista entre dos vertices.
     * 
     * @param origen  el vertice origen.
     * @param destino el vertice destino.
     */
    public void agregarArista(T origen, T destino) {
        agregarVertice(origen);
        agregarVertice(destino);
        adyacencias.get(origen).add(destino);
        adyacencias.get(destino).add(origen);
    }

    /**
     * Recorrido a lo ancho.
     * 
     * @param inicio el vertice inicio.
     * @return lista de vertices en recorrido a lo ancho.
     */
    public List<T> bfs(T inicio) {
        List<T> resultado = new ArrayList<>();
        if (!adyacencias.containsKey(inicio))
            return resultado;

        Set<T> visitados = new HashSet<>();
        Queue<T> cola = new LinkedList<>();

        cola.add(inicio);
        visitados.add(inicio);

        while (!cola.isEmpty()) {
            T actual = cola.poll();
            resultado.add(actual);

            for (T vecino : adyacencias.get(actual)) {
                if (!visitados.contains(vecino)) {
                    visitados.add(vecino);
                    cola.add(vecino);
                }
            }
        }
        return resultado;
    }

    /**
     * Recorrido en profundidad.
     * 
     * @param inicio el vertice inicio.
     * @return lista de vertices en recorrido en profundidad.
     */
    public List<T> dfs(T inicio) {
        List<T> resultado = new ArrayList<>();
        if (!adyacencias.containsKey(inicio))
            return resultado;

        Set<T> visitados = new HashSet<>();
        dfsUtil(inicio, visitados, resultado);
        return resultado;
    }

    private void dfsUtil(T actual, Set<T> visitados, List<T> resultado) {
        visitados.add(actual);
        resultado.add(actual);

        for (T vecino : adyacencias.get(actual)) {
            if (!visitados.contains(vecino)) {
                dfsUtil(vecino, visitados, resultado);
            }
        }
    }

    public int contarVertices() {
        return adyacencias.size();
    }
}

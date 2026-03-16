export function* bfs(graph, startNodeId) {
    if (!graph.nodes.has(startNodeId)) return;

    const visited = new Set();
    const queue = [startNodeId];
    visited.add(startNodeId);

    const adjList = graph.getAdjacencyList();

    yield {
        currentNode: startNodeId,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Iniciando BFS desde el nodo ${startNodeId}`
    };

    while (queue.length > 0) {
        const currentNode = queue.shift();

        yield {
            currentNode: currentNode,
            visitedNodes: Array.from(visited),
            activeEdges: [],
            log: `Visitando nodo ${currentNode}, sacando de la cola`
        };

        const neighbors = adjList.get(currentNode) || [];

        for (const neighbor of neighbors) {
            const nextNode = neighbor.target;

            yield {
                currentNode: currentNode,
                visitedNodes: Array.from(visited),
                activeEdges: [{ source: currentNode, target: nextNode }],
                log: `Explorando arista de ${currentNode} a ${nextNode}`
            };

            if (!visited.has(nextNode)) {
                visited.add(nextNode);
                queue.push(nextNode);

                yield {
                    currentNode: nextNode,
                    visitedNodes: Array.from(visited),
                    activeEdges: [{ source: currentNode, target: nextNode }],
                    log: `Nodo ${nextNode} no visitado, marcando y encolando`
                };
            } else {
                yield {
                    currentNode: currentNode,
                    visitedNodes: Array.from(visited),
                    activeEdges: [{ source: currentNode, target: nextNode }],
                    log: `Nodo ${nextNode} ya visitado, se ignora`
                };
            }
        }
    }

    yield {
        currentNode: null,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `BFS completado. Nodos visitados: ${Array.from(visited).join(', ')}`
    };
}

export function* dfs(graph, startNodeId) {
    if (!graph.nodes.has(startNodeId)) return;

    const visited = new Set();
    const adjList = graph.getAdjacencyList();

    yield {
        currentNode: startNodeId,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Iniciando DFS desde el nodo ${startNodeId}`
    };

    function* dfsRecursive(node, fromNode = null) {
        visited.add(node);

        let activeEdges = [];
        if (fromNode !== null) {
            activeEdges.push({ source: fromNode, target: node });
        }

        yield {
            currentNode: node,
            visitedNodes: Array.from(visited),
            activeEdges: activeEdges,
            log: `Visitando nodo ${node}`
        };

        const neighbors = adjList.get(node) || [];

        for (const neighbor of neighbors) {
            const nextNode = neighbor.target;

            yield {
                currentNode: node,
                visitedNodes: Array.from(visited),
                activeEdges: [{ source: node, target: nextNode }],
                log: `Explorando arista de ${node} a ${nextNode}`
            };

            if (!visited.has(nextNode)) {
                yield* dfsRecursive(nextNode, node);
            } else {
                yield {
                    currentNode: node,
                    visitedNodes: Array.from(visited),
                    activeEdges: [{ source: node, target: nextNode }],
                    log: `Nodo ${nextNode} ya visitado, se ignora`
                };
            }

            yield {
                currentNode: node,
                visitedNodes: Array.from(visited),
                activeEdges: [],
                log: `Volviendo al nodo ${node}`
            };
        }
    }

    yield* dfsRecursive(startNodeId);

    yield {
        currentNode: null,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `DFS completado. Nodos visitados: ${Array.from(visited).join(', ')}`
    };
}

export function* dijkstra(graph, startNodeId, endNodeId = 'none') {
    if (!graph.nodes.has(startNodeId)) return;

    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set(graph.nodes.keys());
    const adjList = graph.getAdjacencyList();

    // Inicializar distancias
    for (const id of graph.nodes.keys()) {
        distances.set(id, Infinity);
        previous.set(id, null);
    }
    distances.set(startNodeId, 0);

    yield {
        currentNode: null,
        visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
        activeEdges: [],
        distances: new Map(distances),
        log: `Iniciando Dijkstra. Distancia a ${startNodeId} = 0, resto Infinity.`
    };

    while (unvisited.size > 0) {
        // Encontrar nodo no visitado con la mínima distancia
        let minDistance = Infinity;
        let currentNode = null;

        for (const node of unvisited) {
            if (distances.get(node) <= minDistance) {
                minDistance = distances.get(node);
                currentNode = node;
            }
        }

        if (currentNode === null || minDistance === Infinity) {
            break; // Nodos restantes son inalcanzables
        }

        unvisited.delete(currentNode);

        yield {
            currentNode: currentNode,
            visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
            activeEdges: previous.get(currentNode) !== null ? [{ source: previous.get(currentNode), target: currentNode }] : [],
            distances: new Map(distances),
            previous: new Map(previous),
            log: `Seleccionando nodo ${currentNode} con distancia mínima ${minDistance}`
        };

        if (endNodeId !== 'none' && currentNode === parseInt(endNodeId)) {
            yield {
                currentNode: currentNode,
                visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
                activeEdges: [],
                distances: new Map(distances),
                previous: new Map(previous),
                log: `Nodo destino ${endNodeId} alcanzado. Terminando búsqueda prematuramente.`
            };
            break;
        }

        const neighbors = adjList.get(currentNode) || [];

        for (const neighbor of neighbors) {
            const nextNode = neighbor.target;
            const weight = neighbor.weight;

            if (unvisited.has(nextNode)) {
                yield {
                    currentNode: currentNode,
                    visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
                    activeEdges: [{ source: currentNode, target: nextNode }],
                    distances: new Map(distances),
                    log: `Evaluando camino hacia ${nextNode} a través de ${currentNode}`
                };

                const altDistance = distances.get(currentNode) + weight;

                if (altDistance < distances.get(nextNode)) {
                    distances.set(nextNode, altDistance);
                    previous.set(nextNode, currentNode);

                    yield {
                        currentNode: currentNode,
                        visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
                        activeEdges: [{ source: currentNode, target: nextNode }],
                        distances: new Map(distances),
                        log: `Nueva distancia mínima encontrada para ${nextNode}: ${altDistance}`
                    };
                } else {
                    yield {
                        currentNode: currentNode,
                        visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
                        activeEdges: [{ source: currentNode, target: nextNode }],
                        distances: new Map(distances),
                        log: `Distancia existente a ${nextNode} (${distances.get(nextNode)}) es menor. No se actualiza.`
                    };
                }
            }
        }
    }

    yield {
        currentNode: null,
        visitedNodes: Array.from(graph.nodes.keys()).filter(id => !unvisited.has(id)),
        activeEdges: [],
        distances: new Map(distances),
        previous: new Map(previous),
        log: `Dijkstra completado. Todas las distancias mínimas calculadas desde ${startNodeId}.`
    };
}

export function* hasCycle(graph) {
    const visited = new Set();
    const adjList = graph.getAdjacencyList();
    const isDirected = graph.isDirected;

    const recStack = new Set();

    yield {
        currentNode: null,
        visitedNodes: [],
        activeEdges: [],
        log: `Iniciando detección de ciclos en grafo ${isDirected ? 'dirigido' : 'no dirigido'}`
    };

    for (const startNode of graph.nodes.keys()) {
        if (!visited.has(startNode)) {
            if (isDirected) {
                const result = yield* hasCycleDirectedUtil(startNode, visited, recStack, adjList);
                if (result) return true;
            } else {
                const result = yield* hasCycleUndirectedUtil(startNode, visited, -1, adjList);
                if (result) return true;
            }
        }
    }

    yield {
        currentNode: null,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Detección terminada. No se encontraron ciclos.`
    };
    return false;
}

function* hasCycleDirectedUtil(node, visited, recStack, adjList) {
    if (recStack.has(node)) {
        yield {
            currentNode: node,
            visitedNodes: Array.from(visited),
            activeEdges: [],
            log: `🚨 ¡Ciclo detectado! El nodo ${node} ya está en la pila de recursión.`
        };
        return true;
    }
    if (visited.has(node)) {
        return false;
    }

    visited.add(node);
    recStack.add(node);

    yield {
        currentNode: node,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Visitando nodo ${node} (agregado a pila de recursión)`
    };

    const neighbors = adjList.get(node) || [];
    for (const neighbor of neighbors) {
        const nextNode = neighbor.target;

        yield {
            currentNode: node,
            visitedNodes: Array.from(visited),
            activeEdges: [{ source: node, target: nextNode }],
            log: `Explorando arista hacia ${nextNode}`
        };

        const result = yield* hasCycleDirectedUtil(nextNode, visited, recStack, adjList);
        if (result) return true;
    }

    recStack.delete(node);
    yield {
        currentNode: node,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Retrocediendo desde nodo ${node} (eliminado de pila de recursión)`
    };
    return false;
}

function* hasCycleUndirectedUtil(node, visited, parent, adjList) {
    visited.add(node);

    let activeEdges = [];
    if (parent !== -1 && parent !== null) {
        activeEdges.push({ source: parent, target: node });
    }

    yield {
        currentNode: node,
        visitedNodes: Array.from(visited),
        activeEdges: activeEdges,
        log: `Visitando nodo ${node}`
    };

    const neighbors = adjList.get(node) || [];
    for (const neighbor of neighbors) {
        const nextNode = neighbor.target;

        yield {
            currentNode: node,
            visitedNodes: Array.from(visited),
            activeEdges: [{ source: node, target: nextNode }],
            log: `Explorando arista hacia ${nextNode}`
        };

        if (!visited.has(nextNode)) {
            const result = yield* hasCycleUndirectedUtil(nextNode, visited, node, adjList);
            if (result) return true;
        } else if (nextNode !== parent) {
            yield {
                currentNode: node,
                visitedNodes: Array.from(visited),
                activeEdges: [{ source: node, target: nextNode }],
                log: `¡Ciclo detectado! El nodo ${nextNode} ya fue visitado y no es el nodo padre directo.`
            };
            return true;
        }
    }

    yield {
        currentNode: node,
        visitedNodes: Array.from(visited),
        activeEdges: [],
        log: `Retrocediendo desde nodo ${node}`
    };
    return false;
}

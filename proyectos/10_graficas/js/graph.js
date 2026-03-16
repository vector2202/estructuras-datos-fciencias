export class GraphNode {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }
}

export class GraphEdge {
    constructor(sourceId, targetId, weight = 1) {
        this.source = sourceId;
        this.target = targetId;
        this.weight = weight;
    }
}

export class Graph {
    constructor(isDirected = false, isWeighted = false) {
        this.nodes = new Map();
        this.edges = [];
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.nextNodeId = 0;
    }

    addNode(x, y) {
        const id = this.nextNodeId++;
        const node = new GraphNode(id, x, y);
        this.nodes.set(id, node);
        return id;
    }

    removeNode(id) {
        if (!this.nodes.has(id)) return false;
        this.nodes.delete(id);
        // Remove connected edges
        this.edges = this.edges.filter(e => e.source !== id && e.target !== id);
        return true;
    }

    clear() {
        this.nodes.clear();
        this.edges = [];
        this.nextNodeId = 0;
    }

    addEdge(source, target, weight = 1) {
        if (!this.nodes.has(source) || !this.nodes.has(target)) return false;

        if (!this.isWeighted) weight = 1;

        // Check if edge already exists
        const existingIndex = this.edges.findIndex(e =>
            (e.source === source && e.target === target) ||
            (!this.isDirected && e.source === target && e.target === source)
        );

        if (existingIndex !== -1) {
            // Update weight if exists
            this.edges[existingIndex].weight = weight;
        } else {
            this.edges.push(new GraphEdge(source, target, weight));
        }
        return true;
    }

    removeEdge(source, target) {
        this.edges = this.edges.filter(e =>
            !(e.source === source && e.target === target) &&
            !(!this.isDirected && e.source === target && e.target === source)
        );
    }

    getAdjacencyMatrix() {
        const nodeIds = Array.from(this.nodes.keys()).sort((a, b) => a - b);
        const size = nodeIds.length;
        const matrix = Array(size).fill(0).map(() => Array(size).fill(0));

        // Map node id to matrix index
        const idToIndex = new Map();
        nodeIds.forEach((id, index) => idToIndex.set(id, index));

        for (const edge of this.edges) {
            const i = idToIndex.get(edge.source);
            const j = idToIndex.get(edge.target);

            if (i !== undefined && j !== undefined) {
                matrix[i][j] = edge.weight;
                if (!this.isDirected) {
                    matrix[j][i] = edge.weight;
                }
            }
        }

        return { matrix, nodeIds };
    }

    getAdjacencyList() {
        const list = new Map();
        const nodeIds = Array.from(this.nodes.keys()).sort((a, b) => a - b);

        for (const id of nodeIds) {
            list.set(id, []);
        }

        for (const edge of this.edges) {
            if (this.nodes.has(edge.source) && this.nodes.has(edge.target)) {
                list.get(edge.source).push({ target: edge.target, weight: edge.weight });
                if (!this.isDirected) {
                    list.get(edge.target).push({ target: edge.source, weight: edge.weight });
                }
            }
        }

        // Sort destinations for consistent display
        for (const [id, edges] of list.entries()) {
            edges.sort((a, b) => a.target - b.target);
        }

        return list;
    }

    setType(directed, weighted) {
        this.isDirected = directed;
        this.isWeighted = weighted;

        if (!weighted) {
            this.edges.forEach(e => e.weight = 1);
        }
    }
}

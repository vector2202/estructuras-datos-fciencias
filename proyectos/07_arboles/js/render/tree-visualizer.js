export class TreeVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.classList.add("canvas");
        this.svg.style.width = "100%";
        this.svg.style.height = "100%";
        this.container.appendChild(this.svg);
        this.nodeRadius = 20;
        this.animationSpeed = 500;

        window.addEventListener('speedChange', (e) => {
            if (e.detail > 0) {
                this.animationSpeed = 1000 / e.detail;
            }
        });

        new ResizeObserver(() => {
            if (this.lastRoot) this.draw(this.lastRoot);
        }).observe(this.container);
        this.nodesMap = new Map(); // value -> { group, circle, text, x, y }
        this.edgesMap = new Map(); // key (val1-val2) -> line
    }

    async sleep(ms = this.animationSpeed) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    clear() {
        this.svg.innerHTML = "";
        this.nodesMap.clear();
        this.edgesMap.clear();
    }

    draw(root) {
        this.lastRoot = root;
        if (!root) {
            this.clear();
            return;
        }

        const width = this.container.clientWidth;

        const positions = new Map(); // value -> {x, y}
        this.calculatePositions(root, width / 2, 50, width / 4, positions);

        const edges = [];
        this.collectEdges(root, edges);

        this.updateEdges(edges, positions);
        this.updateNodes(positions);
    }

    calculatePositions(node, x, y, offset, positions) {
        if (!node) return;
        positions.set(node.value, { x, y });

        const nextOffset = Math.max(offset / 2, 30);
        this.calculatePositions(node.left, x - offset, y + 80, nextOffset, positions);
        this.calculatePositions(node.right, x + offset, y + 80, nextOffset, positions);
    }

    collectEdges(node, edges) {
        if (!node) return;
        if (node.left) {
            edges.push({ from: node.value, to: node.left.value });
            this.collectEdges(node.left, edges);
        }
        if (node.right) {
            edges.push({ from: node.value, to: node.right.value });
            this.collectEdges(node.right, edges);
        }
    }

    updateNodes(positions) {
        for (const [val, el] of this.nodesMap) {
            if (!positions.has(val)) {
                this.svg.removeChild(el.group);
                this.nodesMap.delete(val);
            }
        }

        for (const [val, pos] of positions) {
            let nodeEl = this.nodesMap.get(val);

            if (!nodeEl) {
                const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.setAttribute("class", "node-group");
                g.setAttribute("id", `node-${val}`);

                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("r", this.nodeRadius);
                circle.setAttribute("class", "node-circle");
                circle.setAttribute("cx", pos.x);
                circle.setAttribute("cy", pos.y);

                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("class", "node-text");
                text.textContent = val;
                text.setAttribute("x", pos.x);
                text.setAttribute("y", pos.y);

                g.appendChild(circle);
                g.appendChild(text);

                this.svg.appendChild(g);
                this.nodesMap.set(val, { group: g, circle, text, ...pos });
            } else {
                nodeEl.circle.setAttribute("cx", pos.x);
                nodeEl.circle.setAttribute("cy", pos.y);
                nodeEl.text.setAttribute("x", pos.x);
                nodeEl.text.setAttribute("y", pos.y);

                nodeEl.x = pos.x;
                nodeEl.y = pos.y;
            }
        }
    }

    updateEdges(edges, positions) {
        const newEdgeKeys = new Set(edges.map(e => `${e.from}-${e.to}`));

        for (const [key, line] of this.edgesMap) {
            if (!newEdgeKeys.has(key)) {
                this.svg.removeChild(line);
                this.edgesMap.delete(key);
            }
        }

        for (const edge of edges) {
            const key = `${edge.from}-${edge.to}`;
            const start = positions.get(edge.from);
            const end = positions.get(edge.to);

            if (!start || !end) continue;

            let line = this.edgesMap.get(key);
            if (!line) {
                line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("class", "edge");
                if (this.svg.firstChild) {
                    this.svg.insertBefore(line, this.svg.firstChild);
                } else {
                    this.svg.appendChild(line);
                }
                this.edgesMap.set(key, line);
            }

            // Update position
            line.setAttribute("x1", start.x);
            line.setAttribute("y1", start.y);
            line.setAttribute("x2", end.x);
            line.setAttribute("y2", end.y);
        }
    }

    async highlightNode(value, type = "highlight-node") {
        const nodeEl = this.nodesMap.get(value);
        if (nodeEl) {
            nodeEl.group.classList.remove("highlight-node", "visiting-node", "found-node");
            if (type) nodeEl.group.classList.add(type);
        }
    }

    async removeHighlight(value) {
        const nodeEl = this.nodesMap.get(value);
        if (nodeEl) {
            nodeEl.group.classList.remove("highlight-node", "visiting-node", "found-node");
        }
    }

    async clearHighlights() {
        for (const [val, nodeEl] of this.nodesMap) {
            nodeEl.group.classList.remove("highlight-node", "visiting-node", "found-node");
        }
    }

    async showMessage(msg) {
        if (this.onMessage) this.onMessage(msg);
        else console.log(msg);
    }
}

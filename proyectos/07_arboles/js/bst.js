// BSTNode is defined below

export class BSTNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

export class BST {
    constructor(visualizer) {
        this.root = null;
        this.visualizer = visualizer;
    }

    async insert(value) {
        this.visualizer.showMessage(`Insertando ${value}...`);
        if (!this.root) {
            this.root = new BSTNode(value);
            this.visualizer.draw(this.root);
            await this.visualizer.highlightNode(value, "visiting-node"); // Highlight creation
            await this.visualizer.sleep();
            this.visualizer.showMessage(`Raíz ${value} creada.`);
            return;
        }
        await this.visualizer.highlightNode(this.root.value, "visiting-node"); // Start at root
        await this.visualizer.sleep(300);
        await this._insert(this.root, value);
        this.visualizer.draw(this.root); // Redraw to ensure correct positions
        await this.visualizer.highlightNode(value, "found-node");
        this.visualizer.showMessage(`Insertado ${value}.`);
    }

    async _insert(node, value) {
        this.visualizer.draw(this.root);
        await this.visualizer.highlightNode(node.value, "visiting-node");
        await this.visualizer.sleep();

        if (value < node.value) {
            if (!node.left) {
                node.left = new BSTNode(value);
                this.visualizer.draw(this.root);
                await this.visualizer.highlightNode(node.left.value, "found-node");
            } else {
                await this._insert(node.left, value);
            }
        } else if (value > node.value) {
            if (!node.right) {
                node.right = new BSTNode(value);
                this.visualizer.draw(this.root);
                await this.visualizer.highlightNode(node.right.value, "found-node");
            } else {
                await this._insert(node.right, value);
            }
        } else {
            this.visualizer.showMessage(`${value} ya existe en el árbol.`);
        }
    }

    async remove(value) {
        this.visualizer.showMessage(`Buscando ${value} para eliminar...`);
        this.root = await this._remove(this.root, value);
        this.visualizer.draw(this.root);
        this.visualizer.showMessage(`Eliminación completada.`);
    }

    async _remove(node, value) {
        if (!node) {
            this.visualizer.showMessage(`${value} no encontrado.`);
            return null;
        }

        this.visualizer.highlightNode(node.value, "visiting-node");
        await this.visualizer.sleep();

        if (value < node.value) {
            node.left = await this._remove(node.left, value);
        } else if (value > node.value) {
            node.right = await this._remove(node.right, value);
        } else {
            // Node found
            await this.visualizer.highlightNode(node.value, "highlight-node"); // Red for found to delete
            this.visualizer.showMessage(`Eliminando ${value}...`);
            await this.visualizer.sleep();

            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Two children
            this.visualizer.showMessage(`Buscando sucesor (mínimo del subárbol derecho)...`);
            let min = await this._min(node.right);
            node.value = min.value;
            this.visualizer.draw(this.root); // Update value visually
            await this.visualizer.highlightNode(node.value, "visiting-node");
            this.visualizer.showMessage(`Reemplazado con ${min.value}. Eliminando duplicado...`);
            await this.visualizer.sleep();

            node.right = await this._remove(node.right, min.value);
        }
        return node;
    }

    async _min(node) {
        while (node.left) {
            await this.visualizer.highlightNode(node.value, "visiting-node");
            await this.visualizer.sleep();
            node = node.left;
        }
        await this.visualizer.highlightNode(node.value, "found-node");
        return node;
    }

    async search(value) {
        this.visualizer.showMessage(`Buscando ${value}...`);
        let current = this.root;
        while (current) {
            await this.visualizer.highlightNode(current.value, "visiting-node");
            await this.visualizer.sleep();

            if (value === current.value) {
                await this.visualizer.highlightNode(current.value, "found-node");
                this.visualizer.showMessage(`Encontrado ${value}.`);
                return true;
            }
            current = value < current.value ? current.left : current.right;
        }
        this.visualizer.showMessage(`${value} no encontrado.`);
        return false;
    }

    async traverse(type) {
        this.visualizer.showMessage(`Recorrido ${type}...`);
        let result = [];
        await this._traverseRecursive(this.root, type, result);
        this.visualizer.showMessage(`Recorrido completado: ${result.join(", ")}`);
        return result;
    }

    async _traverseRecursive(node, type, result) {
        if (!node) return;

        if (type === "pre") {
            await this.visit(node, result);
        }

        await this._traverseRecursive(node.left, type, result);

        if (type === "in") {
            await this.visit(node, result);
        }

        await this._traverseRecursive(node.right, type, result);

        if (type === "post") {
            await this.visit(node, result);
        }
    }

    async visit(node, result) {
        result.push(node.value);
        await this.visualizer.highlightNode(node.value, "visiting-node");
        await this.visualizer.sleep();
    }
}

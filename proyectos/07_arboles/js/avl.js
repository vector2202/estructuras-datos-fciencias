class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.x = 0;
        this.y = 0;
    }
}

export class AVL {
    constructor(visualizer) {
        this.root = null;
        this.visualizer = visualizer;
        this.rootWrapper = { left: null };
    }

    async sleep() {
        await this.visualizer.sleep();
    }

    height(node) {
        return node ? node.height : 0;
    }

    balanceFactor(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    async rotateRight(y, parent, link) {
        const x = y.left;
        const T2 = x.right;

        this.visualizer.showMessage(`Rotación Derecha: ${x.value} sube, ${y.value} baja.`);
        await this.visualizer.highlightNode(y.value, "highlight-node");
        await this.visualizer.highlightNode(x.value, "found-node");
        if (T2) await this.visualizer.highlightNode(T2.value, "visiting-node");
        await this.sleep(800);

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        if (parent) {
            parent[link] = x;
        } else {
            this.root = x;
        }

        this.visualizer.draw(this.root);
        await this.sleep(1200);
        await this.visualizer.removeHighlight(y.value);
        await this.visualizer.removeHighlight(x.value);
        if (T2) await this.visualizer.removeHighlight(T2.value);

        return x;
    }

    async rotateLeft(x, parent, link) {
        const y = x.right;
        const T2 = y.left;

        this.visualizer.showMessage(`Rotación Izquierda: ${y.value} sube, ${x.value} baja.`);
        await this.visualizer.highlightNode(x.value, "highlight-node");
        await this.visualizer.highlightNode(y.value, "found-node");
        if (T2) await this.visualizer.highlightNode(T2.value, "visiting-node");
        await this.sleep(800);

        // Perform rotation
        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        if (parent) {
            parent[link] = y;
        } else {
            this.root = y;
        }

        this.visualizer.draw(this.root);
        await this.sleep(1200);

        await this.visualizer.removeHighlight(x.value);
        await this.visualizer.removeHighlight(y.value);
        if (T2) await this.visualizer.removeHighlight(T2.value);

        return y;
    }

    async insert(value) {
        this.visualizer.showMessage(`Insertando ${value}...`);
        if (!this.root) {
            this.root = new AVLNode(value);
            this.visualizer.draw(this.root);
            await this.visualizer.highlightNode(value, "visiting-node");
            await this.sleep();
            this.visualizer.showMessage(`Raíz ${value} creada.`);
            return;
        }
        await this.visualizer.highlightNode(this.root.value, "visiting-node");
        await this.visualizer.sleep(300);

        this.root = await this._insert(this.root, value, null, null);
        this.visualizer.draw(this.root); // Final draw
        this.visualizer.showMessage(`Insertado ${value}.`);
    }

    async _insert(node, value, parent, link) {
        if (!node) {
            return new AVLNode(value);
        }

        // Only highlight traversal
        this.visualizer.draw(this.root);
        await this.visualizer.highlightNode(node.value, "visiting-node");
        await this.sleep(300);

        if (value < node.value) {
            node.left = await this._insert(node.left, value, node, 'left');
        } else if (value > node.value) {
            node.right = await this._insert(node.right, value, node, 'right');
        } else {
            this.visualizer.showMessage(`${value} ya existe.`);
            return node;
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balance = this.balanceFactor(node);

        // Balance checks
        if (balance > 1 && value < node.left.value) {
            this.visualizer.showMessage(`Desbalance detectado en ${node.value} (Izq-Izq)`);
            return await this.rotateRight(node, parent, link);
        }

        if (balance < -1 && value > node.right.value) {
            this.visualizer.showMessage(`Desbalance detectado en ${node.value} (Der-Der)`);
            return await this.rotateLeft(node, parent, link);
        }

        if (balance > 1 && value > node.left.value) {
            this.visualizer.showMessage(`Desbalance detectado en ${node.value} (Izq-Der)`);
            node.left = await this.rotateLeft(node.left, node, 'left');

            this.visualizer.draw(this.root);
            await this.sleep(500);

            return await this.rotateRight(node, parent, link);
        }

        if (balance < -1 && value < node.right.value) {
            this.visualizer.showMessage(`Desbalance detectado en ${node.value} (Der-Izq)`);
            node.right = await this.rotateRight(node.right, node, 'right');

            this.visualizer.draw(this.root);
            await this.sleep(500);

            return await this.rotateLeft(node, parent, link);
        }

        return node;
    }

    async remove(value) {
        this.visualizer.showMessage(`Eliminando ${value}...`);
        this.root = await this._remove(this.root, value, null, null);
        this.visualizer.draw(this.root);
        this.visualizer.showMessage(`Eliminado ${value}.`);
    }

    async _remove(node, value, parent, link) {
        if (!node) return null;

        await this.visualizer.highlightNode(node.value, "visiting-node");
        await this.sleep(300);

        if (value < node.value) {
            node.left = await this._remove(node.left, value, node, 'left');
        } else if (value > node.value) {
            node.right = await this._remove(node.right, value, node, 'right');
        } else {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                let temp = node.right;
                while (temp.left) temp = temp.left;
                node.value = temp.value;
                node.right = await this._remove(node.right, temp.value, node, 'right');
            }
        }

        if (!node) return node;

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balance = this.balanceFactor(node);

        // Rotation checks
        if (balance > 1 && this.balanceFactor(node.left) >= 0) {
            return await this.rotateRight(node, parent, link);
        }

        if (balance > 1 && this.balanceFactor(node.left) < 0) {
            node.left = await this.rotateLeft(node.left, node, 'left');
            this.visualizer.draw(this.root);
            await this.sleep(500);
            return await this.rotateRight(node, parent, link);
        }

        if (balance < -1 && this.balanceFactor(node.right) <= 0) {
            return await this.rotateLeft(node, parent, link);
        }

        if (balance < -1 && this.balanceFactor(node.right) > 0) {
            node.right = await this.rotateRight(node.right, node, 'right');
            this.visualizer.draw(this.root);
            await this.sleep(500);
            return await this.rotateLeft(node, parent, link);
        }

        return node;
    }

    async search(value) {
        this.visualizer.showMessage(`Buscando ${value}...`);
        let current = this.root;
        while (current) {
            await this.visualizer.highlightNode(current.value, "visiting-node");
            await this.sleep();
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
        await this.sleep();
    }
}

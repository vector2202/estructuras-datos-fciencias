class HeapVisualizer {
    constructor() {
        this.heap = [];
        this.type = 'min'; // 'min' or 'max'
        this.isAnimating = false;
        this.speed = 1000;

        // DOM elements
        this.canvas = document.getElementById('heapCanvas');
        this.arrayView = document.getElementById('arrayRepresentation');
        this.explanation = document.getElementById('explanationText');
        this.stepInfo = document.getElementById('stepInfo');
        this.speedSlider = document.getElementById('speedSlider');
        this.speedValue = document.getElementById('speedValue');

        this.init();
    }

    init() {
        document.getElementById('btnInsert').addEventListener('click', () => this.handleInsert());
        document.getElementById('btnDelete').addEventListener('click', () => this.handleDelete());
        document.getElementById('btnRandom').addEventListener('click', () => this.handleRandom());
        document.getElementById('btnReset').addEventListener('click', () => this.reset());

        this.speedSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.speedValue.textContent = val.toFixed(1) + 'x';
            this.speed = 1000 / val;
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.type = btn.dataset.type;
                this.reset();
            });
        });

        this.render();
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms || this.speed));
    }

    setExplanation(text, step = "") {
        this.explanation.textContent = text;
        this.stepInfo.textContent = step;
    }

    async handleInsert() {
        if (this.isAnimating) return;
        const input = document.getElementById('heapValue');
        const val = parseInt(input.value);
        if (isNaN(val)) return;

        input.value = '';
        this.isAnimating = true;
        await this.insert(val);
        this.isAnimating = false;
    }

    async insert(val) {
        this.setExplanation(`Insertando ${val} al final del heap.`);
        this.heap.push(val);
        this.render();
        await this.sleep();

        await this.heapifyUp(this.heap.length - 1);
        this.setExplanation(`Inserción de ${val} completada.`);
        this.render();
    }

    async heapifyUp(index) {
        if (index === 0) return;

        let parentIndex = Math.floor((index - 1) / 2);
        this.render(index, parentIndex);
        this.setExplanation(`Comparando nodo en índice ${index} (${this.heap[index]}) con su padre en ${parentIndex} (${this.heap[parentIndex]})`);
        await this.sleep();

        let shouldSwap = false;
        if (this.type === 'min') {
            shouldSwap = this.heap[index] < this.heap[parentIndex];
        } else {
            shouldSwap = this.heap[index] > this.heap[parentIndex];
        }

        if (shouldSwap) {
            this.setExplanation(`Intercambiando: ${this.heap[index]} es ${this.type === 'min' ? 'menor' : 'mayor'} que ${this.heap[parentIndex]}`);
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this.render(index, parentIndex, true);
            await this.sleep();
            await this.heapifyUp(parentIndex);
        } else {
            this.setExplanation(`No hace falta intercambiar. Propiedad de ${this.type}-heap satisfecha.`);
            await this.sleep();
        }
    }

    async handleDelete() {
        if (this.isAnimating || this.heap.length === 0) return;
        this.isAnimating = true;
        await this.extractRoot();
        this.isAnimating = false;
    }

    async extractRoot() {
        const root = this.heap[0];
        this.setExplanation(`Eliminando la raíz (${root}).`);
        this.render(0);
        await this.sleep();

        if (this.heap.length === 1) {
            this.heap.pop();
        } else {
            const last = this.heap.pop();
            this.setExplanation(`Moviendo el último elemento (${last}) a la raíz.`);
            this.heap[0] = last;
            this.render(0);
            await this.sleep();
            await this.heapifyDown(0);
        }

        this.setExplanation(`Eliminación completada.`);
        this.render();
    }

    async heapifyDown(index) {
        let leftIdx = 2 * index + 1;
        let rightIdx = 2 * index + 2;
        let smallestOrLargest = index;

        this.setExplanation(`Revisando hijos de ${this.heap[index]} (índice ${index})`);
        this.render(index);
        await this.sleep();

        if (leftIdx < this.heap.length) {
            let leftCompare = false;
            if (this.type === 'min') {
                leftCompare = this.heap[leftIdx] < this.heap[smallestOrLargest];
            } else {
                leftCompare = this.heap[leftIdx] > this.heap[smallestOrLargest];
            }
            if (leftCompare) smallestOrLargest = leftIdx;
        }

        if (rightIdx < this.heap.length) {
            let rightCompare = false;
            if (this.type === 'min') {
                rightCompare = this.heap[rightIdx] < this.heap[smallestOrLargest];
            } else {
                rightCompare = this.heap[rightIdx] > this.heap[smallestOrLargest];
            }
            if (rightCompare) smallestOrLargest = rightIdx;
        }

        if (smallestOrLargest !== index) {
            this.setExplanation(`Hijo en ${smallestOrLargest} (${this.heap[smallestOrLargest]}) es ${this.type === 'min' ? 'menor' : 'mayor'}. Intercambiando.`);
            this.render(index, smallestOrLargest);
            await this.sleep();

            [this.heap[index], this.heap[smallestOrLargest]] = [this.heap[smallestOrLargest], this.heap[index]];
            this.render(index, smallestOrLargest, true);
            await this.sleep();
            await this.heapifyDown(smallestOrLargest);
        } else {
            this.setExplanation(`La propiedad del heap se mantiene.`);
            await this.sleep();
        }
    }

    handleRandom() {
        if (this.isAnimating) return;
        this.reset();
        for (let i = 0; i < 7; i++) {
            const val = Math.floor(Math.random() * 99) + 1;
            this.heap.push(val);
        }

        // Build heap
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.simpleHeapifyDown(i);
        }
        this.render();
        this.setExplanation(`Heap aleatorio generado.`);
    }

    simpleHeapifyDown(i) {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let target = i;
        if (this.type === 'min') {
            if (l < this.heap.length && this.heap[l] < this.heap[target]) target = l;
            if (r < this.heap.length && this.heap[r] < this.heap[target]) target = r;
        } else {
            if (l < this.heap.length && this.heap[l] > this.heap[target]) target = l;
            if (r < this.heap.length && this.heap[r] > this.heap[target]) target = r;
        }
        if (target !== i) {
            [this.heap[i], this.heap[target]] = [this.heap[target], this.heap[i]];
            this.simpleHeapifyDown(target);
        }
    }

    reset() {
        this.heap = [];
        this.isAnimating = false;
        this.render();
        this.setExplanation("Listo para comenzar", "Escoge una operación");
    }

    // --- Rendering Logic ---

    render(activeIdx1 = -1, activeIdx2 = -1, isSwap = false) {
        this.canvas.innerHTML = '';
        this.arrayView.innerHTML = '';

        if (this.heap.length === 0) {
            this.canvas.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#94a3b8">Heap Vacío</text>';
            return;
        }

        const nodePositions = this.calculateNodePositions();

        for (let i = 0; i < this.heap.length; i++) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            if (left < this.heap.length) this.drawEdge(nodePositions[i], nodePositions[left]);
            if (right < this.heap.length) this.drawEdge(nodePositions[i], nodePositions[right]);
        }

        for (let i = 0; i < this.heap.length; i++) {
            let status = '';
            if (i === activeIdx1 || i === activeIdx2) {
                status = isSwap ? 'swap' : 'highlight';
            }
            this.drawNode(nodePositions[i], this.heap[i], status);
        }

        this.heap.forEach((val, i) => {
            const div = document.createElement('div');
            div.className = 'array-item';
            if (i === activeIdx1 || i === activeIdx2) div.classList.add('active');
            div.innerHTML = `<span class="val">${val}</span><span class="idx">${i}</span>`;
            this.arrayView.appendChild(div);
        });
    }

    calculateNodePositions() {
        const positions = [];
        const canvasWidth = this.canvas.clientWidth || 800;
        const levelHeight = 80;

        for (let i = 0; i < this.heap.length; i++) {
            const level = Math.floor(Math.log2(i + 1));
            const numNodesInLevel = Math.pow(2, level);
            const indexInLevel = i - (numNodesInLevel - 1);

            const x = (canvasWidth / (numNodesInLevel + 1)) * (indexInLevel + 1);
            const y = 50 + (level * levelHeight);

            positions.push({ x, y });
        }
        return positions;
    }

    drawNode(pos, val, status) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

        circle.setAttribute("cx", pos.x);
        circle.setAttribute("cy", pos.y);
        circle.setAttribute("r", 20);
        circle.classList.add("node-circle");

        if (status === 'highlight') g.classList.add("node-highlight");
        if (status === 'swap') g.classList.add("node-swap");

        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y);
        text.classList.add("node-text");
        text.textContent = val;

        g.appendChild(circle);
        g.appendChild(text);
        this.canvas.appendChild(g);
    }

    drawEdge(p1, p2) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", p1.x);
        line.setAttribute("y1", p1.y);
        line.setAttribute("x2", p2.x);
        line.setAttribute("y2", p2.y);
        line.classList.add("node-edge");
        this.canvas.appendChild(line);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.heapVisualizer = new HeapVisualizer();
});

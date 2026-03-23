export default function initQueue() {
    const canvas = document.getElementById("queue-canvas");
    const explain = document.getElementById("queue-explain");
    const startBtn = document.getElementById("queue-start");

    const documents = ["Reporte.pdf", "Foto.jpg", "Ticket.txt"];
    let isRunning = false;

    async function runSimulation() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        canvas.innerHTML = "";
        explain.textContent = "Iniciando cola de impresión (Cola)...";

        const container = document.createElement("div");
        container.className = "layout-linear";
        canvas.appendChild(container);

        // SVG for arrows
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "connector-svg");
        canvas.appendChild(svg);
        
        function redrawArrows() {
            svg.innerHTML = "";
            const nodes = container.querySelectorAll(".node:not([style*='opacity: 0'])");
            for (let j = 1; j < nodes.length; j++) {
                const prevNode = nodes[j - 1];
                const currNode = nodes[j];
                const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
                arrow.setAttribute("class", "arrow-path");

                const startX = prevNode.offsetLeft + prevNode.offsetWidth;
                const startY = prevNode.offsetTop + (prevNode.offsetHeight / 2);
                const endX = currNode.offsetLeft;
                const endY = currNode.offsetTop + (currNode.offsetHeight / 2);

                arrow.setAttribute("d", `M ${startX} ${startY} L ${endX} ${endY}`);
                svg.appendChild(arrow);
            }
        }

        for (let i = 0; i < documents.length; i++) {
            await new Promise(r => setTimeout(r, 800));
            const node = document.createElement("div");
            node.className = "node";
            node.innerHTML = `
                <span class="node-label">DOC</span>
                <span class="node-value" style="font-size: 0.8rem;">${documents[i]}</span>
            `;
            container.appendChild(node);
            explain.textContent = `Enviando '${documents[i]}' a la cola. Haciendo ENQUEUE al final.`;
            if (i > 0) redrawArrows();
        }

        await new Promise(r => setTimeout(r, 1500));
        explain.textContent = "Impresora lista. Procesando documentos en orden FIFO.";

        while (container.firstChild) {
            await new Promise(r => setTimeout(r, 1200));
            const firstNode = container.firstChild;
            firstNode.classList.add("active");
            explain.textContent = `Imprimiendo '${firstNode.querySelector(".node-value").textContent}'. Haciendo DEQUEUE del frente.`;

            await new Promise(r => setTimeout(r, 1000));
            firstNode.style.transform = "translateY(-50px) scale(0)";
            firstNode.style.opacity = "0";
            await new Promise(r => setTimeout(r, 500));
            firstNode.remove();
            redrawArrows();

            if (container.firstChild) {
                explain.textContent = "Siguiente documento avanzando al frente de la cola.";
            }
        }

        explain.textContent = "Todos los documentos impresos. Simulación de Cola (FIFO) completada.";
        startBtn.disabled = false;
        isRunning = false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", runSimulation);
    }
}
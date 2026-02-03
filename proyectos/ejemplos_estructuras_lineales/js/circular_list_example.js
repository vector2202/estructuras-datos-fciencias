export default function initCircular() {
    const canvas = document.getElementById("circular-canvas");
    const explain = document.getElementById("circular-explain");
    const startBtn = document.getElementById("circular-start");

    const processes = ["Chrome", "VS Code", "Spotify", "Terminal"];
    let isRunning = false;

    async function runSimulation() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        canvas.innerHTML = "";
        explain.textContent = "Iniciando planificador Round Robin (Lista Circular)...";

        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.width = "300px";
        container.style.height = "300px";
        canvas.appendChild(container);

        const nodes = [];
        const radius = 120;
        const centerX = 150;
        const centerY = 150;

        for (let i = 0; i < processes.length; i++) {
            const angle = (i / processes.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;

            const node = document.createElement("div");
            node.className = "node";
            node.style.position = "absolute";
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.innerHTML = `
                <span class="node-label">PROC</span>
                <span class="node-value" style="font-size: 0.8rem;">${processes[i]}</span>
            `;
            container.appendChild(node);
            nodes.push(node);
            await new Promise(r => setTimeout(r, 400));
        }

        // SVG for circular connections
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "connector-svg");
        svg.style.width = "300px";
        svg.style.height = "300px";
        canvas.appendChild(svg);

        for (let i = 0; i < nodes.length; i++) {
            const nextIdx = (i + 1) % nodes.length;
            const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
            arrow.setAttribute("class", "arrow-path");
            arrow.style.stroke = "rgba(255,255,255,0.1)";

            const x1 = nodes[i].offsetLeft + 40;
            const y1 = nodes[i].offsetTop + 40;
            const x2 = nodes[nextIdx].offsetLeft + 40;
            const y2 = nodes[nextIdx].offsetTop + 40;

            // Arco simple entre nodos
            const midX = (x1 + x2) / 2 + (y2 - y1) * 0.2;
            const midY = (y1 + y2) / 2 + (x1 - x2) * 0.2;

            arrow.setAttribute("d", `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`);
            svg.appendChild(arrow);
        }

        await new Promise(r => setTimeout(r, 1000));
        explain.textContent = "Repartiendo tiempo de CPU (Quantum). Cada proceso recibe un turno.";

        for (let cycle = 0; cycle < 2; cycle++) {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add("active");
                explain.textContent = `Proceso '${processes[i]}' ejecutándose...`;
                await new Promise(r => setTimeout(r, 1500));
                nodes[i].classList.remove("active");
            }
        }

        explain.textContent = "Simulación completada. Las listas circulares permiten ciclos infinitos de tareas.";
        startBtn.disabled = false;
        isRunning = false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", runSimulation);
    }
}
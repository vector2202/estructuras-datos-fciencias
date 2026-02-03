export default function initList() {
    const canvas = document.getElementById("list-canvas");
    const explain = document.getElementById("list-explain");
    const startBtn = document.getElementById("list-start");

    const songs = ["Bohemian Rhapsody", "Imagine", "Hotel California"];
    let isRunning = false;

    async function runSimulation() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        canvas.innerHTML = "";
        explain.textContent = "Creando nueva playlist (Lista Enlazada)...";

        const container = document.createElement("div");
        container.className = "layout-linear";
        canvas.appendChild(container);

        // SVG for arrows
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "connector-svg");
        canvas.appendChild(svg);

        for (let i = 0; i < songs.length; i++) {
            await new Promise(r => setTimeout(r, 800));
            const node = document.createElement("div");
            node.className = "node";
            node.innerHTML = `
                <span class="node-label">SONG</span>
                <span class="node-value" style="font-size: 0.8rem; text-align: center;">${songs[i]}</span>
            `;
            container.appendChild(node);
            explain.textContent = `Añadiendo '${songs[i]}'. El nodo anterior ahora apunta a este nuevo nodo.`;

            if (i > 0) {
                const prevNode = container.children[i - 1];
                const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
                arrow.setAttribute("class", "arrow-path");

                const startX = prevNode.offsetLeft + prevNode.offsetWidth;
                const startY = prevNode.offsetTop + (prevNode.offsetHeight / 2);
                const endX = node.offsetLeft;
                const endY = node.offsetTop + (node.offsetHeight / 2);

                arrow.setAttribute("d", `M ${startX} ${startY} L ${endX} ${endY}`);
                arrow.style.stroke = "var(--primary)";
                svg.appendChild(arrow);
            }
        }

        await new Promise(r => setTimeout(r, 1000));
        explain.textContent = "Recorriendo la lista: Pasando de una canción a la siguiente siguiendo los punteros.";

        for (let i = 0; i < container.children.length; i++) {
            container.children[i].classList.add("active");
            await new Promise(r => setTimeout(r, 1000));
            container.children[i].classList.remove("active");
        }

        explain.textContent = "Simulación completada. Las listas enlazadas son ideales para colecciones dinámicas.";
        startBtn.disabled = false;
        isRunning = false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", runSimulation);
    }
}
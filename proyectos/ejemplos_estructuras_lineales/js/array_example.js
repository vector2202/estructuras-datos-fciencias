export default function initArray() {
    const canvas = document.getElementById("array-canvas");
    const explain = document.getElementById("array-explain");
    const startBtn = document.getElementById("array-start");

    const colors = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];
    const labels = ["R", "G", "B", "R", "G", "B"];
    let isRunning = false;

    async function runSimulation() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        canvas.innerHTML = "";
        explain.textContent = "Inicializando buffer de imagen en memoria...";

        const container = document.createElement("div");
        container.className = "layout-linear";
        canvas.appendChild(container);

        for (let i = 0; i < 6; i++) {
            await new Promise(r => setTimeout(r, 600));
            const node = document.createElement("div");
            node.className = "node";
            node.innerHTML = `
                <span class="node-label">INDEX ${i}</span>
                <span class="node-value">${labels[i]}</span>
            `;
            node.style.borderColor = colors[i];
            node.style.boxShadow = `0 0 15px ${colors[i]}44`;
            container.appendChild(node);
            explain.textContent = `Asignando valor '${labels[i]}' a la dirección de memoria base + ${i} * sizeof(pixel).`;
        }

        await new Promise(r => setTimeout(r, 1000));
        explain.textContent = "Acceso aleatorio: Obteniendo valor en el índice 2 (B) en tiempo O(1).";
        container.children[2].classList.add("active");
        container.children[2].style.transform = "scale(1.1) translateY(-10px)";

        await new Promise(r => setTimeout(r, 2000));
        container.children[2].classList.remove("active");
        container.children[2].style.transform = "";
        explain.textContent = "Simulación completada. El arreglo permite acceso instantáneo por índice.";
        startBtn.disabled = false;
        isRunning = false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", runSimulation);
    }
}
export default function initStack() {
    const canvas = document.getElementById("stack-canvas");
    const explain = document.getElementById("stack-explain");
    const startBtn = document.getElementById("stack-start");

    const urls = ["google.com", "github.com", "stackoverflow.com"];
    let isRunning = false;

    async function runSimulation() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        canvas.innerHTML = "";
        explain.textContent = "Iniciando historial de navegación (Pila)...";

        const container = document.createElement("div");
        container.className = "layout-stack";
        canvas.appendChild(container);

        for (let i = 0; i < urls.length; i++) {
            await new Promise(r => setTimeout(r, 800));
            const node = document.createElement("div");
            node.className = "node";
            node.innerHTML = `
                <span class="node-label">URL</span>
                <span class="node-value" style="font-size: 0.8rem;">${urls[i]}</span>
            `;
            container.appendChild(node);
            explain.textContent = `Navegando a '${urls[i]}'. Haciendo PUSH a la pila de historial.`;
        }

        await new Promise(r => setTimeout(r, 1500));
        explain.textContent = "Usuario presiona 'Atrás'. Haciendo POP de la última URL.";

        for (let i = urls.length - 1; i >= 0; i--) {
            await new Promise(r => setTimeout(r, 1200));
            const lastNode = container.lastElementChild;
            if (lastNode) {
                lastNode.style.transform = "translateX(100px) scale(0)";
                lastNode.style.opacity = "0";
                explain.textContent = `Retornando de '${urls[i]}'. El tope de la pila ahora es el elemento anterior.`;
                await new Promise(r => setTimeout(r, 500));
                lastNode.remove();
            }
        }

        explain.textContent = "Historial vacío. Simulación de Pila (LIFO) completada.";
        startBtn.disabled = false;
        isRunning = false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", runSimulation);
    }
}
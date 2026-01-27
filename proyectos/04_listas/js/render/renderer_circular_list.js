export function renderFloatingNode(value) {
    const canvas = document.getElementById("canvasCircular");
    if (!canvas) return;

    const existing = canvas.querySelector(".floating-node-container");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "floating-node-container";
    container.innerHTML = `
        <div class="node floating">${value}</div>
        <div style="color: var(--text-secondary); margin-top: 5px; font-size: 0.8rem;">NEW</div>
    `;
    canvas.appendChild(container);
}

export function renderCircularList(list, currentNode = null, animateArrowFromIndex = -1) {
    const canvas = document.getElementById("canvasCircular");
    if (!canvas) return;
    canvas.innerHTML = "";

    if (!list.head) {
        const wrapper = document.createElement("div");
        wrapper.className = "node-wrapper";
        const nullNode = document.createElement("div");
        nullNode.className = "null-node";
        nullNode.textContent = "Lista vacía";
        wrapper.appendChild(nullNode);
        canvas.appendChild(wrapper);
        return;
    }

    const nodes = list.toArray();

    nodes.forEach((node, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "node-wrapper";

        const nodeDiv = document.createElement("div");
        nodeDiv.className = "node";
        nodeDiv.textContent = node.value;

        if (node === list.head) {
            const head = document.createElement("div");
            head.className = "node-label head";
            head.textContent = "HEAD";
            nodeDiv.appendChild(head);
        }

        if (node === list.tail) {
            const tail = document.createElement("div");
            tail.className = "node-label tail";
            tail.textContent = "TAIL";
            nodeDiv.appendChild(tail);
        }

        if (node === currentNode) {
            const current = document.createElement("div");
            current.className = "node-label current";
            current.textContent = "CURR";
            nodeDiv.appendChild(current);
            nodeDiv.classList.add("highlight");
        }

        wrapper.appendChild(nodeDiv);

        if (index < nodes.length - 1) {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            arrow.textContent = "→";

            if (index === animateArrowFromIndex) {
                arrow.classList.add("grow");
            }

            wrapper.appendChild(arrow);
        }

        canvas.appendChild(wrapper);
    });
}

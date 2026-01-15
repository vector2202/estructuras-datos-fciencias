export function renderCircularList(list, currentNode = null) {
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
            wrapper.appendChild(arrow);
        }

        canvas.appendChild(wrapper);
    });
}

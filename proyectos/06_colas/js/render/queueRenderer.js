export function renderFloatingNode(canvasId, value, isCircular = false) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    removeFloatingNode(canvas);

    const container = document.createElement("div");
    container.className = "floating-node-container";
    container.id = "active-floating-node";

    container.innerHTML = `
        <div class="node floating">${value}</div>
        <div style="color: var(--text-secondary); margin-top: 5px; font-size: 0.8rem;">NEW</div>
    `;

    // Circular Queue: Center Position
    if (isCircular) {
        container.style.position = "absolute";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
    }

    canvas.appendChild(container);
}

function removeFloatingNode(canvas) {
    const explicit = canvas.querySelector("#active-floating-node");
    if (explicit) explicit.remove();

    const existing = canvas.querySelectorAll(".floating-node-container");
    existing.forEach(el => el.remove());
}

function setupLayers(canvas) {
    let nodesLayer = canvas.querySelector(".nodes-layer");
    let pointersLayer = canvas.querySelector(".pointers-layer");

    if (!nodesLayer) {
        canvas.innerHTML = "";

        nodesLayer = document.createElement("div");
        nodesLayer.className = "nodes-layer";
        nodesLayer.style.display = "flex";
        nodesLayer.style.gap = "12px";
        nodesLayer.style.alignItems = "center";
        nodesLayer.style.position = "relative";
        nodesLayer.style.zIndex = "1";
        canvas.appendChild(nodesLayer);

        pointersLayer = document.createElement("div");
        pointersLayer.className = "pointers-layer";
        canvas.style.position = "relative";
        pointersLayer.style.position = "absolute";
        pointersLayer.style.top = "0";
        pointersLayer.style.left = "0";
        pointersLayer.style.width = "100%";
        pointersLayer.style.height = "100%";
        pointersLayer.style.pointerEvents = "none";
        pointersLayer.style.zIndex = "10";
        canvas.appendChild(pointersLayer);
    }
    return { nodesLayer, pointersLayer };
}

function updatePointer(layer, id, text, cls, targetNode, canvas) {
    let pointer = layer.querySelector(`#${id}`);
    if (!pointer) {
        pointer = document.createElement("div");
        pointer.id = id;
        pointer.className = `floating-pointer ${cls}`;
        pointer.textContent = text;
        layer.appendChild(pointer);
    }

    if (targetNode) {
        const nodeRect = targetNode.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const left = nodeRect.left - canvasRect.left + (nodeRect.width / 2);

        let top = 0;
        if (cls.includes("head")) {
            top = nodeRect.top - canvasRect.top - 25;
            pointer.style.transform = "translate(-50%, -100%)";
        } else {
            top = nodeRect.bottom - canvasRect.top + 25;
            pointer.style.transform = "translate(-50%, 0)";
        }

        pointer.style.left = `${left}px`;
        pointer.style.top = `${top}px`;
        pointer.style.opacity = "1";
    } else {
        pointer.style.opacity = "0";
    }
}

export function renderQueue(canvasId, values, frontIndex, tailIndex, highlightIndex = null, animateArrowFromIndex = -1) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    removeFloatingNode(canvas);

    const { nodesLayer, pointersLayer } = setupLayers(canvas);
    nodesLayer.innerHTML = "";

    if (values.length === 0) {
        nodesLayer.innerHTML = "<div class='null-node'>Cola vacía</div>";
        updatePointer(pointersLayer, "ptr-front", "FRONT", "head", null, canvas);
        updatePointer(pointersLayer, "ptr-tail", "TAIL", "tail", null, canvas);
        return;
    }

    let frontNodeEl = null;
    let tailNodeEl = null;

    values.forEach((v, i) => {
        const node = document.createElement("div");
        node.className = "node";
        node.textContent = v;

        if (i === highlightIndex) {
            node.classList.add("highlight-peek");
        }

        if (i === frontIndex) frontNodeEl = node;
        if (i === tailIndex) tailNodeEl = node;

        nodesLayer.appendChild(node);

        if (i < values.length - 1) {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            arrow.textContent = "→";

            if (i === animateArrowFromIndex) {
                arrow.classList.add("grow");
            }

            nodesLayer.appendChild(arrow);
        }
    });

    setTimeout(() => {
        updatePointer(pointersLayer, "ptr-front", "FRONT", "head", frontNodeEl, canvas);
        updatePointer(pointersLayer, "ptr-tail", "TAIL", "tail", tailNodeEl, canvas);
        removeFloatingNode(canvas);
    }, 20);
}

export function renderCircular(canvasId, queue, front, tail, highlightIndex = null, animateArcFromIndex = -1) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    removeFloatingNode(canvas);

    let pointersLayer = canvas.querySelector(".pointers-layer");
    if (!pointersLayer) {
        pointersLayer = document.createElement("div");
        pointersLayer.className = "pointers-layer";
        pointersLayer.style.position = "absolute";
        pointersLayer.style.top = "0";
        pointersLayer.style.left = "0";
        pointersLayer.style.width = "100%";
        pointersLayer.style.height = "100%";
        pointersLayer.style.pointerEvents = "none";
        pointersLayer.style.zIndex = "20";
        canvas.appendChild(pointersLayer);
    }

    Array.from(canvas.children).forEach(child => {
        if (!child.classList.contains("pointers-layer")) {
            child.remove();
        }
    });

    const capacity = queue.length;
    const activeIndices = [];
    let size = 0;
    queue.forEach(v => { if (v !== null) size++; });

    if (size > 0) {
        let curr = front;
        for (let k = 0; k < size; k++) {
            activeIndices.push(curr);
            curr = (curr + 1) % capacity;
        }
    }

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const trackRadius = 140;
    const nodeRadius = 24;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    canvas.insertBefore(svg, pointersLayer);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrowHeadCurved");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("orient", "auto");
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", "0 0, 10 5, 0 10");
    poly.setAttribute("fill", "var(--primary)");
    marker.appendChild(poly);
    defs.appendChild(marker);
    svg.appendChild(defs);

    const trackCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    trackCircle.setAttribute("cx", centerX);
    trackCircle.setAttribute("cy", centerY);
    trackCircle.setAttribute("r", trackRadius);
    trackCircle.setAttribute("fill", "none");
    trackCircle.setAttribute("stroke", "var(--glass-border)");
    trackCircle.setAttribute("stroke-width", "2");
    trackCircle.setAttribute("stroke-opacity", "0.1");
    svg.appendChild(trackCircle);

    if (size === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "null-node";
        emptyMsg.textContent = "Cola Circular Vacía";
        emptyMsg.style.position = "absolute";
        emptyMsg.style.top = "50%";
        emptyMsg.style.left = "50%";
        emptyMsg.style.transform = "translate(-50%, -50%)";
        canvas.insertBefore(emptyMsg, pointersLayer);

        updatePointer(pointersLayer, "c-ptr-front", "FRONT", "head", null, canvas);
        updatePointer(pointersLayer, "c-ptr-tail", "TAIL", "tail", null, canvas);
        return;
    }

    // Connections
    for (let k = 0; k < activeIndices.length - 1; k++) {
        const currIdx = activeIndices[k];
        const nextIdx = activeIndices[k + 1];

        const angle1 = (currIdx * (360 / capacity) - 90) * (Math.PI / 180);
        const angle2 = (nextIdx * (360 / capacity) - 90) * (Math.PI / 180);

        const nodeAngularWidth = (nodeRadius + 12) / trackRadius;

        const startAngle = angle1 + nodeAngularWidth;
        const endAngle = angle2 - nodeAngularWidth;

        const x1 = centerX + trackRadius * Math.cos(startAngle);
        const y1 = centerY + trackRadius * Math.sin(startAngle);
        const x2 = centerX + trackRadius * Math.cos(endAngle);
        const y2 = centerY + trackRadius * Math.sin(endAngle);

        const largeArc = 0;
        const sweep = 1;

        const pathData = `M ${x1} ${y1} A ${trackRadius} ${trackRadius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("stroke", "var(--primary)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("marker-end", "url(#arrowHeadCurved)");

        if (currIdx === animateArcFromIndex) path.classList.add("arc-grow");
        svg.appendChild(path);
    }

    if (size > 1) {
        const tailIdx = activeIndices[activeIndices.length - 1];
        const frontIdx = activeIndices[0];

        const angle1 = (tailIdx * (360 / capacity) - 90) * (Math.PI / 180);
        const angle2 = (frontIdx * (360 / capacity) - 90) * (Math.PI / 180);
        const nodeAngularWidth = (nodeRadius + 12) / trackRadius;

        const startAngle = angle1 + nodeAngularWidth;
        const endAngle = angle2 - nodeAngularWidth;

        const x1 = centerX + trackRadius * Math.cos(startAngle);
        const y1 = centerY + trackRadius * Math.sin(startAngle);
        const x2 = centerX + trackRadius * Math.cos(endAngle);
        const y2 = centerY + trackRadius * Math.sin(endAngle);

        const largeArc = size < (capacity / 2) + 1 ? 1 : 0;
        const sweep = 1;

        const pathData = `M ${x1} ${y1} A ${trackRadius} ${trackRadius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("stroke", "var(--primary)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-dasharray", "5,5");
        path.setAttribute("stroke-opacity", "0.4");
        path.setAttribute("fill", "none");
        path.setAttribute("marker-end", "url(#arrowHeadCurved)");
        svg.appendChild(path);
    }

    let frontNodeEl = null;
    let tailNodeEl = null;

    activeIndices.forEach((idx) => {
        const val = queue[idx];
        const angle = (idx * (360 / capacity) - 90) * (Math.PI / 180);
        const x = centerX + trackRadius * Math.cos(angle);
        const y = centerY + trackRadius * Math.sin(angle);

        const node = document.createElement("div");
        node.className = "node circular-node";
        node.textContent = val;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.transform = "translate(-50%, -50%)";
        node.style.position = "absolute";
        node.style.zIndex = "5";

        if (idx === highlightIndex) node.classList.add("highlight-peek");

        canvas.insertBefore(node, pointersLayer);

        if (idx === front) frontNodeEl = node;
        if (idx === tail) tailNodeEl = node;
    });

    setTimeout(() => {
        function getNodePos(index) {
            const angle = (index * (360 / capacity) - 90) * (Math.PI / 180);
            return {
                x: centerX + trackRadius * Math.cos(angle),
                y: centerY + trackRadius * Math.sin(angle)
            };
        }

        if (front !== null && front !== -1) {
            const pos = getNodePos(front);
            updateCircularPointer(pointersLayer, "c-ptr-front", "FRONT", "head", pos.x, pos.y);
        } else {
            updateCircularPointer(pointersLayer, "c-ptr-front", "FRONT", "head", 0, 0, false);
        }

        if (tail !== null && tail !== -1) {
            const pos = getNodePos(tail);
            updateCircularPointer(pointersLayer, "c-ptr-tail", "TAIL", "tail", pos.x, pos.y);
        } else {
            updateCircularPointer(pointersLayer, "c-ptr-tail", "TAIL", "tail", 0, 0, false);
        }

        removeFloatingNode(canvas);
    }, 20);
}

function updateCircularPointer(layer, id, text, cls, nodeX, nodeY, visible = true) {
    let pointer = layer.querySelector(`#${id}`);
    if (!pointer) {
        pointer = document.createElement("div");
        pointer.id = id;
        pointer.className = `floating-pointer ${cls}`;
        pointer.textContent = text;
        layer.appendChild(pointer);
    }

    if (!visible) {
        pointer.style.opacity = "0";
        return;
    }

    const margin = 35;

    let finalY = 0;

    if (cls.includes("head")) {
        finalY = nodeY - margin;
        pointer.style.transform = "translate(-50%, -100%)";
    } else {
        finalY = nodeY + margin;
        pointer.style.transform = "translate(-50%, 0)";
    }

    pointer.style.left = `${nodeX}px`;
    pointer.style.top = `${finalY}px`;
    pointer.style.opacity = "1";
}

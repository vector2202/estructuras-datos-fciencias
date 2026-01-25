/**
 * Node Class
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Stack Class
 */
class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(value) {
        const newNode = new Node(value);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;
        return newNode;
    }

    pop() {
        if (this.isEmpty()) return null;
        const removed = this.top;
        this.top = this.top.next;
        this.size--;
        return removed;
    }

    peek() {
        return this.top;
    }

    isEmpty() {
        return this.size === 0;
    }
}

/**
 * UI Controller
 */
const stack = new Stack();
const elements = {
    stackDiv: document.getElementById("stack"),
    explanation: document.getElementById("explanation"),
    stepCounter: document.getElementById("stepCounter"),
    referencesDiv: document.getElementById("references"),
    valueInput: document.getElementById("valueInput"),
    pushBtn: document.getElementById("pushBtn"),
    popBtn: document.getElementById("popBtn"),
    peekBtn: document.getElementById("peekBtn"),
    speedSlider: document.getElementById("speedSlider"),
    speedValue: document.getElementById("speedValue")
};

let speedFactor = 1.0;

const UI_DELAY = {
    STEP: 1000,
    LONG: 1500,
    END: 1000
};

if (elements.speedSlider) {
    elements.speedSlider.addEventListener("input", () => {
        speedFactor = parseFloat(elements.speedSlider.value);
        if (elements.speedValue) elements.speedValue.textContent = `${speedFactor.toFixed(1)}x`;
    });
    speedFactor = parseFloat(elements.speedSlider.value);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms / speedFactor));

/**
 * Updates the visual representation
 */
function render(highlightNode = null, highlightClass = null) {
    elements.stackDiv.innerHTML = "";
    let current = stack.top;

    while (current) {
        const div = document.createElement("div");
        div.className = "node";

        if (current === stack.top) {
            div.classList.add("top-element");
        }

        if (current === highlightNode && highlightClass) {
            div.classList.add(highlightClass);
        }

        div.textContent = current.value;
        elements.stackDiv.appendChild(div);

        if (current.next) {
            const arrow = document.createElement("div");
            arrow.className = "stack-arrow";
            arrow.textContent = "↓";
            elements.stackDiv.appendChild(arrow);
        }

        current = current.next;
    }

    renderReferences();
    setTimeout(updateTopPointer, 50);
}

/**
 * Updates the code reference view
 */
function renderReferences() {
    let html = '<span class="keyword">stack.top</span> <span class="operator">→</span> ';
    let current = stack.top;

    if (!current) {
        html += '<span class="null">null</span>';
    } else {
        while (current) {
            html += `<span class="value">[${current.value}]</span> <span class="operator">→</span> `;
            current = current.next;
        }
        html += '<span class="null">null</span>';
    }

    elements.referencesDiv.innerHTML = html;
}

/**
 * UI State helpers
 */
function setBusy(busy) {
    Object.values(elements).forEach(el => {
        if (el instanceof HTMLButtonElement || el instanceof HTMLInputElement) {
            el.disabled = busy;
        }
    });
}

function updateStatus(msg, step = "") {
    elements.explanation.textContent = msg;
    elements.stepCounter.textContent = step;
}

let topPointer = null;

function updateTopPointer() {
    const topNode = elements.stackDiv.querySelector(".top-element");

    if (!topPointer) {
        topPointer = document.createElement("div");
        topPointer.className = "floating-pointer";
        topPointer.textContent = "TOP";
        elements.stackDiv.appendChild(topPointer);
    }

    if (topNode) {
        const containerRect = elements.stackDiv.parentElement.getBoundingClientRect();
        const nodeRect = topNode.getBoundingClientRect();

        const relativeTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);

        topPointer.style.opacity = "1";
        topPointer.style.top = `${relativeTop}px`;
        const stackContainer = document.getElementById("stack-container");
        if (topPointer.parentElement !== stackContainer) {
            stackContainer.appendChild(topPointer);
        }

        const offsetTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);
        const offsetRight = containerRect.right - nodeRect.right + nodeRect.width + 10;
        topPointer.style.top = `${offsetTop}px`;
        topPointer.style.right = "auto";
        topPointer.style.left = `${nodeRect.left - containerRect.left - 50}px`;

    } else {
        topPointer.style.opacity = "0";
    }
}

/**
 * Operations
 */
async function handlePush() {
    const value = elements.valueInput.value.trim();
    if (!value) return;

    await setBusy(true);
    elements.valueInput.value = "";

    updateStatus(`1. Creando nodo desconectado con valor "${value}"`, "Paso 1/4");

    const container = document.createElement("div");
    container.className = "floating-node-container";
    container.innerHTML = `
        <div class="node floating">${value}</div>
        <div style="color: var(--text-secondary); margin-top: 5px; font-size: 0.8rem;">NEW</div>
    `;
    elements.stackDiv.appendChild(container);

    await sleep(UI_DELAY.STEP);

    updateStatus("2. Estableciendo conexión (Arrow) haca el Top actual", "Paso 2/4");

    if (!stack.isEmpty()) {
        const arrow = document.createElement("div");
        arrow.className = "arrow-connection grow";
        arrow.style.position = "absolute";
        arrow.style.top = "50%";
        arrow.style.left = "-100px";
        arrow.style.width = "0px";
        arrow.style.height = "2px";
        arrow.style.background = "var(--primary)";
        container.appendChild(arrow);
        await sleep(1000);
    } else {
        await sleep(500);
    }

    updateStatus("3. Actualizando el puntero 'top' de la pila", "Paso 3/4");
    if (container) container.remove();

    stack.push(value);
    render(stack.peek(), "highlight-push");
    await sleep(UI_DELAY.LONG);

    updateStatus("¡Elemento insertado correctamente!");
    render();
    await sleep(UI_DELAY.END);
    updateStatus("Listo para comenzar...");
    await setBusy(false);
}

async function handlePop() {
    if (stack.isEmpty()) {
        updateStatus("Error: Stack Underflow (La pila está vacía)", "¡Error!");
        elements.explanation.style.color = "var(--danger)";
        await sleep(2000);
        elements.explanation.style.color = "";
        updateStatus("Listo para comenzar...");
        return;
    }

    await setBusy(true);

    updateStatus("Identificando el nodo en el 'top' para removerlo", "Paso 1/2");
    render(stack.peek(), "highlight-peek");
    await sleep(UI_DELAY.STEP);

    updateStatus("Moviendo el puntero 'top' al siguiente nodo", "Paso 2/2");
    render(stack.peek(), "highlight-pop");
    await sleep(500);
    stack.pop();
    render();
    await sleep(UI_DELAY.STEP);

    updateStatus("Nodo removido exitosamente");
    await sleep(UI_DELAY.END);
    updateStatus("Listo para comenzar...");
    await setBusy(false);
}

async function handlePeek() {
    if (stack.isEmpty()) {
        updateStatus("Error: La pila está vacía", "¡Aviso!");
        return;
    }

    await setBusy(true);
    const top = stack.peek();
    updateStatus(`Consultando el tope: El valor es "${top.value}"`);
    render(top, "highlight-peek");

    await sleep(UI_DELAY.LONG + 500);

    render();
    updateStatus("Listo para comenzar...");
    await setBusy(false);
}

/**
 * Event Listeners
 */
elements.pushBtn.onclick = handlePush;
elements.popBtn.onclick = handlePop;
elements.peekBtn.onclick = handlePeek;

elements.valueInput.onkeydown = (e) => {
    if (e.key === "Enter") handlePush();
};

// Initial render
render();


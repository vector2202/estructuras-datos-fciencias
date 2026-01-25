import Queue from "../core/Queue.js";
import CircularQueue from "../core/CircularQueue.js";
import { renderQueue, renderCircular, renderFloatingNode } from "../render/queueRenderer.js";
import { Visualizer } from "../utils/Visualizer.js";

/* CIRCULAR QUEUE (Hoisted for scope access) */
const cq = new CircularQueue(6);
const vizC = new Visualizer("explanationCircular", "stepsCircular");

/* SIMPLE QUEUE */
const q = new Queue(6);
const vizS = new Visualizer("explanationSimple", "stepsSimple");
const inputS = document.getElementById("valueSimple");
const btnEnqS = document.getElementById("enqueueSimple");
const btnDeqS = document.getElementById("dequeueSimple");
const btnPeekS = document.getElementById("peekSimple");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

// Speed Control
if (speedSlider) {
    speedSlider.addEventListener("input", () => {
        const factor = parseFloat(speedSlider.value);
        if (speedValue) speedValue.textContent = `${factor.toFixed(1)}x`;
        vizS.setSpeed(factor);
        if (vizC) vizC.setSpeed(factor); // Check existence carefully
    });
    // Set initial speed
    const initFactor = parseFloat(speedSlider.value);
    vizS.setSpeed(initFactor);
    if (vizC) vizC.setSpeed(initFactor);
}

async function setBusyS(busy) {
    btnEnqS.disabled = busy;
    btnDeqS.disabled = busy;
    btnPeekS.disabled = busy;
    inputS.disabled = busy;
}

btnEnqS.onclick = async () => {
    const val = inputS.value.trim();
    if (!val) return;
    if (!vizS.start()) return;

    await setBusyS(true);
    inputS.value = "";

    try {
        vizS.log("1. Validando espacio en la cola...", 1);
        await vizS.sleep(800);

        if (q.isFull()) throw "Error: La cola está llena (Overflow)";

        vizS.log(`2. Creando nodo desconectado <strong>${val}</strong>.`, 2);
        renderFloatingNode("canvasSimple", val);
        await vizS.sleep(800);

        vizS.log(`3. Insertando valor al final (TAIL) y conectando.`, 3);

        q.enqueue(val);

        const arrowFrom = q.items.length > 1 ? q.items.length - 2 : -1;

        renderQueue("canvasSimple", q.items, 0, q.items.length - 1, null, arrowFrom);
        await vizS.sleep(1200);

        vizS.log("Operación completada exitosamente.");
    } catch (e) {
        vizS.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizS.stop();
    await setBusyS(false);
};

btnDeqS.onclick = async () => {
    if (!vizS.start()) return;
    await setBusyS(true);

    try {
        vizS.log("1. Buscando el elemento en FRONT...", 1);
        if (q.isEmpty()) throw "Error: La cola está vacía (Underflow)";
        await vizS.sleep(800);

        vizS.log("2. Removiendo el elemento más antiguo.", 2);
        q.dequeue();
        renderQueue("canvasSimple", q.items, 0, q.items.length - 1);
        await vizS.sleep(1200);

        vizS.log("Operación completada exitosamente.");
    } catch (e) {
        vizS.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizS.stop();
    await setBusyS(false);
};

btnPeekS.onclick = async () => {
    if (!vizS.start()) return;
    await setBusyS(true);

    try {
        vizS.log("1. Accediendo al primer elemento (FRONT)...", 1);
        if (q.isEmpty()) throw "Error: La cola está vacía";
        await vizS.sleep(800);

        const val = q.peek();
        vizS.log(`2. El elemento al frente es: <strong>${val}</strong>`, 2);
        renderQueue("canvasSimple", q.items, 0, q.items.length - 1, 0);

        // Resaltar el primer nodo (opcional, renderQueue ya pone etiqueta)
        await vizS.sleep(1500);
    } catch (e) {
        vizS.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizS.stop();
    await setBusyS(false);
};

/* CIRCULAR QUEUE */

const inputC = document.getElementById("valueCircular");
const btnEnqC = document.getElementById("enqueueCircular");
const btnDeqC = document.getElementById("dequeueCircular");
const btnPeekC = document.getElementById("peekCircular");

async function setBusyC(busy) {
    btnEnqC.disabled = busy;
    btnDeqC.disabled = busy;
    btnPeekC.disabled = busy;
    inputC.disabled = busy;
}

btnEnqC.onclick = async () => {
    const val = inputC.value.trim();
    if (!val) return;
    if (!vizC.start()) return;

    await setBusyC(true);
    inputC.value = "";

    try {
        vizC.log("1. Calculando la posición TAIL usando módulo...", 1);
        await vizC.sleep(800);

        if (cq.isFull()) throw "Error: Cola Circular llena";

        const index = (cq.tail + 1) % cq.capacity;
        const oldTail = cq.tail;

        vizC.log(`2. Creando nodo <strong>${val}</strong>.`, 2);
        renderFloatingNode("canvasCircular", val, true);
        await vizC.sleep(800);

        vizC.log(`3. Insertando en índice <strong>${index}</strong> y conectando arco.`, 3);
        cq.enqueue(val);

        const animateFrom = (cq.queue.filter(x => x !== null).length > 1) ? oldTail : -1;

        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail, index, animateFrom);
        await vizC.sleep(1500);

        vizC.log("Inserción circular finalizada.");
        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail);
    } catch (e) {
        vizC.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizC.stop();
    await setBusyC(false);
};

btnDeqC.onclick = async () => {
    if (!vizC.start()) return;
    await setBusyC(true);

    try {
        vizC.log("1. Localizando el puntero FRONT...", 1);
        if (cq.isEmpty()) throw "Error: Cola Circular vacía";
        await vizC.sleep(800);

        const oldFront = cq.front;
        vizC.log(`2. Removiendo elemento en índice <strong>${oldFront}</strong>.`, 2);
        cq.dequeue();
        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail, oldFront);
        await vizC.sleep(1500);

        vizC.log("Moviendo FRONT circularmente.");
        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail);
    } catch (e) {
        vizC.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizC.stop();
    await setBusyC(false);
};

btnPeekC.onclick = async () => {
    if (!vizC.start()) return;
    await setBusyC(true);

    try {
        vizC.log("1. Consultando el puntero FRONT circular...", 1);
        if (cq.isEmpty()) throw "Error: Cola Circular vacía";
        await vizC.sleep(800);

        const val = cq.peek();
        const index = cq.front;
        vizC.log(`2. Frente en índice <strong>${index}</strong> con valor: <strong>${val}</strong>`, 2);
        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail, index);
        await vizC.sleep(1500);

        renderCircular("canvasCircular", cq.queue, cq.front, cq.tail);
    } catch (e) {
        vizC.log(`<span style="color:var(--danger)">${e}</span>`);
    }

    vizC.stop();
    await setBusyC(false);
};

// Init
renderQueue("canvasSimple", q.items);
renderCircular("canvasCircular", cq.queue, cq.front, cq.tail);

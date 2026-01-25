import CircularLinkedList from "../core/CircularList.js";
import { renderCircularList, renderFloatingNode } from "../render/renderer_circular_list.js";
import { Visualizer } from "../utils/Visualizer.js";

const list = new CircularLinkedList();
const viz = new Visualizer("explanationCircular", "stepsCircular");

const valueInput = document.getElementById("valueCircular");
const indexInput = document.getElementById("indexCircular");

[1, 2, 3, 4].forEach(v => list.insertAtEnd(v));
renderCircularList(list);
drawAfterRender();


function drawAfterRender() {
    requestAnimationFrame(() => {
        requestAnimationFrame(drawCircularArrow);
    });
}

window.addEventListener('resize', drawAfterRender);

document.getElementById("insertStartCircular").onclick = async () => {
    if (!viz.start()) return;
    const val = viz.getValue(valueInput);
    if (val === null) { viz.stop(); return; }

    viz.log(`1. Creando nodo <strong>${val}</strong>...`, 0);
    renderFloatingNode(val);
    await viz.sleep(800);

    list.insertAtStart(val);

    viz.log("2. Insertando al inicio. Conectando.", 1);
    renderCircularList(list, null, 0);
    await viz.sleep(1000);

    renderCircularList(list);
    drawAfterRender();
    viz.log("Insertado al inicio. <strong>tail.next</strong> apunta a <strong>head</strong>.");
    valueInput.value = "";
    viz.stop();
};

document.getElementById("insertEndCircular").onclick = async () => {
    if (!viz.start()) return;
    const val = viz.getValue(valueInput);
    if (val === null) { viz.stop(); return; }

    viz.log(`1. Creando nodo <strong>${val}</strong>...`, 0);
    renderFloatingNode(val);
    await viz.sleep(800);

    const oldSize = list.toArray().length;
    list.insertAtEnd(val);

    const arrowIdx = oldSize > 0 ? oldSize - 1 : -1;
    viz.log("2. Conectando al final.", 1);
    renderCircularList(list, null, arrowIdx);
    await viz.sleep(1000);

    renderCircularList(list);
    drawAfterRender();
    viz.log("Insertado al final. La lista mantiene su estructura circular.");
    valueInput.value = "";
    viz.stop();
};

document.getElementById("insertAtCircular").onclick = async () => {
    if (!viz.start()) return;
    const val = viz.getValue(valueInput);
    const idx = viz.getValue(indexInput);

    if (val === null || idx === null) {
        viz.stop();
        return;
    }

    let size = 0;
    if (list.head) {
        let curr = list.head;
        do {
            size++;
            curr = curr.next;
        } while (curr !== list.head);
    }

    if (idx < 0 || idx > size) {
        viz.log(`<span style="color:var(--danger)">Error: Índice fuera de rango (0 - ${size}).</span>`);
        viz.stop();
        return;
    }

    viz.log(`Insertando <strong>${val}</strong> en posición <strong>${idx}</strong>...`);

    if (idx === 0) {
        list.insertAtStart(val);
        renderCircularList(list);
        drawAfterRender();
        viz.log("Insertado al inicio.");
        viz.stop();
        return;
    }

    let current = list.head;
    for (let i = 0; i < idx; i++) {
        if (!current) break;
        renderCircularList(list, current);
        await viz.sleep(500);
        current = current.next;
        if (current === list.head) break;
    }

    list.insertAt(idx, val);
    renderCircularList(list);
    drawAfterRender();
    viz.log(`Insertado <strong>${val}</strong> en posición ${idx}.`);

    valueInput.value = "";
    indexInput.value = "";
    viz.stop();
};

document.getElementById("searchCircular").onclick = async () => {
    if (!list.head) return;
    if (!viz.start()) return;

    const val = viz.getValue(valueInput);
    if (val === null) { viz.stop(); return; }

    let current = list.head;
    let steps = 0;

    do {
        steps++;
        renderCircularList(list, current);
        viz.log("Buscando valor...", steps);
        await viz.sleep(700);

        if (current.value == val) {
            viz.log(`Valor encontrado en ${steps} pasos.`, steps);
            viz.stop();
            return;
        }

        current = current.next;
    } while (current !== list.head);

    renderCircularList(list);
    viz.log("Valor no encontrado. Se recorrió una vuelta completa.");
    viz.stop();
};

document.getElementById("removeCircular").onclick = async () => {
    if (!list.head) return;
    if (!viz.start()) return;

    const val = viz.getValue(valueInput);
    if (val === null) { viz.stop(); return; }

    let current = list.head;

    do {
        renderCircularList(list, current);
        viz.log("Buscando nodo a eliminar...");
        await viz.sleep(600);

        if (current.value == val) break;
        current = current.next;
    } while (current !== list.head);

    const removed = list.remove(val);
    renderCircularList(list);

    if (!list.head) {
        const arrow = document.getElementById("circularArrow");
        if (arrow) arrow.style.display = "none";
    } else {
        drawAfterRender();
    }

    if (removed) {
        viz.log("Nodo eliminado. La circularidad se mantiene.");
    } else {
        viz.log("Nodo no encontrado.");
    }

    valueInput.value = "";
    viz.stop();
};


let currentTurn = null;
document.getElementById("nextTurn").onclick = () => {
    if (!list.head) return;

    if (!currentTurn) {
        currentTurn = list.head;
    } else {
        currentTurn = currentTurn.next;
    }

    renderCircularList(list, currentTurn);
    viz.log(`Turno actual: <strong>${currentTurn.value}</strong><br>El recorrido continúa sin reiniciar.`);
};


function drawCircularArrow() {
    const svg = document.getElementById("circularArrow");
    const path = document.getElementById("circularPath");
    const canvas = document.getElementById("canvasCircular");
    const wrapper = document.querySelector(".canvas-wrapper-circular");

    if (!wrapper || !svg || !path || !canvas) return;

    const nodes = canvas.querySelectorAll(".node");
    if (nodes.length < 2) {
        svg.style.display = "none";
        return;
    }

    const headRect = nodes[0].getBoundingClientRect();
    const tailRect = nodes[nodes.length - 1].getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    // Logic from original file to draw arc
    const startX_old = ((tailRect.right - wrapperRect.left) / wrapperRect.width) * 1000 - 20;
    const endX_old = ((headRect.left + 5 - wrapperRect.left) / wrapperRect.width) * 1000;
    const y_old = ((tailRect.top - wrapperRect.top) / wrapperRect.height) * 200 - 30;

    const d = `
    M ${startX_old} ${y_old + 30}
    C ${startX_old} ${y_old - 50},
      ${endX_old} ${y_old - 50},
      ${endX_old} ${y_old + 30}
  `;

    path.setAttribute("d", d);
    svg.style.display = "block";
}

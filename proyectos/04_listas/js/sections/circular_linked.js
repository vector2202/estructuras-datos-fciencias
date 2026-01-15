import CircularLinkedList from "../core/CircularList.js";
import { renderCircularList } from "../render/renderer_circular_list.js";
import { Visualizer } from "../utils/Visualizer.js";

const list = new CircularLinkedList();
const viz = new Visualizer("explanationCircular", "stepsCircular");

const valueInput = document.getElementById("valueCircular");

[1, 2, 3, 4].forEach(v => list.insertAtEnd(v));
renderCircularList(list);
drawAfterRender();


function drawAfterRender() {
    requestAnimationFrame(() => {
        requestAnimationFrame(drawCircularArrow);
    });
}

window.addEventListener('resize', drawAfterRender);

document.getElementById("insertStartCircular").onclick = () => {
    const val = viz.getValue(valueInput);
    if (val === null) return;

    list.insertAtStart(val);
    renderCircularList(list);
    drawAfterRender();
    viz.log("Insertado al inicio. <strong>tail.next</strong> apunta a <strong>head</strong>.");
    valueInput.value = "";
};

document.getElementById("insertEndCircular").onclick = () => {
    const val = viz.getValue(valueInput);
    if (val === null) return;

    list.insertAtEnd(val);
    renderCircularList(list);
    drawAfterRender();
    viz.log("Insertado al final. La lista mantiene su estructura circular.");
    valueInput.value = "";
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

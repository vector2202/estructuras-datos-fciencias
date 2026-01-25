import DoubleLinkedList from "./../core/DoubleLinkedList.js";
import { renderDoubleLinkedList, renderFloatingNode } from "./../render/renderer_double_linked_list.js";
import { Visualizer } from "./../utils/Visualizer.js";

const dlist = new DoubleLinkedList();
const viz = new Visualizer("explanationDL");

const valueInput = document.getElementById("valueInputDL");

const indexInput = document.getElementById("indexInputDL");

let currentIndex = null;

[1, 2, 3, 4].forEach(v => dlist.insert(v));
render();

function render(highlight = null) {
  renderDoubleLinkedList(dlist, currentIndex, highlight);
}

document.getElementById("insertEndDL").onclick = async () => {
  if (!viz.start()) return;
  const val = viz.getValue(valueInput);
  if (val === null) { viz.stop(); return; }

  viz.log(`1. Creando nodo <strong>${val}</strong>...`, 0);
  renderFloatingNode(val);
  await viz.sleep(800);

  const oldSize = dlist.toArray().length;
  dlist.insert(val);
  currentIndex = dlist.toArray().length - 1;

  const arrowIdx = oldSize > 0 ? oldSize - 1 : -1;
  viz.log("2. Conectando al final (Next/Prev). O(1) con tail.", 1);
  renderDoubleLinkedList(dlist, null, null, arrowIdx);
  await viz.sleep(1000);

  render();
  valueInput.value = "";
  viz.stop();
};

document.getElementById("insertBeginDL").onclick = async () => {
  if (!viz.start()) return;
  const val = viz.getValue(valueInput);
  if (val === null) { viz.stop(); return; }

  viz.log(`1. Creando nodo <strong>${val}</strong>...`, 0);
  renderFloatingNode(val);
  await viz.sleep(800);

  dlist.insertAtHead(val);
  currentIndex = 0;

  viz.log("2. Conectando al inicio (Next/Prev).", 1);
  renderDoubleLinkedList(dlist, null, null, 0);
  await viz.sleep(1000);

  render();
  valueInput.value = "";
  viz.stop();
};

document.getElementById("insertAtDL").onclick = async () => {
  if (!viz.start()) return;
  const val = viz.getValue(valueInput);
  const idx = viz.getValue(indexInput);

  if (val === null || idx === null) {
    viz.stop();
    return;
  }

  const actualSize = dlist.toArray().length;
  if (idx < 0 || idx > actualSize) {
    viz.log(`<span style="color:var(--danger)">Error: Índice fuera de rango (0 - ${actualSize}).</span>`);
    viz.stop();
    return;
  }

  viz.log(`Insertando <strong>${val}</strong> en posición <strong>${idx}</strong>...`);

  if (idx === 0) {
    dlist.insertAtHead(val);
    render(0);
    viz.log("Insertado al inicio.");
    viz.stop();
    return;
  }

  const nodes = dlist.toArray();
  for (let i = 0; i < Math.min(idx, nodes.length); i++) {
    render(i);
    viz.log(`Buscando posición ${idx}... actual: ${i}`);
    await viz.sleep(600);
  }

  dlist.insertAt(idx, val);
  render(idx);
  viz.log(`Insertado <strong>${val}</strong> en posición ${idx}.`);

  valueInput.value = "";
  indexInput.value = "";
  viz.stop();
};


document.getElementById("forward").onclick = async () => {
  if (!viz.start()) return;
  viz.log("Recorrido hacia adelante usando <strong>next</strong>.");

  const nodes = dlist.toArray();
  for (let i = 0; i < nodes.length; i++) {
    currentIndex = i;
    render(currentIndex);
    await viz.sleep();
  }

  currentIndex = null;
  render();
  viz.stop();
};

document.getElementById("backward").onclick = async () => {
  if (!viz.start()) return;
  viz.log("Recorrido hacia atrás usando <strong>prev</strong>.");

  const nodes = dlist.toArray();
  for (let i = nodes.length - 1; i >= 0; i--) {
    currentIndex = i;
    render(currentIndex);
    await viz.sleep();
  }

  currentIndex = null;
  render();
  viz.stop();
};

document.getElementById("searchDL").onclick = async () => {
  if (!viz.start()) return;
  const val = viz.getValue(valueInput);
  if (val === null) { viz.stop(); return; }

  const nodes = dlist.toArray();
  currentIndex = null;
  let found = false;

  for (let i = 0; i < nodes.length; i++) {
    currentIndex = i;
    render(i);
    viz.log(`Buscando ${val}…`);
    await viz.sleep();

    if (nodes[i].value === val) {
      viz.log(`Nodo ${val} encontrado.`);
      found = true;
      break;
    }
  }

  if (!found) {
    currentIndex = null;
    render();
    viz.log(`Valor ${val} no encontrado.`);
  }

  if (!found) currentIndex = null;

  viz.stop();
};

document.getElementById("removeDL").onclick = async () => {
  if (!viz.start()) return;
  const val = viz.getValue(valueInput);
  if (val === null) { viz.stop(); return; }

  const nodes = dlist.toArray();
  let steps = 0;
  let indexToDelete = null;

  viz.log(`Buscando el nodo <strong>${val}</strong> para eliminarlo.`);

  for (let i = 0; i < nodes.length; i++) {
    steps++;
    render(i);
    viz.log(`Paso ${steps}: comparando ${nodes[i].value} con ${val}.`);
    await viz.sleep();

    if (nodes[i].value === val) {
      indexToDelete = i;
      break;
    }
  }

  if (indexToDelete === null) {
    currentIndex = null;
    render();
    viz.log(`El valor <strong>${val}</strong> no existe → búsqueda O(n).`);
    viz.stop();
    return;
  }

  render(indexToDelete);

  viz.log(`Nodo <strong>${val}</strong> encontrado. Se eliminará ajustando punteros.`);
  await viz.sleep(1200);

  viz.log(`El nodo a eliminar tiene referencias <strong>prev</strong> y <strong>next</strong>. Reasignando...`);
  await viz.sleep(1200);

  dlist.remove(val);
  currentIndex = null;
  render();

  viz.log(`Nodo eliminado correctamente. Pasos: ${steps}.`);
  valueInput.value = "";
  viz.stop();
};

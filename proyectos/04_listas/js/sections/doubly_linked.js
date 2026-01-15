import DoubleLinkedList from "./../core/DoubleLinkedList.js";
import { renderDoubleLinkedList } from "./../render/renderer_double_linked_list.js";
import { Visualizer } from "./../utils/Visualizer.js";

const dlist = new DoubleLinkedList();
const viz = new Visualizer("explanationDL");

const valueInput = document.getElementById("valueInputDL");

let currentIndex = null;

[1, 2, 3, 4].forEach(v => dlist.insert(v));
render();

function render(highlight = null) {
  renderDoubleLinkedList(dlist, currentIndex, highlight);
}

document.getElementById("insertEndDL").onclick = () => {
  const val = viz.getValue(valueInput);
  if (val === null) return;

  dlist.insert(val);
  currentIndex = dlist.toArray().length - 1;

  viz.log("Insertar requiere actualizar <strong>next</strong> y <strong>prev</strong>.");
  render();
  valueInput.value = "";
};

document.getElementById("insertBeginDL").onclick = () => {
  const val = viz.getValue(valueInput);
  if (val === null) return;

  dlist.insertAtHead(val);
  currentIndex = 0;

  viz.log("Insertar requiere actualizar <strong>next</strong> y <strong>prev</strong>.");
  render();
  valueInput.value = "";
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

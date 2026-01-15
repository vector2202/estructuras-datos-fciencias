import LinkedList from './../core/LinkedList.js';
import { renderList } from './../render/renderer.js';
import { Visualizer } from './../utils/Visualizer.js';

const list = new LinkedList();
const viz = new Visualizer("explanation", "steps");

// DOM Elements
const inputVal = document.getElementById("valueInput");

// Initial Render
renderList(list);

// ===============================
// Actions
// ===============================

document.getElementById("insertStart").addEventListener("click", () => {
  const val = viz.getValue(inputVal);
  if (val === null) return;

  list.insertStart(val);
  renderList(list);
  viz.log(`Se insertó <strong>${val}</strong> al inicio. Complejidad: O(1).`);
  inputVal.value = "";
  inputVal.focus();
});

document.getElementById("insertEnd").addEventListener("click", () => {
  const val = viz.getValue(inputVal);
  if (val === null) return;

  list.insertEnd(val);
  renderList(list);
  viz.log(`Se insertó <strong>${val}</strong> al final. Complejidad: O(n) (si no hay tail) o O(1) (con tail).`);
  inputVal.value = "";
  inputVal.focus();
});

document.getElementById("searchBtn").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  if (val === null) { viz.stop(); return; }

  viz.log(`Buscando <strong>${val}</strong>...`, 0);

  const nodes = list.toArray();
  let found = false;

  for (let i = 0; i < nodes.length; i++) {
    renderList(list, null, null, i); // Highlight searching
    viz.log(`Comparando con nodo ${i + 1}...`, i + 1);
    await viz.sleep(600);

    if (nodes[i] == val) {
      renderList(list, i); // Highlight found
      viz.log(`¡Encontrado! Valor <strong>${val}</strong> en índice ${i}.`, i + 1);
      found = true;
      break;
    }
  }

  if (!found) {
    renderList(list);
    viz.log(`Valor <strong>${val}</strong> no encontrado.`, nodes.length);
  }

  viz.stop();
});

document.getElementById("removeBtn").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  if (val === null) { viz.stop(); return; }

  viz.log(`Buscando para eliminar <strong>${val}</strong>...`, 0);

  const nodes = list.toArray();
  let foundIndex = -1;

  for (let i = 0; i < nodes.length; i++) {
    renderList(list, null, null, i);
    viz.log(`Buscando...`, i + 1);
    await viz.sleep(500);

    if (nodes[i] == val) {
      foundIndex = i;
      renderList(list, i);
      viz.log(`Encontrado. Eliminando...`, i + 1);
      await viz.sleep(600);
      break;
    }
  }

  if (foundIndex !== -1) {
    list.remove(val);
    renderList(list);
    viz.log(`Nodo eliminado. Referencias actualizadas.`);
  } else {
    renderList(list);
    viz.log(`No se encontró <strong>${val}</strong> para eliminar.`);
  }

  viz.stop();
});

document.getElementById("traverse").addEventListener("click", async () => {
  if (!viz.start()) return;

  const nodes = list.toArray();
  if (nodes.length === 0) {
    viz.log("La lista está vacía.");
    viz.stop();
    return;
  }

  for (let i = 0; i < nodes.length; i++) {
    renderList(list, null, i);
    viz.log(`Visitando nodo ${i + 1}`, i + 1);
    await viz.sleep(600);
  }
  renderList(list);
  viz.log("Recorrido finalizado.");
  viz.stop();
});

import LinkedList from './../core/LinkedList.js';
import { renderList, renderFloatingNode } from './../render/renderer.js';
import { Visualizer } from './../utils/Visualizer.js';

const list = new LinkedList();
const viz = new Visualizer("explanation", "steps");

// DOM Elements
const inputVal = document.getElementById("valueInput");
const inputIdx = document.getElementById("indexInput");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

// Initial Render
renderList(list);

// Speed Control
if (speedSlider) {
  speedSlider.addEventListener("input", () => {
    const factor = parseFloat(speedSlider.value);
    viz.setSpeed(factor);
    if (speedValue) speedValue.textContent = `${factor.toFixed(1)}x`;
  });
  viz.setSpeed(parseFloat(speedSlider.value));
}

// ===============================
// Actions
// ===============================

document.getElementById("insertStart").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  if (val === null) { viz.stop(); return; }

  viz.log(`1. Creando nodo con valor <strong>${val}</strong>...`, 0);
  renderFloatingNode(val);
  await viz.sleep(800);

  list.insertStart(val);

  viz.log(`2. Actualizando referencias (HEAD apunta al nuevo nodo).`, 1);
  renderList(list, null, null, null, 0);
  await viz.sleep(1000);

  renderList(list);
  viz.log(`Se insertó <strong>${val}</strong> al inicio. Complejidad: O(1).`);
  inputVal.value = "";
  inputVal.focus();
  viz.stop();
});

document.getElementById("insertEnd").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  if (val === null) { viz.stop(); return; }

  viz.log(`1. Creando nodo con valor <strong>${val}</strong>...`, 0);
  renderFloatingNode(val);
  await viz.sleep(800);

  const oldSize = list.size ? list.size() : list.toArray().length;
  list.insertEnd(val);

  const arrowIndex = oldSize > 0 ? oldSize - 1 : -1;

  viz.log(`2. Conectando nuevo nodo al final.`, 1);
  renderList(list, null, null, null, arrowIndex);
  await viz.sleep(1000);

  renderList(list);
  viz.log(`Se insertó <strong>${val}</strong> al final.`);
  inputVal.value = "";
  inputVal.focus();
  viz.stop();
});

document.getElementById("insertAtBtn").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  const idx = viz.getValue(inputIdx);

  if (val === null || idx === null) {
    viz.stop();
    return;
  }

  const currentSize = list.size ? list.size() : list.toArray().length;
  const actualSize = list.toArray().length;

  if (idx < 0 || idx > actualSize) {
    viz.log(`<span style="color:var(--danger)">Error: Índice fuera de rango (0 - ${actualSize}).</span>`);
    viz.stop();
    return;
  }

  viz.log(`1. Creando nodo <strong>${val}</strong> para insertar...`, 0);
  renderFloatingNode(val);
  await viz.sleep(800);

  if (idx === 0) {
    list.insertStart(val);
    viz.log(`2. Insertando al inicio (Head).`);
    renderList(list, null, null, null, 0);
    await viz.sleep(1000);
    renderList(list);
    viz.stop();
    return;
  }

  const nodes = list.toArray();
  let currIdx = 0;

  for (let i = 0; i < Math.min(idx, nodes.length); i++) {
    renderList(list, null, null, i);
    viz.log(`Buscando la posición ${idx}... (actual: ${i})`, i + 1);
    await viz.sleep(600);
    currIdx = i + 1;
  }

  list.insertAt(idx, val);
  renderList(list);
  viz.log(`¡Valor <strong>${val}</strong> insertado en posición ${idx}!`);
  inputVal.value = "";
  inputIdx.value = "";
  viz.stop();
});

document.getElementById("searchBtn").addEventListener("click", async () => {
  if (!viz.start()) return;
  const val = viz.getValue(inputVal);
  if (val === null) { viz.stop(); return; }

  viz.log(`Buscando <strong>${val}</strong>...`, 0);

  const nodes = list.toArray();
  let found = false;

  for (let i = 0; i < nodes.length; i++) {
    renderList(list, null, null, i);
    viz.log(`Comparando con nodo ${i + 1}...`, i + 1);
    await viz.sleep(600);

    if (nodes[i] == val) {
      renderList(list, i);
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

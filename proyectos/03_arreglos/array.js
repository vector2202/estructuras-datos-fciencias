const MAX_SIZE = 8;
let array = [10, 20, 30, 40];

const container = document.getElementById("arrayContainer");
const info = document.getElementById("info");
const operation = document.getElementById("operation");
const complexity = document.getElementById("complexity");

function renderArray(highlightIndex = null, dangerIndex = null) {
  container.innerHTML = "";

  for (let i = 0; i < MAX_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (i >= array.length) cell.classList.add("empty");
    if (i === highlightIndex) cell.classList.add("highlight");
    if (i === dangerIndex) cell.classList.add("danger");

    cell.innerHTML = `
      <div class="value">${array[i] ?? "_"}</div>
      <div class="index">${i}</div>
    `;
    container.appendChild(cell);
  }
}

renderArray();

function setInfo(op, comp, text) {
  operation.textContent = op;
  complexity.textContent = comp;
  info.textContent = text;
}

/* VALIDACIONES */
function invalid(msg) {
  setInfo("Error", "-", msg);
}

/* ACCESO */
function accessElement() {
  const index = Number(document.getElementById("indexInput").value);

  if (isNaN(index)) return invalid("Debes ingresar un índice");
  if (index < 0 || index >= array.length)
    return invalid("Índice fuera de rango lógico");

  setInfo(
    "Acceso directo",
    "O(1)",
    `Accediendo directamente a arr[${index}] = ${array[index]}`
  );

  renderArray(index);
}

/* RECORRIDO */
async function traverseArray() {
  setInfo("Recorrido", "O(n)", "Visitando cada elemento del arreglo");

  for (let i = 0; i < array.length; i++) {
    info.textContent = `Accediendo a arr[${i}]`;
    renderArray(i);
    await delay(600);
  }

  renderArray();
}

/* INSERCIÓN */
async function insertElement() {
  const value = Number(document.getElementById("valueInput").value);
  const index = Number(document.getElementById("indexInput").value);

  if (isNaN(value) || isNaN(index))
    return invalid("Debes ingresar valor e índice");

  if (array.length >= MAX_SIZE)
    return invalid("Arreglo lleno: tamaño físico alcanzado");

  if (index < 0 || index > array.length)
    return invalid("Índice inválido para inserción");

  setInfo(
    "Inserción",
    "O(n)",
    "Desplazando elementos hacia la derecha"
  );

  for (let i = array.length - 1; i >= index; i--) {
    info.textContent = `Moviendo arr[${i}] → arr[${i + 1}]`;
    array[i + 1] = array[i];
    renderArray(i, i + 1);
    await delay(600);
  }

  array[index] = value;
  info.textContent = `Insertando ${value} en arr[${index}]`;
  renderArray(index);
}

/* ELIMINACIÓN */
async function removeElement() {
  const index = Number(document.getElementById("indexInput").value);

  if (isNaN(index)) return invalid("Debes ingresar un índice");
  if (index < 0 || index >= array.length)
    return invalid("Índice inválido para eliminación");

  setInfo(
    "Eliminación",
    "O(n)",
    `Eliminando arr[${index}]`
  );

  renderArray(null, index);
  await delay(600);

  for (let i = index; i < array.length - 1; i++) {
    info.textContent = `Moviendo arr[${i + 1}] → arr[${i}]`;
    array[i] = array[i + 1];
    renderArray(i);
    await delay(600);
  }

  array.length--;
  renderArray();
}

/* BÚSQUEDA LINEAL */
async function linearSearch() {
  const value = Number(document.getElementById("valueInput").value);

  if (isNaN(value)) return invalid("Debes ingresar un valor a buscar");

  setInfo(
    "Búsqueda lineal",
    "O(n)",
    `Buscando ${value} secuencialmente`
  );

  for (let i = 0; i < array.length; i++) {
    info.textContent = `Comparando con arr[${i}]`;
    renderArray(i);
    await delay(600);

    if (array[i] === value) {
      info.textContent = `Elemento encontrado en índice ${i}`;
      return;
    }
  }

  info.textContent = "Elemento no encontrado";
  renderArray();
}

/* RESET */
function resetArray() {
  array = [10, 20, 30, 40];
  setInfo("Reset", "-", "Arreglo reiniciado");
  renderArray();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

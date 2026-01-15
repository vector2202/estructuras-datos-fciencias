const sizeSlider = document.getElementById('size');
const operationSelect = document.getElementById('operation');
const valueInput = document.getElementById('valueInput');
const arrayContainer = document.getElementById('array');
const comparisonsElem = document.getElementById('comparisons');
const accessesElem = document.getElementById('accesses');
const costFnElem = document.getElementById('costFn');
const bigOElem = document.getElementById('bigO');
const descriptionElem = document.getElementById('description');

let array = [];
let comparisons = 0;
let accesses = 0;
let interval;
let index, left, right, mid;

function generateArray(){
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < sizeSlider.value; i++){
        array.push(i + 1);
    }
    renderArray();
}

function renderArray(activeIndex = null, foundIndex = null){
    arrayContainer.innerHTML = '';
    array.forEach((value, i) => {
        const div = document.createElement('div');
        div.className = 'cell';
        if (i === activeIndex) div.classList.add('active');
        if (i === foundIndex) div.classList.add('found');
        div.textContent = value;
        arrayContainer.appendChild(div);
    });
}

function updateStats(){
    comparisonsElem.textContent = comparisons;
    accessesElem.textContent = accesses;
    costFnElem.textContent =
        `T(n) = ${comparisons} + ${accesses} = ${comparisons + accesses}`;
}

function reset(){
    clearInterval(interval);
    comparisons = 0;
    accesses = 0;
    index = 0;
    left = 0;
    right = array.length - 1;
    generateArray();
    updateInfo();
    updateStats();
}

function updateInfo(){
    const op = operationSelect.value;

    const info = {
        'linear': ['O(n)',
            'Se recorre el arreglo elemento por elemento realizando una comparación y un acceso.'],
        'binary': ['O(log n)',
            'En cada paso se divide el arreglo a la mitad, reduciendo el rango a la mitad.'],
        'insert-start': ['O(n)',
            'Insertar al inicio tenemos que desplazar todos los elementos un lugar a la derecha.'],
        'insert-end': ['O(1)',
		       'Insertar al final solo requiere una escritura, sin recorrer el arreglo, ya que sabemos su posicion.'],
        'delete-start': ['O(n)',
            'Eliminar el primer elemento requiere desplazar todos los elementos.']
    };

    bigOElem.textContent = info[op][0];
    descriptionElem.textContent = info[op][1];
}


function linearSearch(target){
    if (index >= array.length){
        clearInterval(interval);
        return;
    }
    accesses++;
    comparisons++;

    if(array[index] === target){
	renderArray(index, index);
	updateStats();
	clearInterval(interval);
	return;
    }
    renderArray(index);
    updateStats();
    index++;
}

function binarySearch(target){
    if (left > right){
        clearInterval(interval);
        return;
    }
    mid = Math.floor((left + right) / 2);
    accesses++;
    comparisons++;
    if (array[mid] === target){
        renderArray(mid, mid);
        updateStats();
        clearInterval(interval);
        return;
    }

    renderArray(mid);
    if (target > array[mid]){
	left = mid + 1;
    }
    else{
	right = mid - 1;
    }

    updateStats();
}

function insertStart(value){
    let i = array.length - 1;
    interval = setInterval(() => {
        if (i < 0){
            array[0] = value;
            accesses++;
            renderArray(0);
            updateStats();
            clearInterval(interval);
            return;
        }
        array[i + 1] = array[i];
        accesses++;
        renderArray(i);
        updateStats();
        i--;
    }, 600);
}

function insertEnd(value){
    array[array.length] = value;
    accesses++;
    renderArray(array.length - 1);
    updateStats();
}

function deleteValue(value){
    index = 0;
    interval = setInterval(() => {
        if (index >= array.length){
            clearInterval(interval);
            return;
        }
        accesses++;
        comparisons++;

        if (array[index] === value){
            array.splice(index, 1);
            accesses += array.length - index;
            renderArray(index);
            updateStats();
            clearInterval(interval);
            return;
        }

        renderArray(index);
        updateStats();
        index++;
    }, 600);
}

document.getElementById('start').onclick = () => {
    reset();
    const op = operationSelect.value;
    const value = parseInt(valueInput.value);

    if (isNaN(value)){
        alert('Ingresa un valor');
        return;
    }

    if (op === 'linear'){
        interval = setInterval(() => linearSearch(value), 700);
    } else if (op === 'binary'){
        interval = setInterval(() => binarySearch(value), 700);
    } else if (op === 'insert-start'){
        insertStart(value);
    } else if (op === 'insert-end'){
        insertEnd(value);
    } else if (op === 'delete-value'){
        deleteValue(value);
    }
};

document.getElementById('reset').onclick = reset;
operationSelect.onchange = reset;

generateArray();
updateInfo();

import { Utils } from './utils.js';

// DOM Elements
const sizeSlider = document.getElementById('sizeSlider');
const sizeVal = document.getElementById('sizeVal');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

// State
let baseArray = [];
const algos = ['bubble', 'merge', 'quick', 'radix'];

//Sorting algorithms
//Bubble sort
function bubbleSort(arr) {
    const array = [...arr];
    const steps = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ type: 'compare', indices: [j, j + 1] });
            if (array[j] > array[j + 1]) {
                steps.push({ type: 'swap', indices: [j, j + 1] });
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        steps.push({ type: 'sorted', indices: [n - 1 - i] });
    }
    steps.push({ type: 'sorted', indices: [0] });
    return steps;
}

function quickSort(arr) {
    const array = [...arr];
    const steps = [];
    
    function partition(low, high) {
        const pivot = array[high];
        steps.push({ type: 'compare', indices: [high] }); // Pivot highlight
        let i = low - 1;
        for (let j = low; j < high; j++) {
            steps.push({ type: 'compare', indices: [j, high] });
            if (array[j] < pivot) {
                i++;
                steps.push({ type: 'swap', indices: [i, j] });
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        steps.push({ type: 'swap', indices: [i + 1, high] });
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        return i + 1;
    }

    function sort(low, high) {
        if (low < high) {
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    }
    sort(0, array.length - 1);
    return steps; // Quick sort visualmente es tricky para marcar "sorted" incrementalmente sin lógica extra
}

function mergeSort(arr) {
    const array = [...arr];
    const steps = [];
    
    function merge(l, m, r) {
        const leftArr = array.slice(l, m + 1);
        const rightArr = array.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({ type: 'compare', indices: [l + i, m + 1 + j] });
            if (leftArr[i] <= rightArr[j]) {
                steps.push({ type: 'overwrite', index: k, value: leftArr[i] });
                array[k++] = leftArr[i++];
            } else {
                steps.push({ type: 'overwrite', index: k, value: rightArr[j] });
                array[k++] = rightArr[j++];
            }
        }
        while (i < leftArr.length) {
            steps.push({ type: 'overwrite', index: k, value: leftArr[i] });
            array[k++] = leftArr[i++];
        }
        while (j < rightArr.length) {
            steps.push({ type: 'overwrite', index: k, value: rightArr[j] });
            array[k++] = rightArr[j++];
        }
    }

    function sort(l, r) {
        if (l < r) {
            const m = Math.floor((l + r) / 2);
            sort(l, m);
            sort(m + 1, r);
            merge(l, m, r);
        }
    }
    sort(0, array.length - 1);
    return steps;
}

function radixSort(arr) {
    const array = [...arr];
    const steps = [];
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        const buckets = Array.from({ length: 10 }, () => []);
        
        // Bucketing phase
        for (let i = 0; i < array.length; i++) {
            const digit = Math.floor((array[i] / exp) % 10);
            buckets[digit].push(array[i]);
            // Visualmente mostramos qué "bucket" (dígito) estamos leyendo
            steps.push({ type: 'compare', indices: [i] }); 
        }

        // Reconstruction phase
        let idx = 0;
        for (let i = 0; i < 10; i++) {
            for (let val of buckets[i]) {
                steps.push({ type: 'overwrite', index: idx, value: val });
                array[idx++] = val;
            }
        }
        exp *= 10;
    }
    return steps;
}

//runner

async function runAlgo(id, steps) {
    const chartId = `chart-${id}`;
    const statsId = `stats-${id}`;
    const progId = `prog-${id}`;
    //copy local array
    const localArr = [...baseArray];
    const totalSteps = steps.length;
    let ops = 0;

    for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        const highlights = {};

        ops++;
        //apply different actions
        if (step.type === 'compare') {
            step.indices.forEach(idx => highlights[idx] = 'compare');
        } 
        else if (step.type === 'swap') {
            const [i1, i2] = step.indices;
            highlights[i1] = 'swap'; highlights[i2] = 'swap';
            [localArr[i1], localArr[i2]] = [localArr[i2], localArr[i1]];
        }
        else if (step.type === 'overwrite') {
            localArr[step.index] = step.value;
            highlights[step.index] = 'overwrite';
        }
        else if (step.type === 'sorted') {
             step.indices.forEach(idx => highlights[idx] = 'sorted');
        }

        // Render Frame
        Utils.render(chartId, localArr, highlights);
        
        // Update UI stats
        document.getElementById(statsId).textContent = `${ops} ops`;
        document.getElementById(progId).style.width = `${(i / totalSteps) * 100}%`;

        //wait
        await Utils.sleep(() => Number(speedSlider.value));
    }
    
    // Final clear
    Utils.render(chartId, localArr, {}); 
    document.getElementById(progId).style.background = 'var(--accent)'; // Finished color
}

//application

function init() {
    const size = Number(sizeSlider.value);
    baseArray = Utils.generateArray(size, 5, 200);//max 200

    // Reset UI
    algos.forEach(id => {
        Utils.render(`chart-${id}`, baseArray);
        document.getElementById(`stats-${id}`).textContent = '0 ops';
        document.getElementById(`prog-${id}`).style.width = '0%';
        document.getElementById(`prog-${id}`).style.background = 'var(--success)';
    });
}

btnStart.addEventListener('click', () => {
    const tasks = [
        runAlgo('bubble', bubbleSort(baseArray)),
        runAlgo('merge', mergeSort(baseArray)),
        runAlgo('quick', quickSort(baseArray)),
        runAlgo('radix', radixSort(baseArray))
    ];
});

btnReset.addEventListener('click', init);

// Sliders events
sizeSlider.addEventListener('input', (e) => {
    sizeVal.textContent = e.target.value;
    init();
});

speedSlider.addEventListener('input', (e) => {
    speedVal.textContent = e.target.value;
});

// Init on load
init();

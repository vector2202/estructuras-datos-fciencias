import { Utils } from './utils.js';

// DOM Elements
const sizeSlider = document.getElementById('sizeSlider');
const sizeVal = document.getElementById('sizeVal');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const targetDisplay = document.getElementById('targetDisplay');

// State
let baseArray = [];
let targetValue = 0;


//Linear search algorithm
function linearSearch(arr, target) {
    const steps = [];
    for (let i = 0; i < arr.length; i++) {
        steps.push({ type: 'compare', index: i });
        if (arr[i] === target) {
            steps.push({ type: 'found', index: i });
            return steps;
        }
    }
    return steps;
}
//Binary search algorithm
function binarySearch(arr, target) {
    const steps = [];
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        steps.push({ 
            type: 'compare', 
            index: mid, 
            low: low, 
            high: high 
        });

        if (arr[mid] === target) {
            steps.push({ type: 'found', index: mid });
            return steps;
        }

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return steps;
}

//Runner

async function runSearch(id, steps) {
    const chartId = `chart-${id}`;
    const statsId = `stats-${id}`;
    const progId = `prog-${id}`;
    
    const totalSteps = steps.length;
    let ops = 0;

    for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        const highlights = {};
        ops++;

        if (step.type === 'compare') {
            highlights[step.index] = 'compare';
            //Gray out the discarded ranges
            if (id === 'binary' && step.low !== undefined) {
                //everything out of l and r, gray
                for (let k = 0; k < baseArray.length; k++) {
                    if (k < step.low || k > step.high) {
                        highlights[k] = 'dim';
                    }
                }
                //m element is the one we compare
                highlights[step.index] = 'compare';
            }
        } 
        else if (step.type === 'found') {
            highlights[step.index] = 'found';
        }

        // Render Frame
        Utils.render(chartId, baseArray, highlights);
        
        // Update Stats
        document.getElementById(statsId).textContent = `${ops} ops`;
        document.getElementById(progId).style.width = `${(i / totalSteps) * 100}%`;

	//if founded mark it
        if (step.type === 'found') {
            document.getElementById(progId).style.background = 'var(--success)';
            await Utils.sleep(() => 1000);
            return; 
        }

        // Wait
        await Utils.sleep(() => Number(speedSlider.value));
    }
    
}

//app

function init() {
    const size = Number(sizeSlider.value);
    
    const rawArr = Utils.generateArray(size, 10, 300);
    baseArray = rawArr.sort((a, b) => a - b);
    
    const randomIndex = Math.floor(Math.random() * baseArray.length);
    targetValue = baseArray[randomIndex];
    
    // Update UI Labels
    targetDisplay.textContent = targetValue;
    
    // Reset Graphs
    ['linear', 'binary'].forEach(id => {
        Utils.render(`chart-${id}`, baseArray);
        document.getElementById(`stats-${id}`).textContent = '0 ops';
        document.getElementById(`prog-${id}`).style.width = '0%';
        document.getElementById(`prog-${id}`).style.background = 'var(--success)';
    });
}

btnStart.addEventListener('click', () => {
    runSearch('linear', linearSearch(baseArray, targetValue));
    runSearch('binary', binarySearch(baseArray, targetValue));
});

btnReset.addEventListener('click', init);

sizeSlider.addEventListener('input', (e) => {
    sizeVal.textContent = e.target.value;
    init();
});

speedSlider.addEventListener('input', (e) => {
    speedVal.textContent = e.target.value;
});

// Init on load
init();

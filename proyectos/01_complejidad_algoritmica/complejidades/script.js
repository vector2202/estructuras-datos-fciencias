const factorial = (n) => {
    if (n < 0) return -1;
    if (n == 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
};

const complexityData = {
    o1: {
        label: 'O(1)',
        title: 'Constante',
        desc: 'Se le conoce como constante, esto es decir no importa si nuestra n vale 1 o mil millones, esta operacion va a tomar el mismo tiempo, es la complejidad mas rapida que vamos a encontrar.',
        color: '#3b82f6',
        fn: (n) => 1,
        maxGraphN: 1000 
    },
    ologn: {
        label: 'O(log n)',
        title: 'Logaritmica',
        desc: 'Se le conoce como logaritmica, es muy deseada en muchos algoritmos ya que reduce drasticamente el tiempo, el algoritmo logaritmico mas conocido es la busqueda binaria.',
        color: '#10b981', 
        fn: (n) => n <= 0 ? 0 : Math.log2(n),
        maxGraphN: 1000
    },
    on: {
        label: 'O(n)',
        title: 'Lineal',
        desc: 'Se le conoce como lineal, basicamente nuestro algoritmo hara tantos pasos como el tamaño de n sea, se puede entender muy facil si por ejemplo estamos buscando linealmente en un arreglo y el elemento no esta, tenemos que verificar todas las posiciones del arreglo.',
        color: '#f59e0b',
        fn: (n) => n,
        maxGraphN: 1000
    },
    onlogn: {
        label: 'O(n log n)',
        title: '',
        desc: 'Esta complejidad es la ultima eficiente, ya que aun asi si tenemos millones de entradas, no tardara tanto, encontraremos esta complejidad en algoritmos de ordenamiento (Merge Sort, Quick Sort) o en estructuras como heaps y arboles.',
        color: '#f97316',
        fn: (n) => n <= 0 ? 0 : n * Math.log2(n),
        maxGraphN: 1000
    },
    on2: {
        label: 'O(n²)',
        title: 'Cuadrática',
        desc: 'Se le conoce como cuadratica, por lo regular las soluciones de fuerza bruta tienen esta complejidad, sirve cuando sabemos que las entradas no seran tan grandes. Las operaciones con matrices (doble loop) tienen esta complejidad.',
        color: '#ef4444',
        fn: (n) => n * n,
        maxGraphN: 100
    },
    onk: {
        label: 'O(n^k)',
        title: 'Polinomial (ej. n^4)',
        desc: 'Se le conoce como polinomial, esta ya no es aceptable como complejidad, ya que por ejemplo si tenemos una entrada de un millon, que tarde un millon a la cuarta potencia pues ya no es muy util.',
        color: '#a855f7', 
        fn: (n) => Math.pow(n, 4), 
        maxGraphN: 15 
    },
    o2n: {
        label: 'O(2^n)',
        title: 'Exponencial',
        desc: 'Si la anterior no la queriamos, menos esta. Es la complejidad exponencial. Por lo regular problemas de fuerza bruta recursiva tienen esta complejidad. Si tu algoritmo tiene esto, probablemente hay algo a mejorar.',
        color: '#db2777',
        fn: (n) => Math.pow(2, n),
        maxGraphN: 12 
    },
    onfact: {
        label: 'O(n!)',
        title: 'Factorial',
        desc: 'La peor de todas, la factorial. Basicamente es cuando tienes que combinar todos contra todos (permutaciones). No usarla. Con n=20 ya supera la capacidad de cálculo normal.',
        color: '#881337', 
        fn: (n) => factorial(n),
        maxGraphN: 8 
    }
};


const algoSelect = document.getElementById('algoSelect');
const nSlider = document.getElementById('nSlider');
const nValueLabel = document.getElementById('nValue');
const complexityBadge = document.getElementById('complexityBadge');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const opsValueLabel = document.getElementById('opsValue');
const statusValueLabel = document.getElementById('statusValue');
const ctx = document.getElementById('complexityChart').getContext('2d');


let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Operaciones',
            data: [],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            tension: 0.3, 
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { 
                mode: 'index', 
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let val = context.raw;
                        if(val > 1000000) return (val/1000000).toFixed(2) + 'M ops';
                        return val.toLocaleString() + ' ops';
                    }
                }
            }
        },
        scales: {
            x: { 
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' },
                title: { display: true, text: 'Entrada (n)', color: '#64748b' }
            },
            y: { 
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' },
                beginAtZero: true
            }
        },
        animation: { duration: 400 }
    }
});


function updateUI() {
    const key = algoSelect.value;
    const n = parseInt(nSlider.value);
    const data = complexityData[key];


    complexityBadge.textContent = data.label;
    complexityBadge.style.color = data.color;
    complexityBadge.style.backgroundColor = data.color + '22'; 
    
    algoTitle.textContent = data.title;
    algoDesc.textContent = data.desc;
    nValueLabel.textContent = n;

  
    const ops = data.fn(n);
    
   
    if (ops > 1000000000) {
        opsValueLabel.textContent = (ops / 1000000000).toFixed(2) + ' Billones';
    } else if (ops > 1000000) {
        opsValueLabel.textContent = (ops / 1000000).toFixed(2) + ' Millones';
    } else {
        opsValueLabel.textContent = Math.round(ops).toLocaleString();
    }
    opsValueLabel.style.color = data.color;

  
    evaluateStatus(n, ops, key);

  
    updateChart(data, n);
}

function evaluateStatus(n, ops, key) {
    let statusText = "Excelente";
    let statusColor = "#4ade80"; 

    
    if (ops > 10000000) {
        statusText = "Catastrófico";
        statusColor = "#ef4444";
    } else if (ops > 100000) {
        statusText = "Lento";
        statusColor = "#f59e0b"; 
    } else if (ops > 1000) {
        statusText = "Aceptable";
        statusColor = "#facc15";
    }

    if (key === 'o1' || key === 'ologn') {
        statusText = "Optimo";
        statusColor = "#4ade80";
    }

    statusValueLabel.textContent = statusText;
    statusValueLabel.style.color = statusColor;
}

function updateChart(algoData, currentN) {
    const labels = [];
    const points = [];
    
    const limit = Math.max(algoData.maxGraphN, currentN + 5);
    
    const step = Math.max(1, Math.floor(limit / 1000));

    for (let i = 0; i <= limit; i += step) {
        labels.push(i);
        points.push(algoData.fn(i));
    }

   
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = points;
    myChart.data.datasets[0].borderColor = algoData.color;
    myChart.data.datasets[0].backgroundColor = algoData.color + '20'; 
    
    myChart.update();
}

algoSelect.addEventListener('change', updateUI);
nSlider.addEventListener('input', updateUI);

updateUI();

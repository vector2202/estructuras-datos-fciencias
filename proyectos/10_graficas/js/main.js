import { Graph } from './graph.js';
import { bfs, dfs, dijkstra, hasCycle } from './algorithms.js';

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('canvasContainer');
    const graphTypeTabs = document.querySelectorAll('#graphTypeTabs .tab-btn');
    const weightTabs = document.querySelectorAll('#weightTabs .tab-btn');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const startNodeSelect = document.getElementById('startNodeSelect');
    const endNodeSelect = document.getElementById('endNodeSelect');
    const endNodeGroup = document.getElementById('endNodeGroup');

    const btnAddNode = document.getElementById('btnAddNode');
    const btnDeleteNode = document.getElementById('btnDeleteNode');
    const btnClear = document.getElementById('btnClear');

    const adjacencyMatrix = document.getElementById('adjacencyMatrix');
    const modalAdjacencyMatrix = document.getElementById('modalAdjacencyMatrix');
    const btnOpenMatrixModal = document.getElementById('btnOpenMatrixModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnSaveMatrix = document.getElementById('btnSaveMatrix');
    const matrixModal = document.getElementById('matrixModal');

    const adjacencyListPanel = document.getElementById('adjacencyListPanel');
    const adjacencyList = document.getElementById('adjacencyList');
    const distancesPanel = document.getElementById('distancesPanel');
    const distancesTableBody = document.getElementById('distancesTableBody');

    const logText = document.getElementById('logText');

    // Playback controls
    const btnCycle = document.getElementById('btnCycle');
    const btnPlay = document.getElementById('btnPlay');
    const btnPause = document.getElementById('btnPause');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');
    const btnReset = document.getElementById('btnReset');

    // State
    const graph = new Graph(false, false);
    let selectedNodeId = null;
    let draggingNodeId = null;
    let addNodeMode = false;

    // Simulation state
    let simGenerator = null;
    let simHistory = [];
    let currentStepIndex = -1;
    let isPlaying = false;
    let playInterval = null;
    let currentSimState = null;

    // Resize canvas
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawGraph();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    setTimeout(resizeCanvas, 100);

    // Initial setup
    updateGraphConfig();

    // Event Listeners - Graph Configuration
    graphTypeTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isPlaying) return;
            graphTypeTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            updateGraphConfig();
        });
    });

    weightTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isPlaying) return;
            weightTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            updateGraphConfig();
        });
    });

    // Event Listeners - Modal
    btnOpenMatrixModal.addEventListener('click', () => {
        if (isPlaying) return;
        updateMatrixUI(); // Ensure it's populated
        matrixModal.classList.add('active');
    });

    btnCloseModal.addEventListener('click', () => {
        matrixModal.classList.remove('active');
    });

    btnSaveMatrix.addEventListener('click', () => {
        matrixModal.classList.remove('active');
    });

    function updateGraphConfig() {
        resetSimulation();
        const isDirected = document.querySelector('#graphTypeTabs .active').dataset.type === 'directed';
        const isWeighted = document.querySelector('#weightTabs .active').dataset.weight === 'weighted';

        graph.setType(isDirected, isWeighted);

        const algOptions = algorithmSelect.options;
        for (let i = 0; i < algOptions.length; i++) {
            if (algOptions[i].value === 'dijkstra') {
                algOptions[i].disabled = !isWeighted;
                if (!isWeighted && algorithmSelect.value === 'dijkstra') {
                    algorithmSelect.value = 'bfs';
                }
            }
        }

        updateUI();
        toggleAlgorithmPanels();
    }

    algorithmSelect.addEventListener('change', () => {
        resetSimulation();
        toggleAlgorithmPanels();
    });

    function toggleAlgorithmPanels() {
        if (algorithmSelect.value === 'dijkstra') {
            endNodeGroup.style.display = 'flex';
            adjacencyListPanel.style.display = 'none';
            distancesPanel.style.display = 'block';
        } else {
            endNodeGroup.style.display = 'none';
            adjacencyListPanel.style.display = 'block';
            distancesPanel.style.display = 'none';
        }
    }

    // Canvas Interactions
    btnAddNode.addEventListener('click', () => {
        if (isPlaying) return;
        addNodeMode = true;
        btnAddNode.classList.add('active');
        logMessage("Haz clic en el área blanca para agregar un nodo.");
    });

    btnDeleteNode.addEventListener('click', () => {
        if (isPlaying) return;
        if (selectedNodeId !== null) {
            graph.removeNode(selectedNodeId);
            selectedNodeId = null;
            btnDeleteNode.disabled = true;
            resetSimulation();
            updateUI();
        }
    });

    btnClear.addEventListener('click', () => {
        if (isPlaying) return;
        graph.clear();
        selectedNodeId = null;
        btnDeleteNode.disabled = true;
        resetSimulation();
        updateUI();
    });

    canvas.addEventListener('mousedown', (e) => {
        if (isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicked on node
        let clickedNodeId = null;
        for (const [id, node] of graph.nodes.entries()) {
            const dx = node.x - x;
            const dy = node.y - y;
            if (Math.sqrt(dx * dx + dy * dy) < 20) {
                clickedNodeId = id;
                break;
            }
        }

        if (clickedNodeId !== null) {
            selectedNodeId = clickedNodeId;
            draggingNodeId = clickedNodeId;
            btnDeleteNode.disabled = false;
            addNodeMode = false;
            btnAddNode.classList.remove('active');
            logMessage(`Nodo ${selectedNodeId} seleccionado.`);
        } else {
            if (addNodeMode) {
                const newId = graph.addNode(x, y);
                selectedNodeId = newId;
                btnDeleteNode.disabled = false;
                addNodeMode = false;
                btnAddNode.classList.remove('active');
                logMessage(`Nodo ${newId} agregado.`);
                updateUI();
            } else {
                selectedNodeId = null;
                btnDeleteNode.disabled = true;
            }
        }
        drawGraph();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isPlaying) return;
        if (draggingNodeId !== null) {
            const rect = canvas.getBoundingClientRect();
            const node = graph.nodes.get(draggingNodeId);
            node.x = e.clientX - rect.left;
            node.y = e.clientY - rect.top;
            drawGraph();
        }
    });

    canvas.addEventListener('mouseup', () => {
        draggingNodeId = null;
    });

    // Drawing
    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw edges
        for (const edge of graph.edges) {
            const source = graph.nodes.get(edge.source);
            const target = graph.nodes.get(edge.target);

            if (!source || !target) continue;

            let isHighlighted = false;
            if (currentSimState && currentSimState.activeEdges) {
                isHighlighted = currentSimState.activeEdges.some(e =>
                    (e.source === source.id && e.target === target.id) ||
                    (!graph.isDirected && e.source === target.id && e.target === source.id)
                );
            }

            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);

            ctx.strokeStyle = isHighlighted ? '#f59e0b' : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = isHighlighted ? 3 : 2;
            ctx.stroke();

            // Arrow for directed
            if (graph.isDirected) {
                drawArrowhead(ctx, source.x, source.y, target.x, target.y, isHighlighted ? '#f59e0b' : 'rgba(255, 255, 255, 0.4)');
            }

            // Weight text
            if (graph.isWeighted) {
                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;

                ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
                ctx.beginPath();
                ctx.arc(midX, midY, 12, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = isHighlighted ? '#f59e0b' : '#38bdf8';
                ctx.font = '12px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(edge.weight, midX, midY);
            }
        }

        // Draw nodes
        for (const [id, node] of graph.nodes.entries()) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

            // Determine colors based on state
            let bgColor = '#1e293b';
            let borderColor = 'rgba(255,255,255,0.2)';

            if (currentSimState) {
                if (currentSimState.currentNode === id) {
                    bgColor = '#f59e0b'; // Current
                    borderColor = '#fff';
                } else if (currentSimState.visitedNodes && currentSimState.visitedNodes.includes(id)) {
                    bgColor = '#22c55e'; // Visited
                    borderColor = '#fff';
                }
            } else if (id === selectedNodeId) {
                bgColor = '#ec4899'; // Selected
                borderColor = '#fff';
            }

            ctx.fillStyle = bgColor;
            ctx.fill();
            ctx.lineWidth = id === selectedNodeId ? 3 : 2;
            ctx.strokeStyle = borderColor;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = '14px Outfit';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(id, node.x, node.y);

            // Draw distances for Dijkstra
            if (currentSimState && currentSimState.distances && algorithmSelect.value === 'dijkstra') {
                const dist = currentSimState.distances.get(id);
                const distText = dist === Infinity ? '∞' : dist;
                ctx.fillStyle = '#38bdf8';
                ctx.font = '14px Outfit';
                ctx.fillText(`d:${distText}`, node.x, node.y - 30);
            }
        }
    }

    function drawArrowhead(ctx, fromX, fromY, toX, toY, color) {
        const headlen = 10;
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);

        // Adjust back so arrow isn't inside node circle
        const targetX = toX - 20 * Math.cos(angle);
        const targetY = toY - 20 * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetX - headlen * Math.cos(angle - Math.PI / 6), targetY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(targetX - headlen * Math.cos(angle + Math.PI / 6), targetY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.lineTo(targetX, targetY);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Updates
    function updateUI() {
        updateNodeSelectors();
        drawGraph();
        updateMatrixUI();
        updateListUI();
    }

    function updateNodeSelectors() {
        const nodes = Array.from(graph.nodes.keys()).sort((a, b) => a - b);

        const currentStart = startNodeSelect.value;
        const currentEnd = endNodeSelect.value;

        startNodeSelect.innerHTML = '';
        endNodeSelect.innerHTML = '<option value="none">Todos (Recorrido Completo)</option>';

        nodes.forEach(id => {
            const optStart = document.createElement('option');
            optStart.value = id;
            optStart.textContent = id;
            if (id == currentStart) optStart.selected = true;
            startNodeSelect.appendChild(optStart);

            const optEnd = document.createElement('option');
            optEnd.value = id;
            optEnd.textContent = id;
            if (id == currentEnd) optEnd.selected = true;
            endNodeSelect.appendChild(optEnd);
        });
    }

    function updateMatrixUI() {
        buildMatrixTable(adjacencyMatrix, false);
        buildMatrixTable(modalAdjacencyMatrix, true);
    }

    function buildMatrixTable(tableElement, isEditable) {
        const { matrix, nodeIds } = graph.getAdjacencyMatrix();
        tableElement.innerHTML = '';

        if (nodeIds.length === 0) {
            tableElement.innerHTML = '<tr><td>Vacio</td></tr>';
            return;
        }

        // Header
        const thead = document.createElement('tr');
        thead.appendChild(document.createElement('th'));
        nodeIds.forEach(id => {
            const th = document.createElement('th');
            th.textContent = id;
            thead.appendChild(th);
        });
        tableElement.appendChild(thead);

        // Rows
        nodeIds.forEach((idRow, i) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = idRow;
            tr.appendChild(th);

            nodeIds.forEach((idCol, j) => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';

                if (!graph.isWeighted) {
                    input.max = '1';
                }

                input.value = matrix[i][j] || '';
                if (input.value === '0') input.value = '';

                input.disabled = isPlaying || !isEditable;

                if (isEditable) {
                    input.addEventListener('change', (e) => {
                        let val = parseInt(e.target.value);
                        if (isNaN(val) || val < 0) val = 0;
                        if (!graph.isWeighted && val > 1) val = 1;

                        if (val === 0) {
                            graph.removeEdge(idRow, idCol);
                        } else {
                            graph.addEdge(idRow, idCol, val);
                        }

                        resetSimulation();
                        updateUI();
                    });
                }

                td.appendChild(input);
                tr.appendChild(td);
            });
            tableElement.appendChild(tr);
        });
    }

    function updateListUI() {
        const list = graph.getAdjacencyList();
        adjacencyList.innerHTML = '';

        if (list.size === 0) {
            adjacencyList.innerHTML = '<i>Vacio</i>';
            return;
        }

        for (const [id, edges] of list.entries()) {
            const row = document.createElement('div');
            row.className = 'adj-row';

            const nodeSpan = document.createElement('span');
            nodeSpan.className = 'adj-node';
            nodeSpan.textContent = `${id}: `;

            const edgesSpan = document.createElement('span');
            edgesSpan.className = 'adj-edges';

            if (edges.length === 0) {
                edgesSpan.textContent = '[]';
            } else {
                const edgeStrs = edges.map(e => graph.isWeighted ? `${e.target}(w:${e.weight})` : `${e.target}`);
                edgesSpan.textContent = `[ ${edgeStrs.join(', ')} ]`;
            }

            row.appendChild(nodeSpan);
            row.appendChild(edgesSpan);
            adjacencyList.appendChild(row);
        }
    }

    function logMessage(msg) {
        logText.textContent = msg;
    }

    // --- Simulation Logic ---

    function prepareSimulation() {
        if (graph.nodes.size === 0) {
            logMessage("El grafo está vacío.");
            return false;
        }

        let startNodeId = parseInt(startNodeSelect.value);
        if (isNaN(startNodeId)) {
            logMessage("No hay un nodo inicial válido seleccionado.");
            return false;
        }

        const endNodeId = endNodeSelect.value;
        const alg = algorithmSelect.value;

        simHistory = [];
        currentStepIndex = -1;

        if (alg === 'bfs') {
            simGenerator = bfs(graph, startNodeId);
        } else if (alg === 'dfs') {
            simGenerator = dfs(graph, startNodeId);
        } else if (alg === 'dijkstra') {
            simGenerator = dijkstra(graph, startNodeId, endNodeId);
        }

        simHistory.push({
            currentNode: null,
            visitedNodes: [],
            activeEdges: [],
            log: "Simulación lista para comenzar."
        });
        currentStepIndex = 0;
        applyStepToUI();

        btnPrev.disabled = true;
        btnNext.disabled = false;

        // Disabled matrix
        updateMatrixUI();

        return true;
    }

    function stepForward() {
        if (currentStepIndex < simHistory.length - 1) {
            currentStepIndex++;
            applyStepToUI();
        } else if (simGenerator) {
            const next = simGenerator.next();
            if (!next.done) {
                simHistory.push(next.value);
                currentStepIndex++;
                applyStepToUI();
            } else {
                pauseSimulation();
                btnNext.disabled = true;
                logMessage("Simulación Finalizada.");
            }
        }
        btnPrev.disabled = currentStepIndex <= 0;
    }

    function stepBackward() {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            applyStepToUI();
            btnNext.disabled = false;
        }
        btnPrev.disabled = currentStepIndex <= 0;
    }

    function applyStepToUI() {
        currentSimState = simHistory[currentStepIndex];
        if (currentSimState && currentSimState.log) {
            logMessage(currentSimState.log);
        }
        drawGraph();
        updateDistancesTable();
    }

    function updateDistancesTable() {
        if (algorithmSelect.value !== 'dijkstra') return;

        distancesTableBody.innerHTML = '';
        if (!currentSimState || !currentSimState.distances) return;

        for (const [nodeId, dist] of currentSimState.distances.entries()) {
            const tr = document.createElement('tr');

            const tdNode = document.createElement('td');
            tdNode.textContent = nodeId;
            tdNode.style.fontWeight = 'bold';

            const tdDist = document.createElement('td');
            tdDist.textContent = dist === Infinity ? '∞' : dist;
            if (dist !== Infinity) tdDist.style.color = '#38bdf8';

            const tdPrev = document.createElement('td');
            const prev = currentSimState.previous.get(nodeId);
            tdPrev.textContent = prev === null ? '-' : prev;

            tr.appendChild(tdNode);
            tr.appendChild(tdDist);
            tr.appendChild(tdPrev);

            if (currentSimState.currentNode === nodeId) {
                tr.style.background = 'rgba(245, 158, 11, 0.2)';
            }

            distancesTableBody.appendChild(tr);
        }
    }

    function playSimulation() {
        if (!simGenerator && currentStepIndex === -1) {
            if (!prepareSimulation()) return;
        }

        if (currentStepIndex === simHistory.length - 1 && (!simGenerator || simGenerator.next().done)) {
            prepareSimulation();
        }

        isPlaying = true;
        btnPlay.style.display = 'none';
        btnPause.style.display = 'inline-block';

        playInterval = setInterval(() => {
            stepForward();
        }, 1000);
    }

    function pauseSimulation() {
        isPlaying = false;
        btnPlay.style.display = 'inline-block';
        btnPause.style.display = 'none';
        if (playInterval) clearInterval(playInterval);
    }

    function resetSimulation() {
        pauseSimulation();
        simGenerator = null;
        simHistory = [];
        currentStepIndex = -1;
        currentSimState = null;
        btnPrev.disabled = true;
        btnNext.disabled = true;
        drawGraph();
        updateMatrixUI();
        logMessage("Simulacion reiniciada. Edita el grafo o pulsa play.");
    }

    // Playback buttons
    btnPlay.addEventListener('click', playSimulation);
    btnPause.addEventListener('click', pauseSimulation);
    btnNext.addEventListener('click', () => { pauseSimulation(); stepForward(); });
    btnPrev.addEventListener('click', () => { pauseSimulation(); stepBackward(); });
    btnReset.addEventListener('click', resetSimulation);

    btnCycle.addEventListener('click', () => {
        if (isPlaying) return;
        resetSimulation();

        simGenerator = hasCycle(graph);
        simHistory = [{
            currentNode: null,
            visitedNodes: [],
            activeEdges: [],
            log: "Verificando ciclos..."
        }];
        currentStepIndex = 0;
        applyStepToUI();

        isPlaying = true;
        btnPlay.style.display = 'none';
        btnPause.style.display = 'inline-block';

        playInterval = setInterval(() => {
            const next = simGenerator.next();
            if (!next.done) {
                simHistory.push(next.value);
                currentStepIndex++;
                applyStepToUI();
            } else {
                pauseSimulation();
                btnNext.disabled = true;
                if (next.value === true) {
                    logMessage("¡La grafica tiene al menos un ciclo!");
                } else {
                    logMessage("La grafica no tiene ciclos");
                }
            }
        }, 1000);
    });

    const n0 = graph.addNode(150, 150);
    const n1 = graph.addNode(400, 120);
    const n2 = graph.addNode(280, 400);

    graph.addEdge(n0, n1, 5);
    graph.addEdge(n1, n2, 8);

    updateUI();
});

const mazeContainer = document.getElementById("maze");
const stackContainer = document.getElementById("stack-container");
const statusText = document.getElementById("status-text");
const statusDot = document.getElementById("status-dot");
const stepCounter = document.getElementById("step-counter");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const mazeSelector = document.getElementById("mazeSelector");

const mazes = {
    easy: [
        ["S", ".", ".", "#", "."],
        ["#", "#", ".", "#", "."],
        [".", ".", ".", ".", "."],
        [".", "#", "#", "#", "."],
        [".", ".", ".", "E", "."]
    ],
    "no-solution": [
        ["S", ".", "#", ".", "."],
        ["#", ".", "#", ".", "#"],
        [".", ".", "#", ".", "."],
        ["#", ".", "#", ".", "#"],
        [".", ".", "#", "E", "."]
    ],
    multiple: [
        ["S", ".", ".", ".", "."],
        ["#", "#", ".", "#", "."],
        [".", ".", ".", ".", "."],
        [".", "#", ".", "#", "."],
        [".", ".", ".", ".", "E"]
    ]
};

let baseMaze = [];
let maze = [];
let visited = [];
let stack = [];
let end = null;
let steps = 0;
let running = false;
let interval = null;
let solved = false;
let customMazeData = null;

function configureMaze() {
    let source;
    if (customMazeData) {
        source = customMazeData;
        updateUI("Laberinto personalizado listo", "idle");
    } else {
        source = mazes[mazeSelector.value];
        updateUI("Modo preajuste: listo para iniciar", "idle");
    }

    baseMaze = source.map(row => [...row]);
    initSimulation();
}

function initSimulation() {
    maze = baseMaze.map(row => [...row]);
    visited = maze.map(row => row.map(() => false));
    stack = [];
    end = null;
    steps = 0;
    solved = false;
    running = false;

    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    maze.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === "E") end = { x: i, y: j };
            if (cell === "S") stack.push({ x: i, y: j });
        });
    });

    drawMaze();
    drawStack();
    stepCounter.textContent = `Pasos: ${steps}`;
}

function updateUI(msg, state) {
    statusText.textContent = msg;
    stepCounter.textContent = `Pasos: ${steps}`;

    statusDot.className = "dot";
    if (state === "running") statusDot.classList.add("active");
    else if (state === "success") statusDot.style.background = "var(--accent-emerald)";
    else if (state === "fail") statusDot.style.background = "var(--accent-rose)";
    else if (state === "idle") statusDot.style.background = "#475569";
}

function drawMaze() {
    mazeContainer.innerHTML = "";
    mazeContainer.style.gridTemplateColumns = `repeat(${maze[0].length}, var(--cell-size))`;

    maze.forEach((row, i) => {
        row.forEach((cell, j) => {
            const div = document.createElement("div");
            div.classList.add("cell");

            if (cell === "#") div.classList.add("wall");
            else if (cell === "S") {
                div.classList.add("start");
                div.innerHTML = "<span>S</span>";
            }
            else if (cell === "E") {
                div.classList.add("end");
                div.innerHTML = "<span>E</span>";
            }
            else if (visited[i][j]) {
                div.classList.add(maze[i][j] === "X" ? "backtrack" : "visited");
            } else {
                div.classList.add("free");
            }

            mazeContainer.appendChild(div);
        });
    });
}

function drawStack() {
    stackContainer.innerHTML = "";
    [...stack].reverse().forEach((pos, index) => {
        const item = document.createElement("div");
        item.classList.add("stack-item");
        if (index === 0) item.style.border = "1px solid var(--accent-emerald)";

        item.innerHTML = `
            <span class="index">${stack.length - 1 - index}</span>
            <span class="coord">[${pos.x}, ${pos.y}]</span>
        `;
        stackContainer.appendChild(item);
    });
}

function getNeighbors(x, y) {
    const dirs = [
        { x: x - 1, y }, { x: x + 1, y },
        { x, y: y - 1 }, { x, y: y + 1 }
    ];

    return dirs.filter(n =>
        n.x >= 0 && n.y >= 0 &&
        n.x < maze.length && n.y < maze[0].length &&
        maze[n.x][n.y] !== "#" &&
        !visited[n.x][n.y]
    );
}

function step() {
    if (solved || stack.length === 0) {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        if (stack.length === 0) updateUI("No hay salida posible", "fail");
        return;
    }

    steps++;
    const current = stack[stack.length - 1];

    if (current.x === end.x && current.y === end.y) {
        solved = true;
        updateUI("¡Meta alcanzada!", "success");
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        drawMaze();
        return;
    }

    visited[current.x][current.y] = true;
    const neighbors = getNeighbors(current.x, current.y);

    if (neighbors.length > 0) {
        const next = neighbors[0];
        stack.push({ x: next.x, y: next.y });
        updateUI(`Explorando: (${current.x}, ${current.y}) -> (${next.x}, ${next.y})`, "running");
    } else {
        const dead = stack.pop();
        if (dead) {
            maze[dead.x][dead.y] = "X";
            updateUI(`Sin salida en (${dead.x}, ${dead.y}). Retrocediendo...`, "running");
        }
    }

    drawMaze();
    drawStack();
}

// Carga de Archivos
uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const content = event.target.result.trim();
        const rows = content.split(/\r?\n/).map(row => row.trim().split(/\s+/));

        if (rows.length === 5 && rows.every(r => r.length === 5)) {
            const isValid = rows.every(r => r.every(c => c === "0" || c === "1"));
            if (isValid) {
                customMazeData = rows.map((row, i) =>
                    row.map((cell, j) => {
                        if (i === 0 && j === 0) return "S";
                        if (i === 4 && j === 4) return "E";
                        return cell === "1" ? "#" : ".";
                    })
                );
                uploadBtn.textContent = `Archivo: ${file.name}`;
                uploadBtn.style.borderColor = "var(--accent-emerald)";
                configureMaze();
            } else {
                alert("El archivo debe contener solo 0s y 1s.");
            }
        } else {
            alert("El laberinto debe ser forzosamente de 5x5 (5 filas y 5 columnas).");
        }
    };
    reader.readAsText(file);
};

mazeSelector.onchange = () => {
    customMazeData = null;
    uploadBtn.textContent = "Subir .txt";
    uploadBtn.style.borderColor = "var(--glass-border)";
    configureMaze();
};

document.getElementById("resetBtn").onclick = initSimulation;
document.getElementById("stepBtn").onclick = step;

document.getElementById("autoBtn").onclick = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        updateUI("Pausado", "idle");
    } else {
        updateUI("Simulando...", "running");
        interval = setInterval(step, 400);
    }
};

// Inicio
configureMaze();

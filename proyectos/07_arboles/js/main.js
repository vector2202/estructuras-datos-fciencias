import { TreeVisualizer } from "./render/tree-visualizer.js";
import { BST } from "./bst.js";
import { AVL } from "./avl.js";

// Initialize Visualizers
const bstVisualizer = new TreeVisualizer("canvasBST");
const avlVisualizer = new TreeVisualizer("canvasAVL");

bstVisualizer.showMessage = (msg) => {
    document.getElementById("msgBST").innerText = msg;
};
avlVisualizer.showMessage = (msg) => {
    document.getElementById("msgAVL").innerText = msg;
};

// Initialize Trees
const bst = new BST(bstVisualizer);
const avl = new AVL(avlVisualizer);

function setControlsDisabled(type, disabled) {
    document.querySelectorAll(`#controls${type} button`).forEach(btn => {
        btn.disabled = disabled;
    });
    document.getElementById(`value${type}`).disabled = disabled;
}

function setup(type, tree, visualizer) {
    const insertBtn = document.getElementById(`insert${type}`);
    const deleteBtn = document.getElementById(`delete${type}`);
    const searchBtn = document.getElementById(`search${type}`);
    const randomBtn = document.getElementById(`random${type}`);
    const clearBtn = document.getElementById(`clear${type}`);
    const input = document.getElementById(`value${type}`);

    // Traversals
    const inorderBtn = document.getElementById(`inorder${type}`);
    const preorderBtn = document.getElementById(`preorder${type}`);
    const postorderBtn = document.getElementById(`postorder${type}`);

    async function handleAction(actionFn) {
        setControlsDisabled(type, true);
        await visualizer.clearHighlights();
        try {
            await actionFn();
        } catch (e) {
            console.error(e);
            visualizer.showMessage("Error: " + e.message);
        } finally {
            setControlsDisabled(type, false);
            await visualizer.clearHighlights();
            input.value = "";
            input.focus();
        }
    }

    insertBtn.onclick = () => {
        const value = parseInt(input.value);
        if (isNaN(value)) {
            visualizer.showMessage("Por favor ingresa un número válido.");
            return;
        }
        handleAction(() => tree.insert(value));
    };

    deleteBtn.onclick = () => {
        const value = parseInt(input.value);
        if (isNaN(value)) return;
        handleAction(() => tree.remove(value));
    };

    searchBtn.onclick = () => {
        const value = parseInt(input.value);
        if (isNaN(value)) return;
        handleAction(() => tree.search(value));
    };

    randomBtn.onclick = () => {
        const count = 5;
        visualizer.showMessage(`Insertando ${count} nodos aleatorios...`);
        setControlsDisabled(type, true);

        (async () => {
            await visualizer.clearHighlights();

            for (let i = 0; i < count; i++) {
                const val = Math.floor(Math.random() * 100);
                await tree.insert(val);
                await visualizer.sleep(200);
            }

            await visualizer.clearHighlights();

            setControlsDisabled(type, false);
            visualizer.showMessage("Inserción aleatoria completada.");
        })();
    };

    clearBtn.onclick = () => {
        tree.root = null;
        visualizer.clear();
        visualizer.showMessage("Árbol limpiado.");
    };

    const playbackPanel = document.getElementById(`playback${type}`);
    const controlsPanel = document.getElementById(`controls${type}`);
    const btnPrev = document.getElementById(`btnPrev${type}`);
    const btnPlay = document.getElementById(`btnPlay${type}`);
    const btnPause = document.getElementById(`btnPause${type}`);
    const btnNext = document.getElementById(`btnNext${type}`);
    const btnReset = document.getElementById(`btnReset${type}`);
    const playbackStatus = document.getElementById(`playbackStatus${type}`);

    let pathArray = [];
    let currentIndex = -1;
    let isPlaying = false;

    function updatePlaybackUI() {
        btnPrev.disabled = currentIndex <= 0;
        btnNext.disabled = currentIndex >= pathArray.length;

        if (isPlaying) {
            btnPlay.style.display = 'none';
            btnPause.style.display = 'inline-block';
        } else {
            btnPlay.style.display = 'inline-block';
            btnPause.style.display = 'none';
        }
    }

    async function applyStep() {
        if (currentIndex >= 0 && currentIndex < pathArray.length) {
            const val = pathArray[currentIndex];
            playbackStatus.innerText = `Visitando: ${val}`;
            await visualizer.clearHighlights();
            for (let i = 0; i < currentIndex; i++) {
                visualizer.highlightNode(pathArray[i], "found-node");
            }
            visualizer.highlightNode(val, "visiting-node");
        } else if (currentIndex >= pathArray.length) {
            playbackStatus.innerText = `Recorrido Completado.`;
            isPlaying = false;
            await visualizer.clearHighlights();
            for (let i = 0; i < pathArray.length; i++) {
                visualizer.highlightNode(pathArray[i], "found-node");
            }
        }
        updatePlaybackUI();
    }

    function stepForward() {
        if (currentIndex < pathArray.length) {
            currentIndex++;
            applyStep();
        }
    }

    function stepBackward() {
        if (currentIndex > 0) {
            currentIndex--;
            applyStep();
        }
    }

    async function playPlayback() {
        if (isPlaying) return;
        isPlaying = true;
        updatePlaybackUI();

        if (currentIndex >= pathArray.length) currentIndex = 0;
        if (currentIndex === -1) currentIndex = 0;
        await applyStep();

        while (isPlaying && currentIndex < pathArray.length) {
            await visualizer.sleep();
            if (!isPlaying) break;
            currentIndex++;
            await applyStep();
        }
        updatePlaybackUI();
    }

    function pausePlayback() {
        isPlaying = false;
        updatePlaybackUI();
    }

    async function resetPlayback() {
        pausePlayback();
        playbackPanel.style.display = "none";
        controlsPanel.style.display = "flex";
        pathArray = [];
        currentIndex = -1;
        await visualizer.clearHighlights();
        visualizer.showMessage("Esperando acción...");
        setControlsDisabled(type, false);
    }

    if (btnPlay) {
        btnPlay.onclick = playPlayback;
        btnPause.onclick = pausePlayback;
        btnNext.onclick = () => { pausePlayback(); stepForward(); };
        btnPrev.onclick = () => { pausePlayback(); stepBackward(); };
        btnReset.onclick = resetPlayback;
    }

    async function startTraversal(traversalType, name) {
        if (!tree.root) {
            visualizer.showMessage("El árbol está vacío.");
            return;
        }

        setControlsDisabled(type, true);
        pathArray = tree.getTraversalPath(traversalType);
        currentIndex = -1;

        controlsPanel.style.display = 'none';
        playbackPanel.style.display = 'block';
        playbackStatus.innerText = `Recorrido ${name} iniciado...`;

        visualizer.showMessage(`Recorrido ${name}. Controles activos.`);
        updatePlaybackUI();
    }

    if (inorderBtn) inorderBtn.onclick = () => startTraversal("in", "Inorden");
    if (preorderBtn) preorderBtn.onclick = () => startTraversal("pre", "Preorden");
    if (postorderBtn) postorderBtn.onclick = () => startTraversal("post", "Postorden");
}

setup("BST", bst, bstVisualizer);
setup("AVL", avl, avlVisualizer);

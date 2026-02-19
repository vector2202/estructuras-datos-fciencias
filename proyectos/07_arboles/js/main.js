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

// Helper to disable buttons during animation
function setControlsDisabled(type, disabled) {
    document.querySelectorAll(`#${type.toLowerCase()} button`).forEach(btn => {
        btn.disabled = disabled;
    });
    document.getElementById(`value${type}`).disabled = disabled;
}

// Setup Event Listeners
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

    async function handleAction(actionProm) {
        setControlsDisabled(type, true);
        await visualizer.clearHighlights(); // Clear previous highlights BEFORE starting
        try {
            await actionProm;
        } catch (e) {
            console.error(e);
            visualizer.showMessage("Error: " + e.message);
        } finally {
            setControlsDisabled(type, false);
            // Clear any remaining highlights
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
        handleAction(tree.insert(value));
    };

    deleteBtn.onclick = () => {
        const value = parseInt(input.value);
        if (isNaN(value)) return;
        handleAction(tree.remove(value));
    };

    searchBtn.onclick = () => {
        const value = parseInt(input.value);
        if (isNaN(value)) return;
        handleAction(tree.search(value));
    };

    randomBtn.onclick = () => {
        const count = 5;
        visualizer.showMessage(`Insertando ${count} nodos aleatorios...`);
        setControlsDisabled(type, true);

        // Chain promises or use a loop with await
        (async () => {
            // No need to clear highlights inside the loop if we want to see progress,
            // but we should clear them at the start? Or handleAction wrapper?
            // "Random" has custom logic not using handleAction.
            await visualizer.clearHighlights();

            for (let i = 0; i < count; i++) {
                const val = Math.floor(Math.random() * 100);
                // We use tree.insert directly, which highlights nodes.
                // We should probably allow the tree to handle it, but maybe silence messages?
                // For now, just run it.
                await tree.insert(val);
                await visualizer.sleep(200);
            }

            // Explicitly clear highlights after random insertion batch is done
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

    if (inorderBtn) inorderBtn.onclick = () => handleAction(tree.traverse("in"));
    if (preorderBtn) preorderBtn.onclick = () => handleAction(tree.traverse("pre"));
    if (postorderBtn) postorderBtn.onclick = () => handleAction(tree.traverse("post"));
}

setup("BST", bst, bstVisualizer);
setup("AVL", avl, avlVisualizer);

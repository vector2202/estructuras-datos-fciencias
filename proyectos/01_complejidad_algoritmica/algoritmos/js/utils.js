export const Utils = {
    // Generador de array aleatorio
    generateArray: (size, type = 'random', min = 5, max = 200) => {
        let arr = [];
        if (type === 'random') {
            arr = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
        } else if (type === 'nearly_sorted') {
            arr = Array.from({ length: size }, (_, i) => Math.floor(min + (i / size) * (max - min)));
            const swaps = Math.max(1, Math.floor(size * 0.05));
            for (let i = 0; i < swaps; i++) {
                const idx1 = Math.floor(Math.random() * size);
                const idx2 = Math.floor(Math.random() * size);
                [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
            }
        } else if (type === 'reversed') {
            arr = Array.from({ length: size }, (_, i) => Math.floor(max - (i / size) * (max - min)));
        } else if (type === 'few_unique') {
            const uniques = Array.from({ length: 5 }, () => Math.floor(Math.random() * (max - min + 1) + min));
            arr = Array.from({ length: size }, () => uniques[Math.floor(Math.random() * uniques.length)]);
        }
        return arr;
    },

    // Sleep dinámico que lee el valor actual del slider
    sleep: (msFn) => {
        return new Promise(resolve => setTimeout(resolve, msFn()));
    },

    // Renderizado OPTIMIZADO: Solo toca el DOM si es necesario
    render: (containerId, array, highlights = {}) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const bars = container.children;
        const maxVal = Math.max(...array, 1);

        // Si el tamaño cambió, reconstruimos todo (Layout Thrashing inevitable aquí, pero solo ocurre al cambiar size)
        if (bars.length !== array.length) {
            container.innerHTML = '';
            const fragment = document.createDocumentFragment();

            array.forEach(val => {
                const bar = document.createElement('div');
                bar.className = 'bar';
                // Calculamos altura inicial
                bar.style.height = `${(val / maxVal) * 100}%`;
                fragment.appendChild(bar);
            });
            container.appendChild(fragment);
            return;
        }

        // Actualización eficiente (solo atributos)
        for (let i = 0; i < array.length; i++) {
            const bar = bars[i];
            const newHeight = `${(array[i] / maxVal) * 100}%`;

            // Solo tocar style si cambió
            if (bar.style.height !== newHeight) {
                bar.style.height = newHeight;
            }

            // Gestión de colores (State class)
            bar.className = 'bar'; // Reset clases base
            if (highlights[i]) {
                bar.classList.add(highlights[i]); // 'compare', 'swap', 'overwrite'
            }
        }
    }
};

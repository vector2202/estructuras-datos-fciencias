document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.section');

    function switchTab(targetId) {
        tabs.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.target === targetId) {
                t.classList.add('active');
            }
        });

        sections.forEach(s => {
            s.classList.remove('active');
            if (s.id === targetId) {
                s.classList.add('active');
            }
        });

        window.dispatchEvent(new Event('resize'));
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    console.log("Visualizador de Listas Enlazadas - Iniciado");
});

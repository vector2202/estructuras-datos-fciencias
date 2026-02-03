import initArray from "./array_example.js";
import initList from "./list_example.js";
import initStack from "./stack_example.js";
import initQueue from "./queue_example.js";
import initCircular from "./circular_list_example.js";

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".section");

    // Tab switching logic
    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            btn.classList.add("active");
            const targetId = btn.dataset.tab;
            document.getElementById(targetId).classList.add("active");
        });
    });

    // Initialize all simulations
    initArray();
    initList();
    initStack();
    initQueue();
    initCircular();
});
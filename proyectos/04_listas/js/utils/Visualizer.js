export class Visualizer {
    constructor(explanationId, stepsId = null) {
        this.explanationEl = document.getElementById(explanationId);
        this.stepsEl = stepsId ? document.getElementById(stepsId) : null;
        this.isAnimating = false;
    }

    /**
     * Pauses execution for a given number of milliseconds
     * @param {number} ms 
     */
    async sleep(ms = 800) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Updates the explanation text and optionally the step counter
     * @param {string} message 
     * @param {number|null} stepCount 
     */
    log(message, stepCount = null) {
        if (this.explanationEl) {
            this.explanationEl.innerHTML = message;
        }
        if (this.stepsEl && stepCount !== null) {
            this.stepsEl.textContent = `Pasos: ${stepCount}`;
        } else if (this.stepsEl && stepCount === null) {
            // Optional: clear steps if null passed? 
            // Often better to keep last count or clear explicitly. 
            // For now, let's leave as is or clear if explicit "" string passed to message?
        }
    }

    /**
     * Reads an integer from an input element
     * @param {HTMLInputElement} inputEl 
     * @returns {number|null} The value or null if invalid/empty
     */
    getValue(inputEl) {
        if (!inputEl || inputEl.value === "") return null;
        const v = parseInt(inputEl.value); // Could pass float if needed, but lists usually int demo
        // Reset input? Usually good UX to clear input after action, 
        // but maybe the caller should do that to confirm success first.
        return isNaN(v) ? null : v;
    }

    /**
     * Set animation lock
     */
    start() {
        if (this.isAnimating) return false;
        this.isAnimating = true;
        return true;
    }

    stop() {
        this.isAnimating = false;
    }
}

export class Visualizer {
    constructor(explanationId, stepsId) {
        this.explanationEl = document.getElementById(explanationId);
        this.stepsEl = document.getElementById(stepsId);
        this.isAnimating = false;
        this.speedFactor = 1.0;
    }

    async sleep(ms = 800) {
        return new Promise(r => setTimeout(r, ms / this.speedFactor));
    }

    setSpeed(factor) {
        this.speedFactor = factor;
    }

    log(msg, step = null) {
        this.explanationEl.innerHTML = msg;
        if (step !== null) {
            this.stepsEl.textContent = `Pasos: ${step}`;
        }
    }

    start() {
        if (this.isAnimating) return false;
        this.isAnimating = true;
        return true;
    }

    stop() {
        this.isAnimating = false;
    }

    getValue(input) {
        const v = parseInt(input.value);
        return isNaN(v) ? null : v;
    }
}

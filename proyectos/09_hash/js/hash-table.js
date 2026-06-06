class HashTableSimulator {
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);
        this.elementCount = 0;
        this.strategy = 'chaining';
        this.hashFunctionType = 'simple';

        this.initUI();
        this.render();
    }

    initUI() {
        document.querySelectorAll('#strategyTabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#strategyTabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.strategy = btn.dataset.strategy;
                this.reset();
            });
        });

        document.querySelectorAll('#hashTabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#hashTabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.hashFunctionType = btn.dataset.hash;
                this.updateFormula();
            });
        });

        // Actions
        document.getElementById('btnInsert').addEventListener('click', () => this.insert());
        document.getElementById('btnReset').addEventListener('click', () => this.reset());
        document.getElementById('btnResize').addEventListener('click', () => this.resize(5));

        // Enter key for input
        document.getElementById('hashValue').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.insert();
        });

        this.updateFormula();
    }

    updateFormula() {
        const formulaEl = document.getElementById('hashFormula');
        if (this.hashFunctionType === 'simple') {
            formulaEl.textContent = `h(x) = x mod ${this.size}`;
        } else {
            formulaEl.textContent = `h(x) = (∑(digits * multiplier)) mod ${this.size}`;
        }
    }

    simpleHash(x) {
        return x % this.size;
    }

    complexHash(x) {
        const str = x.toString();
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += parseInt(str[i]) * (i + 1) * 31;
        }
        return sum % this.size;
    }

    getHash(x) {
        return this.hashFunctionType === 'simple' ? this.simpleHash(x) : this.complexHash(x);
    }

    async insert() {
        const input = document.getElementById('hashValue');
        const val = parseInt(input.value);
        if (isNaN(val)) return;

        input.value = '';
        const h = this.getHash(val);
        const formulaOut = document.getElementById('hashOutput');
        formulaOut.textContent = ` -> ${h}`;

        this.log(`Insertando ${val}... Hash base: ${h}`);

        if (this.strategy === 'chaining') {
            await this.insertChaining(val, h);
        } else if (this.strategy === 'linear') {
            await this.insertProbing(val, h, 'linear');
        } else {
            await this.insertProbing(val, h, 'quadratic');
        }

        this.elementCount++;
        this.updateStats();
        this.render();
    }

    async insertChaining(val, h) {
        const bucket = this.table[h];
        if (bucket.length > 0) {
            this.log(`¡Colisión en indice ${h}! Agregando a la lista.`, 'danger');
            this.highlightBucket(h, 'collision');
        }
        bucket.push(val);
        await this.sleep(400);
    }

    async insertProbing(val, h, type) {
        let i = 0;
        let pos = h;

        while (this.table[pos].length > 0) {
            this.log(`Colisión en ${pos}. Probando siguiente...`, 'warning');
            this.highlightBucket(pos, 'probing');
            await this.sleep(500);

            i++;
            if (type === 'linear') {
                pos = (h + i) % this.size;
            } else {
                pos = (h + i * i) % this.size;
            }

            if (i >= this.size) {
                this.log("¡Tabla llena!", "danger");
                return;
            }
        }

        this.table[pos].push(val);
        this.highlightBucket(pos, 'success');
        await this.sleep(400);
    }

    highlightBucket(idx, type) {
        const buckets = document.querySelectorAll('.bucket');
        const target = buckets[idx];
        if (target) {
            target.classList.add(type);
            setTimeout(() => target.classList.remove(type), 1000);
        }
    }

    log(msg, type = '') {
        const logBox = document.getElementById('logText');
        logBox.textContent = msg;
        logBox.className = type;
    }

    updateStats() {
        document.getElementById('tableSize').textContent = this.size;
        document.getElementById('elementCount').textContent = this.elementCount;
        document.getElementById('loadFactor').textContent = (this.elementCount / this.size).toFixed(2);
    }

    reset() {
        this.table = new Array(this.size).fill(null).map(() => []);
        this.elementCount = 0;
        this.updateStats();
        this.render();
        this.log("Simulador reiniciado");
        document.getElementById('hashOutput').textContent = '';
    }

    resize(amount) {
        const oldEntries = [];
        this.table.forEach(bucket => bucket.forEach(val => oldEntries.push(val)));

        this.size += amount;
        this.reset();

        this.log(`Tabla aumentada a ${this.size}. Re-insertando elementos...`);
        this.updateFormula();
        oldEntries.forEach(val => {
            const h = this.getHash(val);
            if (this.strategy === 'chaining') {
                this.table[h].push(val);
            } else {
                let i = 0;
                let pos = h;
                const type = this.strategy;
                while (this.table[pos].length > 0) {
                    i++;
                    pos = (type === 'linear') ? (h + i) % this.size : (h + i * i) % this.size;
                }
                this.table[pos].push(val);
            }
            this.elementCount++;
        });

        this.updateStats();
        this.render();
    }

    render() {
        const container = document.getElementById('hashTableDisplay');
        container.innerHTML = '';

        this.table.forEach((bucket, idx) => {
            const bucketEl = document.createElement('div');
            bucketEl.className = 'bucket';
            if (this.strategy === 'chaining' && bucket.length > 1) {
                bucketEl.classList.add('collision');
            }

            const indexEl = document.createElement('div');
            indexEl.className = 'bucket-index';
            indexEl.textContent = idx;

            const contentEl = document.createElement('div');
            contentEl.className = 'bucket-content';

            bucket.forEach(val => {
                const nodeEl = document.createElement('div');
                nodeEl.className = 'node';
                nodeEl.textContent = val;
                contentEl.appendChild(nodeEl);
            });

            bucketEl.appendChild(indexEl);
            bucketEl.appendChild(contentEl);
            container.appendChild(bucketEl);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    new HashTableSimulator(10);
});

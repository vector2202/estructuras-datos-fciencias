export default class Queue {
    constructor(capacity = 5) {
        this.items = [];
        this.capacity = capacity;
    }

    isFull() {
        return this.items.length === this.capacity;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    enqueue(value) {
        if (this.isFull()) throw "Overflow: la cola está llena";
        this.items.push(value);
    }

    dequeue() {
        if (this.isEmpty()) throw "Underflow: la cola está vacía";
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) throw "Underflow: la cola está vacía";
        return this.items[0];
    }
}

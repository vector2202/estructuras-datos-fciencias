export default class CircularQueue {
    constructor(capacity = 6) {
        this.queue = new Array(capacity).fill(null);
        this.capacity = capacity;
        this.front = 0;
        this.tail = -1;
        this.size = 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(value) {
        if (this.isFull()) throw "Overflow: La cola circular está llena";
        this.tail = (this.tail + 1) % this.capacity;
        this.queue[this.tail] = value;
        this.size++;
        return this.tail;
    }

    dequeue() {
        if (this.isEmpty()) throw "Underflow: La cola circular está vacía";
        const value = this.queue[this.front];
        const oldFront = this.front;
        this.queue[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return { value, index: oldFront };
    }

    peek() {
        if (this.isEmpty()) throw "Underflow: La cola circular está vacía";
        return this.queue[this.front];
    }
}

import Node from "./Node.js";

export default class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertAtStart(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = this.tail = node;
            node.next = node;
            return;
        }

        node.next = this.head;
        this.head = node;
        this.tail.next = this.head;
    }

    insertAtEnd(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = this.tail = node;
            node.next = node;
            return;
        }

        node.next = this.head;
        this.tail.next = node;
        this.tail = node;
    }

    search(value) {
        if (!this.head) return null;

        let current = this.head;
        let steps = 0;

        do {
            steps++;
            if (current.value == value) return { node: current, steps };
            current = current.next;
        } while (current !== this.head);

        return { node: null, steps };
    }

    remove(value) {
        if (!this.head) return false;

        let current = this.head;
        let prev = this.tail;

        do {
            if (current.value == value) {
                if (current === this.head && current === this.tail) {
                    this.head = this.tail = null;
                    return true;
                }

                if (current === this.head) {
                    this.head = current.next;
                    this.tail.next = this.head;
                } else if (current === this.tail) {
                    this.tail = prev;
                    this.tail.next = this.head;
                } else {
                    prev.next = current.next;
                }
                return true;
            }
            prev = current;
            current = current.next;
        } while (current !== this.head);

        return false;
    }

    toArray(limit = 30) {
        const result = [];
        if (!this.head) return result;

        let current = this.head;
        let count = 0;

        do {
            result.push(current);
            current = current.next;
            count++;
        } while (current !== this.head && count < limit);

        return result;
    }
}

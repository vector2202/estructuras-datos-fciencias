import DoubleLinkedNode from './DoubleLinkedNode.js';

export default class DoubleLinkedList {
    constructor() {
	this.head = null;
	this.tail = null;
    }

    insert(value) {
	const node = new DoubleLinkedNode(value);

	if (!this.head) {
	    this.head = this.tail = node;
	    return;
	}

	node.prev = this.tail;
	this.tail.next = node;
	this.tail = node;
    }

    remove(value) {
	let current = this.head;

	while (current && current.value != value) {
	    current = current.next;
	}

	if (!current) return;

	if (current.prev) current.prev.next = current.next;
	else this.head = current.next;

	if (current.next) current.next.prev = current.prev;
	else this.tail = current.prev;
    }

    toArray() {
	const result = [];
	let current = this.head;
	while (current) {
	    result.push(current);
	    current = current.next;
	}
	return result;
    }
    insertAtHead(value) {
	const node = new DoubleLinkedNode(value);

	if (!this.head) {
	    this.head = this.tail = node;
	    return;
	}

	node.next = this.head;
	this.head.prev = node;
	this.head = node;
    }

}

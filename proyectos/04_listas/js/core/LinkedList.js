import Node from './Node.js';

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  insertStart(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  insertEnd(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  insertAt(index, value) {
    if (index < 0) return;
    if (index === 0) {
      this.insertStart(value);
      return;
    }
    const node = new Node(value);
    let curr = this.head;
    let i = 0;
    while (curr && i < index - 1) {
      curr = curr.next;
      i++;
    }
    if (curr) {
      node.next = curr.next;
      curr.next = node;
    }
  }

  remove(value) {
    if (!this.head) return;
    if (this.head.value == value) {
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.value != value) {
      curr = curr.next;
    }
    if (curr.next) curr.next = curr.next.next;
  }

  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

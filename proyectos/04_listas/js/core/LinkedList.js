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

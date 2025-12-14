import { DoublyLinkNode } from "./DoublyLinkNode";

class DoublyLinkedList {
    head: DoublyLinkNode | null;
    tail: DoublyLinkNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Append a new node at the start of this list
    appendFirst(key: string, value: number): DoublyLinkNode {
        let newNode = new DoublyLinkNode(key, value);

        if (this.head === null) {
            this.head = this.tail = newNode;
            return newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;

            this.head = newNode;

            return newNode;
        }
    }

    // Move node to the start of the list
    // Delete from existing position
    // Add to the front
    moveFirst(node: DoublyLinkNode): void {
        if (this.head === node) {
            return;
        }

        this.deleteNode(node);
        node.prev = null;
        node.next = this.head;

        if (this.head !== null) {
            this.head.prev = node;
        }
        else {
            this.tail = node;
        }

        this.head = node;
    }

    // Delete any arbitrary node from the doubly linked list
    // Head, Tail, One, or in between
    deleteNode(node: DoublyLinkNode): void {
        if (this.head == node && this.tail == node) {
            this.head = this.tail = null;
        }
        else if (this.head === node) {
            let secondNode = this.head.next;
            secondNode!.prev = null;
            this.head = secondNode;

        }
        else if (this.tail === node) {
            let secondLastNode = this.tail.prev;
            secondLastNode!.next = null;
            this.tail = secondLastNode;
        }
        else {
            let prevNode = node.prev;
            let nextNode = node.next;

            prevNode!.next = nextNode;
            nextNode!.prev = prevNode;
        }

        // Remove all references of this node
        node.prev = null;
        node.next = null;
    }

    // Delete and return the value of the last node in the list
    deleteLast(): DoublyLinkNode | null {
        if (this.head === null) {
            return null;
        }
        else {
            if (this.head === this.tail) {
                let headNode = this.head;
                this.head = this.tail = null;

                return headNode;
            }
            else {
                let secondLastNode = this.tail!.prev;
                let tailNode = this.tail!;
    
                secondLastNode!.next = null;
                this.tail = secondLastNode;
    
                return tailNode;
            }
        }
    }
}

export { DoublyLinkedList };
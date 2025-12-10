import { DoubleLinkNode } from '../../recursive_data_structures/DoubleLinkNode';

// Implements a Doubly Linked List with a Circular architecture
class DoublyCircularLinkedList {
    head: DoubleLinkNode | null;
    tail: DoubleLinkNode | null;

    // Initialize the Doubly Circular Linked List
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Append node at the front of the list
    appendFirst(item: number): void {
        if (this.head === null) {
            this.head = this.tail = new DoubleLinkNode(item);
            this.head.next = this.head.prev = this.head;
        }
        else {
            // Create the new node and ensure its next reference points to the head
            let newNode = new DoubleLinkNode(item);
            newNode.next = this.head;

            // Ensure the old head previous reference points to the new head
            // Assign the old head to be the new head
            this.head.prev = newNode;
            this.head = newNode;

            // Set the previous reference of the new head to be the tail
            // Set the tail reference to point to the new head
            this.head.prev = this.tail;
            this.tail!.next = this.head;
        }
    }

    // Append node at the end of the list
    appendLast(item: number): void {
        if (this.head === null) {
            this.head = this.tail = new DoubleLinkNode(item);
            this.head.next = this.head.prev = this.head;
        }
        else {
            // Create the new node at the end of the list
            // Assign the old tail next reference to point to this new node
            // Assign the old tail to become the new tail
            // Set the tail next reference to head
            // Set the head previous reference to tail
            let newNode = new DoubleLinkNode(item);
            this.tail!.next = newNode;
            newNode.prev = this.tail;

            this.tail = newNode;

            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
    }

    // Remove node from the start of the list
    removeFirst(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            // If only one node exists, remove it
            if (this.head === this.tail) {
                let item = this.head.value;
                this.head = this.tail = null;

                return item;
            }
            else {
                // Capture the value at the front of the list
                // Capture the second node in the list
                let item = this.head.value;
                let nextNode = this.head.next;

                // Set its previous reference to be the tail of the lits
                // Set the old head to become the new head
                // Set the next reference of the tail node to point to the head
                nextNode.prev = this.tail;
                this.head = nextNode;
                this.tail!.next = this.head;

                return item;
            }
        }
    }

    // Remove node from the end of the list
    removeLast(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            if (this.head === this.tail) {
                let item = this.head.value;
                this.head = this.tail = null;

                return item;
            }
            else {
                // Capture the item at the end of the list
                // Capture the second last item in the list
                // Set the next reference of the second last item to point to the head
                // Set the old tail to this new tail
                // Set the head previous reference to point to this new tail
                let item = this.tail!.value;
                let secondLastNode = this.tail!.prev!;

                secondLastNode.next = this.head;
                this.tail = secondLastNode;
                this.head!.prev = this.tail;

                return item;
            }
        }
    }
}

export { DoublyCircularLinkedList };
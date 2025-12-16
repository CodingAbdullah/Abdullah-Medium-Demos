import DoublyCacheLinkNode from "./DoublyCacheLinkNode";

// Doubly linked list allows for transversals forwards/backwards
// Implements four functions: appendFirst, deleteNode, moveFirst, deleteLast
class DoublyCacheLinkedList {
    head: DoublyCacheLinkNode | null;
    tail: DoublyCacheLinkNode | null;

    // Initialize the Doubly Linked List
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Append the node at the start of the cache list
    // Return the newly created node to be stored in the hash map
    // Insertions: put(key, value)
    appendFirst(key: string, value: number): DoublyCacheLinkNode {
        if (this.head === null) {
            let newNode = new DoublyCacheLinkNode(key, value);

            this.head = this.tail = newNode;
            return newNode;
        }
        else {
            let newNode = new DoublyCacheLinkNode(key, value);
            newNode.next = this.head;

            this.head.prev = newNode;
            this.head = newNode;

            return newNode;
        }
    }

    // Move the node from the list to the beginning of the list, removing it from current location
    // Retrieval/Updates: get(key), put(key, value)
    moveFirst(node: DoublyCacheLinkNode): void {
        if (this.head === node) {
            return;
        }
        else {
            this.deleteNode(node);

            if (this.head !== null) {
                this.head.prev = node;
            }
            else {
                this.tail = node;
            }
        }

        this.head = node;
    }

    // Four cases: One, Head, Tail, Middle
    // Lone node can easily be removed by setting head/tail to null
    // Head can point to the next element in the sequence, setting old head to null
    // Tail can point to the second last element in the sequence, setting old tail to null
    // In between, we capture the node before and after the current and make them point to each other
    // Ensure the pointers of the current node are set to null
    // Delete: delete(key)
    deleteNode(node: DoublyCacheLinkNode): void {
        if (this.head === node && node === this.tail) {
            this.head = this.tail = null; // Lone node removed
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

        // Remove all of its pointers
        node.prev = null;
        node.next = null;
    }

    // For evictions, remove the last node in the cache list and return it
    // If no nodes exist, return null
    // Capture the tail node
    // Capture the second last node
    // Remove reference to the last node
    // Set old tail to the new tail
    // Return old node
    deleteLast(): DoublyCacheLinkNode | null {
        if (this.head === null) {
            return null;
        }
        else {
            // If only one node exists, capture it and remove the head/tail
            if (this.head === this.tail) {
                let loneNode = this.head;

                this.head = this.tail = null;
                return loneNode;
            }
            else {
                let tailNode = this.tail;
                let secondLastNode = this.tail!.prev;

                secondLastNode!.next = null;
                this.tail = secondLastNode;

                return tailNode;
            }
        } 
    }

    // For evictions, remove the first node in the cache list and return it
    // Capture the first node
    // Set the old head to point to the next node in the list, make it the new head
    // Return the first node
    deleteFirst(): DoublyCacheLinkNode | null {
        if (this.head === null) {
            return null;
        }
        else {
            if (this.head === this.tail) {
                let firstNode = this.head;
                this.head = this.tail = null;

                return firstNode;
            }
            else {
                let firstNode = this.head;
                let secondNode = this.head.next;

                secondNode!.prev = null;
                this.head = secondNode;

                firstNode.prev = null;
                firstNode.next = null;

                return firstNode;
            }
        }
    }
}

export default DoublyCacheLinkedList;
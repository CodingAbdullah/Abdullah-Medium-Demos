import { DoubleLinkNode } from "../../recursive_data_structures/DoubleLinkNode";  

// Doubly Linked list data structure uses two pointers for forwards and backwards traversals
// Head and Tail nodes keep track of the beginning and end of the Linked List
class DoublyLinkedList {
    head: DoubleLinkNode | null;
    tail: DoubleLinkNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Append the item at the front of the doubly linked list
    appendFirst(item: number): void {
        if (this.head === null) {
            this.head = this.tail = new DoubleLinkNode(item);
        }
        else {
            let newNode = new DoubleLinkNode(item);
            
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // Append node to the end of the Doubly Linked List
    appendLast(item: number): void {
        if (this.head === null) {
            this.head = this.tail = new DoubleLinkNode(item);
        }
        else {
            // Initialize a new node
            let newNode = new DoubleLinkNode(item);

            // Re-configure the tail node of the Doubly Linked List
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }


    removeFirst(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            // If one node exists, remove it
            if (this.head.next === null) {
                let item = this.head.value;
                this.head = this.tail = null;

                return item;
            }
            else {
                // Capture the value of the head node
                // Point to the second node in the list
                // Remove the previous reference
                // Set the old head to the new head
                let item = this.head.value;
                let nextNode = this.head.next;

                nextNode.prev = null;
                this.head = nextNode;

                return item; 
            }
        }
    }

    removeLast(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            // If one node exists, remove it
            if (this.head.next === null) {
                let item = this.head.value;
                this.head = this.tail = null;
                
                return item;
            }
            else {
                // Capture the item from the last node
                // Capture the second last node at the end
                let item = this.tail!.value;
                let secondLastNode = this.tail!.prev;

                // Set the pointer of the second last node to null
                // Set the tail to be the new tail which is the second last node of the list
                secondLastNode!.next = null;
                this.tail = secondLastNode;

                return item;
            }

        }
    }
}

export { DoublyLinkedList };
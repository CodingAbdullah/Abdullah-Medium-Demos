import { LinkNode } from "../../recursive_data_structures/LinkNode";

class CircularLinkedList {
    head: LinkNode | null;

    constructor() {
        this.head = null;
    }

    appendFirst(item: number): void {
        // Initialize the head node
        // Point its next reference to itself
        if (this.head === null) {
            this.head = new LinkNode(item);
            this.head.next = this.head;
        }
        else {
            let tail = this.head;

            // Traverse to the next of the list, ensuring that we can safely change the reference
            while (tail.next !== this.head) {
                tail = tail.next;
            }

            // Create the new node
            let newNode = new LinkNode(item);
            
            // Set its reference to the old head
            // Point the old head to the new head of the list
            // Point the last node reference to this new head of the list
            newNode.next = this.head;
            this.head = newNode;
            tail.next = this.head;
        }
    }

    appendLast(item: number): void {
        if (this.head === null) {
            this.head = new LinkNode(item);
            this.head.next = this.head;
        }
        else {
            let tail = this.head;

            // Traverse to the end of the list
            // Create the new node
            // Point the last node reference to this new node
            // Point the next node reference of the new node to the head of the list
            while (tail!.next !== this.head) {
                tail = tail.next;
            }

            let newNode = new LinkNode(item);
            tail.next = newNode;
            newNode.next = this.head;
        }
    }

    removeFirst(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            if (this.head.next === this.head) {
                let item = this.head.item;
                this.head = null;

                return item;
            }
            else {
                let item = this.head.item; // Capture the value of the head of the list
                let tail = this.head;
    
                // Traverse to the end of the linked list
                while (tail.next !== this.head) {
                    tail = tail.next;
                }
    
                this.head = this.head.next; // Remove the reference to the head, point to the next node in the list
                tail.next = this.head; // Reference the tail back to the new head of the list
    
                return item;
            }
        }
    }

    removeLast(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            // Check to see if one node exists, if so, remove it
            if (this.head.next === this.head) {
                let item = this.head.item;
                this.head = null;

                return item;
            }
            else {
                // Use two nodes to effectively delete the last node in the list
                // Capture the value of the last node in the list
                // Change the reference of the second last node in the list to the head of the list
                let prevNode = this.head;
                let currNode = this.head.next;

                while (currNode!.next !== this.head) {
                    prevNode = currNode!;
                    currNode =  currNode!.next;
                }

                let item = currNode!.item;
                prevNode.next = this.head;

                return item;
            }
        }
    }
}

export { CircularLinkedList };
import { LinkNode } from '../../recursive_data_structures/LinkNode';

class LinkedList {
    head: LinkNode | null;

    constructor(){
        this.head = null;
    }

    // Append the node to the front of the linked list
    appendFirst(item: number): void {
        if (this.head === null) {
            this.head = new LinkNode(item);
        }
        else {
            // Create the new node and set its reference to the head of the list
            const newNode = new LinkNode(item);

            newNode.next = this.head;
            this.head = newNode; // Re-assign the head to become the new head node of the list
        }
    }

    // Append the node at the end of the linked list
    appendLast(item: number): void {
        if (this.head === null) {
            this.head = new LinkNode(item);
        }
        else {
            let traverseNode = this.head;

            // Start at the head of the list and traverse all the way to the end
            while (traverseNode.next !== null) {
                traverseNode = traverseNode.next;
            }

            let newNode = new LinkNode(item); // Create the new node
            traverseNode.next = newNode; // Set the reference of the last node in the list to this new node
        }
    }

    removeFirst(): number | null {
        // No head exists, return null, otherwise point the head to be the next item in the list
        // Capture and return the value before changing reference
        if (this.head === null) {
            return null;
        }
        else {
            let item = this.head.item;
            this.head = this.head.next;

            return item;
        }
    }

    removeLast(): number | null {
        if (this.head === null) {
            return null;
        }
        else {
            // Use two nodes to safely remove the last in the list
            let prevNode = this.head;
            let currNode = this.head.next;

            // If only one node exists, remove the first node, return its value
            if (currNode === null) {
                let item = prevNode.item;
                this.head = null;
                
                return item;
            }
            else {
                while (currNode.next !== null) {
                    prevNode = currNode;
                    currNode = currNode!.next;
                }
                
                let item = currNode.item; // Capture the value of the last node in the list
                prevNode.next = null; // Remove the last node in the list
                
                return item;
            }
        }
    }

    // Return the length of the linkedlist
    length(): number {
        let length = 0;

        // If the head of the list does not exist, return 0
        if (this.head === null) {
            return 0;
        }
        else {
            // Traverse through the nodes and start with the length of 1
            let traverseNode = this.head;
            length += 1;

            // Traverse through the linked list
            while (traverseNode.next !== null) {
                traverseNode = traverseNode.next;
                length += 1;
            }

            return length;
        }
    }

    // Check to see if the linked list is empty
    isEmpty(): boolean {
        return this.head === null;
    }
}

export { LinkedList };
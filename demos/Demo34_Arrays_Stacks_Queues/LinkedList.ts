// Recursive data which segments each Node with value
// Next node is given a reference to the previous node connecting it
class Node<T> {
    next: Node<T> | null = null;
    value: T

    // Set data of current node and set next reference to null
    constructor(data: T){
        this.value = data;
        this.next = null;
    }
}

export default class LinkedList<T> {
    headNode: Node<T> | null

    constructor() {
        this.headNode = null
    }

    insert(data: T): void {
        // If list is empty, initialize it with value
        if (this.headNode === null) {
            this.headNode = new Node(data);
        }
        else {
            // If head node exists, start at there and work your way down
            let currentNode = this.headNode;

            // Keep iterating until you reach the tail (or when next reference is null)
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }

            currentNode.next = new Node(data); // Append node to end of list
        }
    }

    delete(data: T): T | null {
        let currentNode = this.headNode;

        if (currentNode === null){
            return null;
        }
        else if (currentNode.value === data) {
            this.headNode = currentNode.next; // Delete the first node from list
            return data;
        }
        else {
            let precedingNode = currentNode;
            currentNode = currentNode.next;

            // Traverse through the linked list to find value
            while (currentNode) {
                if (currentNode?.value === data) {
                    let nodeValue = currentNode.value;
                    precedingNode.next = currentNode.next;
                    return nodeValue;
                }
                precedingNode = currentNode;
                currentNode = currentNode.next; // Node is deleted
            }
            return null; // If after traversing through the entire list and no value is found, return null
        }
    }

    // Recursively iterate through the list to find values and append for display
    print(): void {
        let listDisplay = '';
        let currentNode = this.headNode;

        // Appending list values while iterating through Linked List
        while (currentNode) {
            listDisplay += '{ ';
            listDisplay += currentNode.value;
            listDisplay += ' }';
            currentNode = currentNode.next;
        }

        // Finally print Linked List to console
        console.log(listDisplay);
    }
}

let ll = new LinkedList();
ll.insert(5);
ll.print();
ll.insert(21);
ll.print();
ll.insert(34);
ll.print();
ll.delete(6);
ll.print();
ll.delete(21);
ll.print();
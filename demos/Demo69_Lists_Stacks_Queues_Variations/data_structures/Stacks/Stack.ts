import { LinkedList } from '../LinkedLists/LinkedList';

// Stack follows the LIFO principle
// Push, Pop are two of its primary operations
// Use the Linked List data structure to carefully craft the Stack data structure
class Stack {
    stackList: LinkedList

    // Initialize an empty stack and implement the LIFO principle using it
    constructor() {
        this.stackList = new LinkedList();
    }

    // Check for the element at the top of the stack and return the value
    peek(): number | null {
        if (this.stackList.length() === 0) {
            return null;
        }
        else {
            // Check for the head of the stack
            // Return its value
            let headItem = this.stackList.head
            return headItem!.item;
        }
    }

    // Append the item to the end of the list
    push(item: number): void {
        this.stackList.appendFirst(item);
    }

    // Remove and return the last element in the list
    pop(): number | null {
        return this.stackList.removeFirst();
    }

    // Length of the stack
    length(): number {
        return this.stackList.length();
    }

    // Check to see if the stack is empty
    isEmpty(): boolean {
        return this.stackList.isEmpty();
    }
}

export { Stack };
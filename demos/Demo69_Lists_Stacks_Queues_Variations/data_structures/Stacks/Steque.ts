import { LinkedList } from '../LinkedLists/LinkedList';

// Steque implementation is a hybrid of Stack-Queue, implements LIFO principle at the front
// Supports Queue insertion at the back only (Enqueue)
// Implemented using a Singular Linked List
class Steque {
    stequeList: LinkedList

    constructor() {
        this.stequeList = new LinkedList();
    }

    // Implement LIFO with the push and pop methods at the front of the Steque
    // Add the item at the front
    push(item: number): void {
        this.stequeList.appendFirst(item);
    }

    // Remove the item at the front
    pop(): number | null {
        return this.stequeList.removeFirst();
    }

    // Enqueue at the end of the Steque
    enqueue(item: number): void {
        this.stequeList.appendLast(item);
    }

    // Peek at the front of the Steque
    peekFront(): number | null {
        if (this.stequeList.length() === 0) {
            return null;
        }
        else {
            let frontItem = this.stequeList.head;
            return frontItem!.item;
        }
    }

    // Peek at the back of the Steque
    peekBack(): number | null {
        if (this.stequeList.length() === 0) {
            return null;
        }
        else {
            let traverseNode = this.stequeList.head;

            // Traverse to the end of the Steque
            while (traverseNode!.next !== null) {
                traverseNode = traverseNode!.next;
            }

            // Return the last item in the Steque
            let backItem = traverseNode;
            return backItem!.item;
        }
    }
    
    // Return the length of the Steque
    length(): number {
        return this.stequeList.length();
    }
}

export { Steque };
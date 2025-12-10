import { LinkedList } from './LinkedList';

// Double-Ended Queue that implements a Queue at both ends of a list
// We can append at the front and the back, remove at the front and the back
// FIFO at the front and FIFO at the back
class Deque {
    dequeList: LinkedList;

    // Initialize the double-ended queue
    constructor() {
        this.dequeList = new LinkedList();
    }

    // Peek at the front of the deque
    peekFront(): number | null {
        if (this.dequeList.length() === 0) {
            return null;
        }
        else {
            // Check the head of the list
            // Return the value of the item
            let headNode = this.dequeList.head;
            return headNode!.item;
        }
    }

    // Peek at the end of the deque
    peekLast(): number | null {
        if (this.dequeList.length() === 0) {
            return null;
        }
        else {
            let headItem = this.dequeList.head;

            // Traverse to the end of the Deque
            while (headItem!.next !== null) {
                headItem = headItem!.next;
            }

            return headItem!.item
        }
    }

    // Append item at the front of the deque
    frontEnqueue(item: number): void {
        this.dequeList.appendFirst(item); 
    }

    // Append item at the back of the deque
    backEnqueue(item: number): void {
        this.dequeList.appendLast(item);
    }

    // Remove item at the front of the deque
    frontDequeue(): number | null {
        return this.dequeList.removeFirst();
    }

    // Remove item from the back of the deque
    backDequeue(): number | null {
        return this.dequeList.removeLast();
    }

    // Return the length of the double-ended Queue
    length(): number {
        return this.dequeList.length();
    }   
}

export { Deque };
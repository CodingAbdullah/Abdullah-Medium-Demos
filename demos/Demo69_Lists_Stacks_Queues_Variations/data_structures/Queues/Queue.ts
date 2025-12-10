import { LinkedList } from "../LinkedLists/LinkedList";

// Queue follows the FIFO implementation
// Peek, Enqueue, and Dequeue are three of its primary operations
class Queue {
    queueList: LinkedList;

    constructor() {
        this.queueList = new LinkedList();
    }

    // Check the first item in the queue and return its value
    peek(): number | null {
        if (this.queueList.length() === 0) {
            return null;
        }
        else {
            // Return the item from the queue
            let queueHead = this.queueList.head
            return queueHead!.item;
        }
    }

    // Append the item at the back of the queue
    enqueue(item: number): void {
        this.queueList.appendLast(item);
    }

    // Remove the first item in the queue
    dequeue(): number | null {
        return this.queueList.removeFirst();
    }

    // Return the length of the queue
    length(): number {
        return this.queueList.length();
    }
}

export { Queue };
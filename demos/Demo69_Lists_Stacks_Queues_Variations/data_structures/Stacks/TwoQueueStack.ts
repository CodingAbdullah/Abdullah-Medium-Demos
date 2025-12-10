import { Queue } from '../Queues/Queue';

// Implement the FIFO principle using two Queues
// Support the operations of a Stack using two Queues
class TwoQueueStack {
    queueOne: Queue | null;
    queueTwo: Queue | null;

    constructor() {
        this.queueOne = new Queue();
        this.queueTwo = new Queue();
    }

    // Push item to the front of queue one
    push(item: number): void {
        this.queueOne!.enqueue(item);
    }

    // Remove the latest item from the queue using the second queue
    // Pop operation is expensive
    pop(): number | null {
        if (this.queueOne!.length() === 0) {
            return null;
        }
        else {
            // Remove all items except the last one
            // Dequeue the element from the first queue
            // Enqueue the element from the first queue into the second queue
            // Maintains the FIFO principle of the two Queues while implementing a LIFO Stack
            while (this.queueOne!.length() !== 1) {
                let element = this.queueOne!.dequeue();
                this.queueTwo!.enqueue(element!);
            }

            // Remove and capture the last element
            let lastElement = this.queueOne!.dequeue();

            // Now set the empty out all the items from the second queue back into the first queue to maintain FIFO
            while (this.queueTwo!.length() !== 0) {
                let element = this.queueTwo!.dequeue();
                this.queueOne!.enqueue(element!);
            }

            return lastElement;
        }
    }
    
    // Check the latest item in the Stack
    peek(): number | null {
        if (this.queueOne!.length() === 0) {
            return null;
        }
        else {
            // Enqueue all the elements from queue one, onto queue two
            while (this.queueOne!.length() !== 1) {
                let element = this.queueOne!.dequeue();
                this.queueTwo!.enqueue(element!);
            }

            // Capture the last element in the queue (or in this case, the top of the stack)
            let lastElement = this.queueOne!.dequeue();
            this.queueTwo!.enqueue(lastElement!); // We are not removing it so add it to queue two

            // Re-populate queue one and remove all items from queue two
            while (this.queueTwo!.length() !== 0) {
                let element = this.queueTwo!.dequeue();
                this.queueOne!.enqueue(element!);
            }

            return lastElement;
        }
    }

    // Return the length of queue one
    length(): number {
        return this.queueOne!.length();
    }

    // Check to see if queue one is empty
    isEmpty(): boolean {
        return this.queueOne!.length() === 0;
    }
}

export { TwoQueueStack };
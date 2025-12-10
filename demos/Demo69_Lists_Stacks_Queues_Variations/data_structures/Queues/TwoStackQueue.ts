import { Stack } from "../Stacks/Stack";

// Implementing a Queue using two Stacks
// FIFO principle implemented using two Stacks (LIFO)
class TwoStackQueue {
    stackOne: Stack | null;
    stackTwo: Stack | null;

    constructor() {
        this.stackOne = new Stack();
        this.stackTwo = new Stack();
    }

    // Populate stack one with the element
    // Enqueue operation will be the least costly
    enqueue(item: number): void {
        this.stackOne!.push(item);
    }

    // Dequeue operation will be expensive
    // Remove all the items from stack one, populate all the items into stack two
    // Popping the last element and capturing it in stack two, re-populating and emptying stack two back to stack one
    dequeue(): number | null {
        if (this.stackOne!.length() === 0) {
            return null;
        }
        else {
            // Remove all elements
            while (this.stackOne!.length() !== 0) {
                let element = this.stackOne!.pop();
                this.stackTwo?.push(element!);
            }

            // Capture the last element
            let lastElement = this.stackTwo!.pop();

            // Re-populate stack one, empty stack two
            while (this.stackTwo!.length() !== 0) {
                let element = this.stackTwo!.pop();
                this.stackOne!.push(element!);
            }

            return lastElement;
        }
    }

    // Locating the latest element in the Queue and returning it
    peek(): number | null {
        if (this.stackOne!.length() === 0) {
            return null;
        }
        else {
            // Remove all items from stack one and populate stack two
            while (this.stackOne!.length() !== 1) {
                let element = this.stackOne!.pop();
                this.stackTwo!.push(element!);
            }

            // Remove and capture the last element in the stack
            // Push the value onto the second stack
            // Re-populate stack one and return the last element
            let lastElement = this.stackOne!.pop();
            this.stackTwo!.push(lastElement!);

            while (this.stackTwo!.length() !== 0) {
                let element = this.stackTwo!.pop();
                this.stackOne!.push(element!);
            }

            return lastElement;
        }
    }

    // Return the length of stack one
    length(): number {
        return this.stackOne!.length();
    }

    // Check to see if stack one is empty
    isEmpty(): boolean {
        return this.stackOne!.length() === 0;
    }
}

export { TwoStackQueue };
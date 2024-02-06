// FIFO implementation of a Queue
export default class Queue<T> {
    orderArray: T[];

    // Initialize to empty array
    constructor(){
        this.orderArray = [];
    }

    // Push value to end of array
    enqueue(data: T): void {
        this.orderArray.push(data);
    }

    // Remove the first element and return the value
    dequeue(): T {
        let value = this.orderArray.splice(0, 1)[0];
        return value;
    }

    // Print out Queue
    print(): void {
        console.log(this.orderArray);
    }
}

var queue = new Queue();
queue.enqueue(5);
queue.print();
queue.dequeue();
queue.print();
queue.enqueue(6);
queue.print();
queue.enqueue(12);
queue.print();
queue.enqueue(11);
queue.print();
queue.dequeue();
queue.print();
queue.enqueue(15);
queue.print();
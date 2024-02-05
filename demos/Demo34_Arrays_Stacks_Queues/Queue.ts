// FIFO implementation of a Queue
class Queue {
    orderArray: number[];

    // Initialize to empty array
    constructor(){
        this.orderArray = [];
    }

    // Push value to end of array
    enqueue(data: number): void {
        this.orderArray.push(data);
    }

    // Remove the first element and return the value
    dequeue(): number {
        let value = this.orderArray.splice(0, 1)[0] || -1;
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
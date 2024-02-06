// LIFO implementation of a Stack
export default class Stack<T> {
    orderArray: T[];

    // Initializing an empty array to work with
    constructor(){
        this.orderArray = [];
    }

    // Push numbers to the end of the array
    push(data: T): void {
        this.orderArray.push(data);
    }

    // Return the latest value to be inserted into array
    pop(): T {
        let value = this.orderArray.pop()!;
        return value;
    }

    // Print current Stack values
    print(): void {
        console.log(this.orderArray);
    }
}

var stk = new Stack();
stk.push(10);
stk.print();
stk.push(9);
stk.print();
stk.push(7);
stk.print();
stk.pop();
stk.print();
stk.pop();
stk.print();
stk.push(18);
stk.print();
stk.push(21);
stk.print();
stk.push(25);
stk.print();
stk.pop();
stk.print();
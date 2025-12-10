// Recursive data structure
class DoubleLinkNode {
    head: DoubleLinkNode | null;
    tail: DoubleLinkNode | null;
    value: number;

    // Initializing the double link node
    constructor(value: number) {
        this.value = value;
        this.head = null;
        this.tail = null;
    }
}

export { DoubleLinkNode };
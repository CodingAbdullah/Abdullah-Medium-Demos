class DoublyLinkNode {
    prev: DoublyLinkNode | null;
    next: DoublyLinkNode | null;
    key: string
    value: number;

    // Construct a Doubly Link Node
    constructor(key: string, item: number) {
        this.key = key;
        this.value = item;
        this.prev = null;
        this.next = null;
    }
}

export { DoublyLinkNode };
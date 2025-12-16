// Recursive doubly linked node recursive data structure
class DoublyCacheLinkNode {
    prev: DoublyCacheLinkNode | null;
    next: DoublyCacheLinkNode | null;
    key: string;
    value: number;

    constructor(key: string, value: number) {
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
    }
}

export default DoublyCacheLinkNode;
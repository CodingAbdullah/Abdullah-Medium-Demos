// Recursive data structure
class LinkNode {
    next: LinkNode | null;
    item: number;

    // Initalizing the link node with its value
    constructor(value: number){
        this.item = value;
        this.next = null;
    }
}

export { LinkNode };
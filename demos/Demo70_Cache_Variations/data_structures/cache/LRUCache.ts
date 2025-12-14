import { DoublyLinkedList } from "../linked_lists/DoublyLinkedList";
import { DoublyLinkNode } from "../linked_lists/DoublyLinkNode";

/* LRU Cache Data Structure
- get(key)[get], put(key, value)[update/insert], delete(key)[delete]
- DoublyLinkNode ---> key, value, prev, next
- DoublyLinkedList ---> deleteNode, moveFirst, insertFirst, deleteLast
*/
class LRUCache {
    cacheList: DoublyLinkedList | null;
    nodeMap: Map<string, DoublyLinkNode>;
    size: number;

    // Initialize LRU Cache properties
    constructor(sizeValue: number) {
        this.size = sizeValue < 0 ? 0 : sizeValue;
        this.nodeMap = new Map<string, DoublyLinkNode>();
        this.cacheList = new DoublyLinkedList();
    }

    // Insert a new key --> put(key, value)
    // Updating a key to a new value --> put(key, value)
    // First check hash Map, if the key exists, we are simply updating the value of the existing key
    // If it is a unique key, we are to insert a new key, check if we are at limit, if so evict/insert, and if not, insert
    // Remove node, insert at the beginning
    // Add the new key, node pair to the hash map
    // Evict a node and return its value
    // Insert the node at the front
    insertNode(key: string, value: number): void {
        if (this.nodeMap.has(key)){
            let node = this.nodeMap.get(key);

            this.cacheList!.moveFirst(node!);
            node!.value = value;
        }
        else if (this.nodeMap.size === this.size) {
            let node = this.cacheList!.deleteLast();
            this.nodeMap.delete(node!.key);

            let newNode = this.cacheList!.appendFirst(key, value);
            this.nodeMap.set(key, newNode);
        }
        else {
            let newNode = this.cacheList!.appendFirst(key, value);
            this.nodeMap.set(key, newNode!);
        }
    }

    // Delete a key ---> delete(key)
    // Check to see if key exists first
    // Delete its reference
    removeNode(key: string): void {
        if (this.nodeMap.has(key)) {
            this.cacheList!.deleteNode(this.nodeMap.get(key)!);
            this.nodeMap.delete(key); 
        } 
    }

    // Move node to the front of the list ---> get(key)
    // Retrieve the node from the hash map
    retrieveNode(key: string): number | null {
        if (this.nodeMap.has(key)) {
            let node = this.nodeMap.get(key)!;
            let value = this.nodeMap.get(key)!.value;

            this.cacheList!.moveFirst(node);
            
            return value;
        }
        else {
            return null;
        }
    }
};

export { LRUCache };
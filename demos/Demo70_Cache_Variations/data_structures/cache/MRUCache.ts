import DoublyCacheLinkNode from './linked_lists/DoublyCacheLinkNode';
import DoublyCacheLinkedList  from './linked_lists/DoublyCacheLinkedList';

// Implements an LRU cache, but backwards
// The most recently accessed item is the one evicted to make room for new entries
// Insert/Update ---> put(key, value)
// Get ---> get(key)
// Delete ---> delete(key)
class MRUCache {
    size: number;
    cacheList: DoublyCacheLinkedList | null;
    nodeMap: Map<string, DoublyCacheLinkNode>;

    // Initialize the MRU Cache
    constructor(size: number) {
        this.size = size < 0 ? 0 : size;
        this.cacheList = new DoublyCacheLinkedList();
        this.nodeMap = new Map<string, DoublyCacheLinkNode>();
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
            let node = this.cacheList!.deleteFirst();
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
}



export { MRUCache };
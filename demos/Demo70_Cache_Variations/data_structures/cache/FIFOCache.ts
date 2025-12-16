// FIFO cache implements a cache using queue properties
class FIFOCache {
    queueCache: string[];
    keyMap: Map<string, number>;
    size: number;

    constructor(size: number) {
        this.queueCache = [];
        this.keyMap = new Map<string, number>();
        this.size = size < 0 ? 0 : size;
    }

    // Follow the FIFO principle for insertions and deletions of nodes
    // If no key exists, a new one is being inserted, check eviction policy
    // If at limit, evict the oldest key and delete from hash map
    insertKey(key: string, value: number) {
        if (this.keyMap.has(key)) {
            this.keyMap.set(key, value); // If key exists, just simply update key value
        }
        else {
            if (this.keyMap.size === this.size) {
                let removeKey = this.evictKey();
                this.keyMap.delete(removeKey!);

                this.keyMap.set(key, value);
                this.queueCache.push(key);
            }
            else {
                // Very simple if no eviction is required
                this.keyMap.set(key, value);
                this.queueCache.push(key);
            }
        }
    }

    // Retrieve the value of the key
    retrieveKey(key: string): number | null {
        if (this.keyMap.has(key)) {
            return this.keyMap.get(key)!;
        }
        else {
            return null;
        }
    }

    // Simply filter out the key from the queue
    // Capture key value and return it
    // Delete from hash map
    deleteKey(key: string): number | undefined {
        if (this.keyMap.has(key)) {
            this.queueCache = this.queueCache.filter(i => i !== key); // Filter the key out of the queu
            let value = this.keyMap.get(key);

            this.keyMap.delete(key);
            return value;
        }
        else {
            return undefined;
        }
    }

    // Delete and return the oldest key
    evictKey(): string | undefined {
        let key = this.queueCache.shift();
        return key;
    }
}
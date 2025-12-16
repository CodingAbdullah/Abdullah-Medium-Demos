// Random replacement cache
// Randomly deletes items as its eviction policy
class RRCache {
    rrCacheArray: string[];
    rrKeyMap: Map<string, number>;
    size: number;

    constructor(size: number) {
        this.rrCacheArray = [];
        this.rrKeyMap = new Map<string, number>();
        this.size = size;
    }

    // Follow the FIFO principle for insertions and deletions of nodes
    // If no key exists, a new one is being inserted, check eviction policy
    // If at limit, evict the oldest key and delete from hash map
    insertKey(key: string, value: number) {
        if (this.rrKeyMap.has(key)) {
            this.rrKeyMap.set(key, value); // If key exists, just simply update key value
        }
        else {
            if (this.rrKeyMap.size === this.size) {
                let removeKey = this.evictKey();
                this.rrKeyMap.delete(removeKey!);

                this.rrKeyMap.set(key, value);
                this.rrCacheArray.push(key);
            }
            else {
                // Very simple if no eviction is required
                this.rrKeyMap.set(key, value);
                this.rrCacheArray.push(key);
            }
        }
    }

    // Retrieve the value of the key
    retrieveKey(key: string): number | null {
        if (this.rrKeyMap.has(key)) {
            return this.rrKeyMap.get(key)!;
        }
        else {
            return null;
        }
    }

    // Simply filter out the key from the queue
    // Capture key value and return it
    // Delete from hash map
    deleteKey(key: string): number | undefined {
        if (this.rrKeyMap.has(key)) {
            this.rrCacheArray = this.rrCacheArray.filter(i => i !== key); // Filter the key out of the queu
            let value = this.rrKeyMap.get(key);

            this.rrKeyMap.delete(key);
            return value;
        }
        else {
            return undefined;
        }
    }

    // Randomly selects which item to remove once the cache is full
    evictKey(): string | undefined {
        const randomIndex = Math.floor(Math.random() * this.size);
        let value = this.rrCacheArray[randomIndex];
        
        this.rrCacheArray = this.rrCacheArray.filter(i => i !== value);
        return value;
    }
}
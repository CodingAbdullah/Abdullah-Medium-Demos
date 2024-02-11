// Least Recently Used Cache (LRU)
// Most recent items are added to the back
// Least Recently Used items fall to the front
export default class LRU {
    private orderArray: any[];
    private capacity: number;
    private keyMap = new Map();
    
    // Initialize members and set capacity, must be at least 1
    constructor(c: number) {
        this.capacity = c <= 0 ? 1 : c;
        this.orderArray = [];
    }

    // Check to see if LRU Cache contains key
    // Check if key is defined, but is expired (key value set to undefined)
    has(key: any): boolean {
        if (this.keyMap.has(key) && (this.keyMap.get(key) === undefined)) {
            return false;
        }
        else if (this.keyMap.has(key)){
            return true;
        }
        else {
            return false;
        }
    }

    // Insert key and its value based on LRU Cache memory
    set(key: any, value: any): void {
        // Check if LRU Cache is at capacity
        if ((this.orderArray.length === this.capacity) && (!this.keyMap.has(key))){
            // Perform eviction only if unique key is to be added
            // Delete key from map
            let evictedValue = this.orderArray[0];
            this.keyMap.delete(evictedValue);
            this.orderArray.splice(0, 1);

            // Check to see if value already exists
            // Expire current key
            let keysArray = Array.from(this.keyMap.keys());
            for (let i = 0; i < keysArray.length; i++){
                if (this.keyMap.get(keysArray[i]) === value) {
                    this.keyMap.set(keysArray[i], undefined);
                }
            }
            
            // Finally, add the new key-value pair
            this.orderArray.push(key);
            this.keyMap.set(key, value);
        }
        else if ((this.orderArray.length === this.capacity) && (this.keyMap.has(key))) {
            let filteredArray = this.orderArray.filter(existingKey => existingKey !== key);
            this.orderArray = filteredArray;

            // Check to see if value already exists
            // Expire current key
            let keysArray = Array.from(this.keyMap.keys());
            for (let i = 0; i < keysArray.length; i++){
                if (this.keyMap.get(keysArray[i]) === value) {
                    this.keyMap.set(keysArray[i], undefined);
                }
            }
            
            // Finally, add the new key-value pair
            this.orderArray.push(key);
            this.keyMap.set(key, value);
        }
        else {
            // Perform the same steps above without eviction
            // Check to see if value already exists
            let keysArray = Array.from(this.keyMap.keys());
            for (let i = 0; i < keysArray.length; i++){
                // Expire current key
                if (this.keyMap.get(keysArray[i]) === value) {
                    this.keyMap.set(keysArray[i], undefined);
                }
            }
                // Finally, add the new key-value pair
                this.orderArray.push(key);
                this.keyMap.set(key, value);
            }
    }

    // Retrieve key based on LRU Cache memory
    // Move key to the front of the Cache
    get(key: any) : any {
        if (this.keyMap.has(key)){
            let filteredArray = this.orderArray.filter(existingKey => existingKey !== key);
            this.orderArray = filteredArray;
            this.orderArray.push(key);

            return this.keyMap.get(key);
        }
        else {
            return -1;
        }
    }

    // Delete key from LRU Cache, but return its value
    delete(key: any): any {
        if (this.keyMap.has(key)){
            let filteredArray = this.orderArray.filter(existingKey => existingKey !== key);
            this.orderArray = filteredArray;
            let value = this.keyMap.get(key);
            this.keyMap.delete(key); // Remove key from order array as well as map
            
            return value; 
        }
        else {
            return -1;
        }
    }

    // Print LRU Cache
    print(): void {
        let consoleString = ' [ ';
        for (let i = 0; i < this.orderArray.length; i++){
            consoleString += ' ' + this.orderArray[i] + " => " + this.keyMap.get(this.orderArray[i]) + ', ';
        }
        consoleString = consoleString.substring(0, consoleString.length - 2); 
        consoleString += ' ] ';
        console.log(consoleString);
    }

    // Return the LRU cache
    getLRUCache(): Array<any> {
        return this.orderArray;
    }

    // Return the Key Map
    getLRUCacheKeyMap(): Map<any, any> {
        return this.keyMap;
    }
}
import LRUCache from '../dataTypes/LRUCache';
import ItemType from '../dataTypes/ItemType';

export default function setLRUCache(data: Array<ItemType>): LRUCache {
    let lru = new LRUCache(5); // Setting the LRU Cache capacity to 5

    // Check to see the length of object and traverse through it and set LRU Cache
    for (var i = 0; i < data.length; i++) {
        lru.set(data[i].id, data[i].description);
    }

    return lru;
}
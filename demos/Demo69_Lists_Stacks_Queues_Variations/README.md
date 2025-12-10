<h2>Linked List Variants and their Time Complexities </h2>
In the table below, you find the performance metrics of all the Linked list variants we have covered in this article. 
<br />
<br />
The table details time complexities related to searching, inserting, and deleting nodes from a particular linked list:
<br />
<br />

| List Type                   | Search | Insert First | Insert Last | Delete First | Delete Last |
|----------------------------|--------|--------------|-------------|--------------|-------------|
| Singly Linked List (SLL)   | O(n)   | O(1)         | O(n)*       | O(1)         | O(n)        |
| Circular Singly Linked List (CLL) | O(n) | O(1) | O(n)* | O(1) | O(n) |
| Doubly Linked List (DLL)   | O(n)   | O(1)         | O(1)        | O(1)         | O(1)        |
| Doubly Circular Linked List (DCLL) | O(n) | O(1) | O(1) | O(1) | O(1) |

<b>*Note:</b>

Insert Last in SLL/CLL becomes **O(1)** only if you maintain a tail pointer. Without a tail pointer, you must traverse the list → **O(n)**.

It does not matter, what type of Linked List variant you use, the search operation will always result in **O(n)** time in the worst case.
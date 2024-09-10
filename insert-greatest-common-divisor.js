/*
2807. Insert Greatest Common Divisors in Linked List

Given the head of a linked list head, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

 

Example 1:


Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.
Example 2:


Input: head = [7]
Output: [7]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
 

Constraints:

The number of nodes in the list is in the range [1, 5000].
1 <= Node.val <= 1000
*/

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function insertGreatestCommonDivisors(head) {
    // Function to calculate GCD of two numbers
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    // Edge case: if the list is empty or has only one node
    if (!head || !head.next) {
        return head;
    }

    let current = head;

    // Traverse the list
    while (current && current.next) {
        // Calculate GCD of the current node and the next node
        const gcdValue = gcd(current.val, current.next.val);

        // Create a new node with the GCD value
        const gcdNode = new ListNode(gcdValue);

        // Insert this new node between the current node and the next node
        gcdNode.next = current.next;
        current.next = gcdNode;

        // Move to the next pair
        current = gcdNode.next;
    }

    return head;
}

function arrayToLinkedList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Example usage:
let head = arrayToLinkedList([18, 6, 10, 3]);
head = insertGreatestCommonDivisors(head);
console.log(linkedListToArray(head)); // Output: [18, 6, 6, 2, 10, 1, 3]

/*
GCD Calculation: A helper function gcd(a, b) recursively calculates the greatest common divisor using the Euclidean algorithm.
Linked List Traversal: The insertGreatestCommonDivisors function iterates through the linked list. For each pair of adjacent nodes, it computes the GCD and inserts a new node with that value between them.
Linked List Manipulation: A new node is created and inserted between two nodes, and the traversal continues from the next original node.
Edge Cases: If the list is empty or contains only one node, it is returned unchanged.
*/

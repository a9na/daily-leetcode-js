/*
725. Split Linked List in Parts

Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return an array of the k parts.

 

Example 1:


Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].
Example 2:


Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.
 

Constraints:

The number of nodes in the list is in the range [0, 1000].
0 <= Node.val <= 1000
1 <= k <= 50
*/

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var splitListToParts = function(head, k) {
    let result = new Array(k).fill(null);
    let current = head;
    let length = 0;
    
    // Calculate the total length of the linked list
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    let partSize = Math.floor(length / k);
    let extraNodes = length % k;
    
    current = head;
    for (let i = 0; i < k; i++) {
        if (!current) break;
        
        result[i] = current;
        let partLength = partSize + (extraNodes > 0 ? 1 : 0); // Add one extra node if needed
        extraNodes--;
        
        // Advance to the end of this part
        for (let j = 1; j < partLength; j++) {
            if (current) current = current.next;
        }
        
        // Break the current part from the rest of the list
        if (current) {
            let nextPart = current.next;
            current.next = null;
            current = nextPart;
        }
    }
    
    return result;
};

/*
List Length Calculation: First, the length of the linked list is computed.
Part Size Calculation: We compute how many nodes each part will have, with some parts having one extra node to distribute the remainder evenly.
Split the List: Traverse the list and divide it into k parts. If the length of the linked list is shorter than k, some parts will be null.
Edge Handling: When we reach the end of a part, we break it by setting the .next of the last node to null.
*/

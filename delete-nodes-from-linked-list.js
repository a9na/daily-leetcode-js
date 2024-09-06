/*
Delete Nodes From Linked List Present in Array

You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.

 

Example 1:

Input: nums = [1,2,3], head = [1,2,3,4,5]

Output: [4,5]

Explanation:



Remove the nodes with values 1, 2, and 3.

Example 2:

Input: nums = [1], head = [1,2,1,2,1,2]

Output: [2,2,2]

Explanation:



Remove the nodes with value 1.

Example 3:

Input: nums = [5], head = [1,2,3,4]

Output: [1,2,3,4]

Explanation:



No node has value 5.

 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
All elements in nums are unique.
The number of nodes in the given list is in the range [1, 105].
1 <= Node.val <= 105
The input is generated such that there is at least one node in the linked list that has a value not present in nums.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function(nums, head) {
{
    // Convert nums to a set for O(1) lookups
    const numSet = new Set(nums);

    // Create a dummy node that points to the head
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;

    // Traverse the linked list
    while (current.next !== null) {
        if (numSet.has(current.next.val)) {
            // Skip the node by changing the pointer
            current.next = current.next.next;
        } else {
            // Move to the next node
            current = current.next;
        }
    }

    // Return the new head (which may be different from the original head)
    return dummy.next;
}

};

/*
ListNode Class: Defines a node in the linked list with val (the value) and next (the pointer to the next node).
deleteNodes Function:
Converts the nums array into a Set to allow quick lookup.
A dummy node is used to handle edge cases (like when the head needs to be removed).
Iterates through the linked list, and for each node:
If the value of the node is found in the Set, it skips the node by adjusting the next pointer.
Otherwise, it moves on to the next node.
Finally, the new head of the list is returned, which is dummy.next.
*/

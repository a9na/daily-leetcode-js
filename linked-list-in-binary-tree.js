/*
Linked List in Binary Tree
Medium
Topics
Companies
Hint
Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

 

Example 1:



Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  
Example 2:



Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Example 3:

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
 

Constraints:

The number of nodes in the tree will be in the range [1, 2500].
The number of nodes in the list will be in the range [1, 100].
1 <= Node.val <= 100 for each node in the linked list and binary tree.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */

// Definition for singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// Definition for a binary tree node
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var isSubPath = function(head, root) {
    // Helper function to check if the linked list starting from 'head' is a subpath starting from 'node'
    const checkPath = (head, node) => {
        if (!head) return true;  // If linked list is fully traversed, return true
        if (!node) return false; // If tree is empty, return false
        if (head.val !== node.val) return false; // If values don't match, return false
        
        // Continue checking the left and right subtrees
        return checkPath(head.next, node.left) || checkPath(head.next, node.right);
    };

    // Main DFS function to traverse each node in the tree
    const dfs = (node) => {
        if (!node) return false; // If node is null, no match found
        if (checkPath(head, node)) return true; // If a subpath match is found, return true
        
        // Continue DFS in the left and right subtrees
        return dfs(node.left) || dfs(node.right);
    };
    
    return dfs(root);
};


/*
DFS on the Binary Tree: For each node in the binary tree, check if it can be the start of a valid subpath that matches the linked list. If it matches, try to match the subsequent nodes in both the binary tree and the linked list.

Helper Function: A helper function checkPath is used to check if the current node in the linked list can be found in a downward path from the current node in the binary tree.
*/

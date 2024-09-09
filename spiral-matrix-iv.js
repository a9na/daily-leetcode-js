/*
2326. Spiral Matrix IV

You are given two integers m and n, which represent the dimensions of a matrix.

You are also given the head of a linked list of integers.

Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.

Return the generated matrix.

 

Example 1:


Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the matrix.
Note that the remaining spaces in the matrix are filled with -1.
Example 2:


Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to right in the matrix.
The last space in the matrix is set to -1.
 

Constraints:

1 <= m, n <= 105
1 <= m * n <= 105
The number of nodes in the list is in the range [1, m * n].
0 <= Node.val <= 1000
*/

// Definition for singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function spiralMatrix(m, n, head) {
    // Initialize an empty matrix filled with -1
    const matrix = Array.from({ length: m }, () => Array(n).fill(-1));

    // Directions for spiral traversal: right -> down -> left -> up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let dirIdx = 0; // Start by moving to the right

    let row = 0, col = 0; // Start at the top-left corner
    let currNode = head;  // Initialize linked list head
    let steps = 0; // Steps filled

    while (currNode && steps < m * n) {
        // Set the current value in the matrix
        matrix[row][col] = currNode.val;
        currNode = currNode.next;
        steps++;

        // Move to the next cell based on current direction
        const nextRow = row + directions[dirIdx][0];
        const nextCol = col + directions[dirIdx][1];

        // Check if the move is within bounds and the target cell is not yet filled
        if (nextRow >= 0 && nextRow < m && nextCol >= 0 && nextCol < n && matrix[nextRow][nextCol] === -1) {
            row = nextRow;
            col = nextCol;
        } else {
            // Change direction (turn clockwise)
            dirIdx = (dirIdx + 1) % 4;
            row += directions[dirIdx][0];
            col += directions[dirIdx][1];
        }
    }

    return matrix;
}

// Example usage:

// Construct the linked list: [3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]
const head = new ListNode(3, new ListNode(0, new ListNode(2, new ListNode(6, new ListNode(8, 
            new ListNode(1, new ListNode(7, new ListNode(9, new ListNode(4, 
            new ListNode(2, new ListNode(5, new ListNode(5, new ListNode(0)))))))))))));

console.log(spiralMatrix(3, 5, head)); // Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]


/*
Matrix initialization: The matrix is created with dimensions m x n, with all values initially set to -1.
Spiral traversal: We define directions for moving (right, down, left, up). We start by moving right and follow the boundaries.
Linked list traversal: As we traverse the matrix in a spiral, we insert values from the linked list into the matrix.
Direction change: When hitting a boundary or filled position, the direction changes in a clockwise manner.
*/

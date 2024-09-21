/*
386. Lexicographical Numbers

Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

 

Example 1:

Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
Example 2:

Input: n = 2
Output: [1,2]
 

Constraints:

1 <= n <= 5 * 104
*/


/**
 * @param {number} n
 * @return {number[]}
 */
function lexicalOrder(n) {
    const result = [];

    // A helper function to perform DFS
    function dfs(current) {
        if (current > n) return; // Stop when current exceeds n
        result.push(current); // Add the current number to the result array

        // Try to go deeper by appending digits 0-9
        for (let i = 0; i <= 9; i++) {
            const next = current * 10 + i; // Build the next number
            if (next > n) break; // No need to continue if next exceeds n
            dfs(next); // Recursively call dfs for the next number
        }
    }

    // Start DFS from 1 to 9 (since 0 is not included)
    for (let i = 1; i <= 9; i++) {
        if (i > n) break;
        dfs(i); // Start DFS for each root number from 1 to 9
    }

    return result;
}

// Example 1
console.log(lexicalOrder(13)); // Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

// Example 2
console.log(lexicalOrder(2));  // Output: [1,2]


/*
DFS Traversal: We start with numbers 1 through 9 (as root numbers), then for each root number, we try to append digits 0 to 9 to generate numbers like 10, 11, ..., while staying within the range of n.
Result Storage: The result array stores the numbers in lexicographical order as they are generated.
Termination: We stop generating numbers once appending digits causes the number to exceed n.
*/

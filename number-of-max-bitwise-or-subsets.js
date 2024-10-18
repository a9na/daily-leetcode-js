/*
2044. Count Number of Maximum Bitwise-OR Subsets

Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.

The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

 

Example 1:

Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]
Example 2:

Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.
Example 3:

Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]
 

Constraints:

1 <= nums.length <= 16
1 <= nums[i] <= 105
*/

function countMaxOrSubsets(nums) {
    let maxOr = 0;
    let count = 0;
    
    // Step 1: Find the maximum possible bitwise OR
    for (let num of nums) {
        maxOr |= num;
    }

    // Step 2: Recursively generate all subsets and count how many subsets achieve the maximum OR
    function dfs(index, currentOr) {
        if (index === nums.length) {
            // If current OR equals max OR, increment count
            if (currentOr === maxOr) {
                count++;
            }
            return;
        }

        // Include the current element in the subset (OR with nums[index])
        dfs(index + 1, currentOr | nums[index]);

        // Exclude the current element from the subset (do not OR with nums[index])
        dfs(index + 1, currentOr);
    }

    // Start DFS from the 0th index with an initial OR of 0
    dfs(0, 0);

    return count;
}

// Example usage:
console.log(countMaxOrSubsets([3, 1]));  // Output: 2
console.log(countMaxOrSubsets([2, 2, 2]));  // Output: 7
console.log(countMaxOrSubsets([3, 2, 1, 5]));  // Output: 6

/*
maxOr: This variable stores the maximum bitwise OR possible from the array. We calculate it by OR-ing every element in the array.

dfs function: This is a recursive function that explores all subsets:

It has two choices at every element: include it in the subset (OR it with the current OR value) or exclude it.
If we reach the end of the array (i.e., index === nums.length), we check if the current OR value equals the maxOr. If so, we increment the count.

Main function: The function starts with dfs(0, 0) and explores all subsets.
*/

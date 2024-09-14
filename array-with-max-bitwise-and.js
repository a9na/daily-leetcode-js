/*
2419. Longest Subarray With Maximum Bitwise AND

You are given an integer array nums of size n.

Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
Return the length of the longest such subarray.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A subarray is a contiguous sequence of elements within an array.

 

Example 1:

Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
Example 2:

Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
*/

function longestSubarrayWithMaxBitwiseAnd(nums) {
    // Step 1: Find the maximum value in the array
    const maxVal = Math.max(...nums);

    // Step 2: Find the length of the longest subarray where all elements are equal to maxVal
    let maxLength = 0;
    let currentLength = 0;

    for (const num of nums) {
        if (num === maxVal) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {
            currentLength = 0;
        }
    }

    return maxLength;
}

// Example usage
const nums1 = [1, 2, 3, 3, 2, 2];
console.log(longestSubarrayWithMaxBitwiseAnd(nums1)); // Output: 2

const nums2 = [1, 2, 3, 4];
console.log(longestSubarrayWithMaxBitwiseAnd(nums2)); // Output: 1

/*
Finding the Maximum Value: We use Math.max(...nums) to get the maximum value from the array nums.

Finding the Longest Subarray:

Initialize maxLength to keep track of the longest subarray length found and currentLength to count the current length of contiguous elements equal to maxVal.
Traverse through the array:
If the current number is equal to maxVal, increase currentLength.
If it's not, reset currentLength to 0.
Update maxLength with the maximum of maxLength and currentLength.
*/

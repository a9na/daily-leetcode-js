/**179. Largest Number

Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.
 

Example 1:

Input: nums = [10,2]
Output: "210"
Example 2:

Input: nums = [3,30,34,5,9]
Output: "9534330"
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 109**/

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    // Convert numbers to strings
    const numsStr = nums.map(String);

    // Custom comparator function for sorting
    numsStr.sort((a, b) => (b + a).localeCompare(a + b));

    // Handle case where the largest number is zero
    if (numsStr[0] === '0') return '0';

    // Concatenate sorted numbers
    return numsStr.join('');
}

// Example usage
console.log(largestNumber([10, 2])); // Output: "210"
console.log(largestNumber([3, 30, 34, 5, 9])); // Output: "9534330"

/**
Conversion to Strings: nums.map(String) converts each number to a string for easier concatenation and comparison.

Sorting: The sort function uses a comparator to determine the order based on the concatenated results of two numbers. localeCompare is used to compare the concatenated strings.

Edge Case: If the sorted array starts with '0', it means all numbers are zeros, and the result should be '0'.

Joining: Finally, the sorted array of strings is joined to form the largest number.
**/

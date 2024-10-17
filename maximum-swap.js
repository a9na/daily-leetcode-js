/*
670. Maximum Swap

You are given an integer num. You can swap two digits at most once to get the maximum valued number.

Return the maximum valued number you can get.

 

Example 1:

Input: num = 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
Example 2:

Input: num = 9973
Output: 9973
Explanation: No swap.
 

Constraints:

0 <= num <= 108
*/

function maximumSwap(num) {
    // Convert number to an array of digits
    let digits = num.toString().split('').map(Number);
    
    // Create an array to store the last occurrence of each digit
    let last = new Array(10).fill(-1);
    
    // Fill the last occurrence array
    for (let i = 0; i < digits.length; i++) {
        last[digits[i]] = i;
    }
    
    // Try to find the first opportunity to swap for a larger number
    for (let i = 0; i < digits.length; i++) {
        // Check from 9 to the current digit + 1 for a larger digit
        for (let d = 9; d > digits[i]; d--) {
            if (last[d] > i) {
                // Swap the current digit with the larger one
                [digits[i], digits[last[d]]] = [digits[last[d]], digits[i]];
                // Convert the array back to number and return
                return parseInt(digits.join(''), 10);
            }
        }
    }
    
    // Return the original number if no swap is performed
    return num;
}

// Example 1
console.log(maximumSwap(2736)); // Output: 7236

// Example 2
console.log(maximumSwap(9973)); // Output: 9973

/*
Convert the number into an array of digits: This makes it easier to manipulate individual digits.
Track the last occurrence of each digit (0-9): This helps us find out if a larger digit exists later in the number.
Swap digits: For each digit, we look for the largest possible digit that appears later in the number and swap them. The first such swap will give us the maximum number.
Return the result: After the swap, the digits are joined back into a number, which is returned.
*/

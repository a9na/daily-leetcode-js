/*
Find Missing Observations

You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.

You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.

Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.

The average value of a set of k numbers is the sum of the numbers divided by k.

Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.

 

Example 1:

Input: rolls = [3,2,4,3], mean = 4, n = 2
Output: [6,6]
Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.
Example 2:

Input: rolls = [1,5,6], mean = 3, n = 4
Output: [2,3,2,2]
Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.
Example 3:

Input: rolls = [1,2,3,4], mean = 6, n = 4
Output: []
Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.
 

Constraints:

m == rolls.length
1 <= n, m <= 105
1 <= rolls[i], mean <= 6
*/

function missingRolls(rolls, mean, n) {
    // Calculate the number of observations
    const m = rolls.length;
    
    // Calculate the total sum of all n + m rolls needed to achieve the target mean
    const totalSum = (mean * (n + m));
    
    // Calculate the current sum of the available m rolls
    const currentSum = rolls.reduce((a, b) => a + b, 0);
    
    // Calculate the sum needed from the missing n rolls
    const missingSum = totalSum - currentSum;
    
    // Check if it's possible to achieve the missing sum with n rolls
    if (missingSum < n || missingSum > 6 * n) {
        return []; // No solution
    }
    
    // Create an array to store the result of missing rolls
    const result = Array(n).fill(1);
    
    // Distribute the remaining missing sum across the result array
    let remainingSum = missingSum - n;
    
    for (let i = 0; i < n && remainingSum > 0; i++) {
        // Increment the current roll up to the maximum of 6
        const increment = Math.min(5, remainingSum);
        result[i] += increment;
        remainingSum -= increment;
    }
    
    return result;
}

// Example Usage
console.log(missingRolls([3, 2, 4, 3], 4, 2)); // Output: [6, 6]
console.log(missingRolls([1, 5, 6], 3, 4));    // Output: [2, 3, 2, 2]
console.log(missingRolls([1, 2, 3, 4], 6, 4)); // Output: []

/*
Calculating Total Sum: We calculate the total sum of all n + m rolls needed to achieve the target mean by multiplying the mean by n + m.

Current Sum: We calculate the sum of the m known rolls using the reduce function.

Missing Sum: The sum required from the n missing rolls is simply the difference between the total sum and the current sum.

Feasibility Check: We check if it's possible to distribute the missing sum across n rolls. Each roll must be between 1 and 6, so if the missing sum is less than n (all 1s) or greater than 6 * n (all 6s), it's impossible to construct a valid solution.

Distribution: If it's feasible, we start with an array of n ones and distribute the remaining sum by incrementing values in the array, ensuring no value exceeds 6.
*/

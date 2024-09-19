/*
241. Different Ways to Add Parentheses

Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

 

Example 1:

Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
Example 2:

Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
 

Constraints:

1 <= expression.length <= 20
expression consists of digits and the operator '+', '-', and '*'.
All the integer values in the input expression are in the range [0, 99].
*/

/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    const memo = {};

    // Helper function to recursively compute the results
    function helper(expr) {
        // If the expression is already computed, return the result
        if (memo[expr]) return memo[expr];

        const results = [];

        // Iterate through each character in the expression
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];

            // If the character is an operator, split the expression
            if (char === '+' || char === '-' || char === '*') {
                const leftPart = helper(expr.substring(0, i));
                const rightPart = helper(expr.substring(i + 1));

                // Combine the results from left and right parts based on the operator
                for (let left of leftPart) {
                    for (let right of rightPart) {
                        if (char === '+') {
                            results.push(left + right);
                        } else if (char === '-') {
                            results.push(left - right);
                        } else if (char === '*') {
                            results.push(left * right);
                        }
                    }
                }
            }
        }

        // If the expression is a single number, just return it as the only result
        if (results.length === 0) {
            results.push(parseInt(expr));
        }

        // Store the result in memoization dictionary
        memo[expr] = results;
        return results;
    }

    return helper(expression);
}

// Example usage:
console.log(diffWaysToCompute("2-1-1")); // Output: [0, 2]
console.log(diffWaysToCompute("2*3-4*5")); // Output: [-34, -14, -10, -10, 10]

/*
Base Case: If the expression is a single number, we return it.
Recursive Case: For each operator (+, -, *), split the expression into two parts: the left and the right. Recursively compute all possible results for both parts.
Memoization: We store the results of previously computed sub-expressions to avoid recalculating them.
Combination: For each combination of left and right results, we apply the operator and store the result.
*/

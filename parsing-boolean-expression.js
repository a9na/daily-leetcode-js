/*
1106. Parsing A Boolean Expression

A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

't' that evaluates to true.
'f' that evaluates to false.
'!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
'&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
'|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
Given a string expression that represents a boolean expression, return the evaluation of that expression.

It is guaranteed that the given expression is valid and follows the given rules.

 

Example 1:

Input: expression = "&(|(f))"
Output: false
Explanation: 
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.
Example 2:

Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.
Example 3:

Input: expression = "!(&(f,t))"
Output: true
Explanation: 
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
 

Constraints:

1 <= expression.length <= 2 * 104
expression[i] is one following characters: '(', ')', '&', '|', '!', 't', 'f', and ','.
*/

function parseBoolExpr(expression) {
    // Function to evaluate each sub-expression
    const evaluate = (expr) => {
        if (expr === 't') return true;  // true case
        if (expr === 'f') return false; // false case
        
        // When there are operators
        const operator = expr[0];  // First character is the operator (!, &, |)
        const subExpr = expr.slice(2, -1); // Strip the operator and parentheses
        
        // Split sub-expressions by commas (for &, |)
        const subExpressions = [];
        let balance = 0, start = 0;
        for (let i = 0; i < subExpr.length; i++) {
            if (subExpr[i] === '(') balance++;
            if (subExpr[i] === ')') balance--;
            if (balance === 0 && subExpr[i] === ',') {
                subExpressions.push(subExpr.slice(start, i));
                start = i + 1;
            }
        }
        subExpressions.push(subExpr.slice(start)); // Add the last sub-expression
        
        // Evaluate based on the operator
        if (operator === '!') {
            return !evaluate(subExpressions[0]); // Negate the first sub-expression
        } else if (operator === '&') {
            return subExpressions.every(evaluate); // AND: all must be true
        } else if (operator === '|') {
            return subExpressions.some(evaluate); // OR: any can be true
        }
    };
    
    return evaluate(expression);
}

// Test cases
console.log(parseBoolExpr("&(|(f))"));         // Output: false
console.log(parseBoolExpr("|(f,f,f,t)"));      // Output: true
console.log(parseBoolExpr("!(&(f,t))"));       // Output: true

/*
Base Cases: If the expression is "t", return true. If it is "f", return false.
Operators:
!: Recursively negates the result of its single sub-expression.
&: Uses every to ensure all sub-expressions evaluate to true.
|: Uses some to check if any sub-expression evaluates to true.
Parsing: The inner expressions are parsed by splitting on commas, but only at positions where the parentheses are balanced. This ensures correct handling of nested expressions.
*/

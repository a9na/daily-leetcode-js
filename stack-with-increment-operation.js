/*
1381. Design a Stack With Increment Operation

Design a stack that supports increment operations on its elements.

Implement the CustomStack class:

CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
int pop() Pops and returns the top of the stack or -1 if the stack is empty.
void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.
 

Example 1:

Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack stk = new CustomStack(3); // Stack is Empty []
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
stk.pop();                            // return -1 --> Stack is empty return -1.
 

Constraints:

1 <= maxSize, x, k <= 1000
0 <= val <= 100
At most 1000 calls will be made to each method of increment, push and pop each separately.
*/

class CustomStack {
    constructor(maxSize) {
        this.stack = [];
        this.maxSize = maxSize;
        this.incrementArray = new Array(maxSize).fill(0); // Array to track increments
    }

    push(x) {
        if (this.stack.length < this.maxSize) {
            this.stack.push(x);
        }
    }

    pop() {
        if (this.stack.length === 0) {
            return -1;
        }
        let index = this.stack.length - 1;
        let incrementValue = this.incrementArray[index];
        
        // Apply the increment to the popped value
        let poppedValue = this.stack.pop() + incrementValue;

        // Propagate the increment to the next element down
        if (index > 0) {
            this.incrementArray[index - 1] += incrementValue;
        }
        this.incrementArray[index] = 0; // Reset the increment for the current index
        
        return poppedValue;
    }

    increment(k, val) {
        // Apply the increment to the first k elements (or the entire stack if it's smaller)
        let limit = Math.min(k, this.stack.length);
        if (limit > 0) {
            this.incrementArray[limit - 1] += val;
        }
    }
}

// Example usage:
const stk = new CustomStack(3);
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
console.log(stk.pop());                // return 2 --> stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3] (max size reached)
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
console.log(stk.pop());                // return 103 --> stack becomes [201, 202]
console.log(stk.pop());                // return 202 --> stack becomes [201]
console.log(stk.pop());                // return 201 --> stack becomes []
console.log(stk.pop());                // return -1 --> stack is empty

/*
Push: Adds the element x to the stack if the size is less than maxSize.
Pop: Removes and returns the top element of the stack after applying any pending increments from the incrementArray. If the stack is empty, returns -1.
Increment: Increments the bottom k elements by val. Instead of directly modifying the elements in the stack, the incrementArray is used to store the pending increments, which are applied when popping elements. This ensures that increment operations are efficient.
*/

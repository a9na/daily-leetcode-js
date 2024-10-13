/*632. Smallest Range Covering Elements from K Lists
Hard
Topics
Companies
You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
 

Constraints:

nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-105 <= nums[i][j] <= 105
nums[i] is sorted in non-decreasing order.*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Insert an element into the heap
  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  // Extract the minimum element from the heap
  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];

      if (element[0] >= parent[0]) break;

      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild[0] < element[0]) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild[0] < element[0]) ||
          (swap !== null && rightChild[0] < leftChild[0])
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
}

var smallestRange = function(nums) {
  const k = nums.length;
  const heap = new MinHeap();
  let max = -Infinity;
  let range = [-Infinity, Infinity];

  // Initialize the heap with the first element from each list
  for (let i = 0; i < k; i++) {
    const num = nums[i][0];
    heap.insert([num, i, 0]); // [value, listIndex, elementIndex]
    max = Math.max(max, num);
  }

  while (true) {
    // Get the smallest element from the heap
    const [min, listIndex, elementIndex] = heap.extractMin();

    // Update the range if the current one is smaller
    if (max - min < range[1] - range[0]) {
      range = [min, max];
    }

    // If we reach the end of one of the lists, stop
    if (elementIndex + 1 >= nums[listIndex].length) {
      break;
    }

    // Add the next element from the same list to the heap
    const nextElement = nums[listIndex][elementIndex + 1];
    heap.insert([nextElement, listIndex, elementIndex + 1]);
    max = Math.max(max, nextElement); // Update the max with the new element
  }

  return range;
};

// Example Usage
const nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]];
console.log(smallestRange(nums)); // Output: [20, 24]

/*
Heap Initialization:
We insert the first element of each list into the min-heap. We also keep track of the maximum element among them.

Extract Min and Calculate Range:
At each step, we extract the smallest element from the heap. We then check the current range from the smallest element 
(just extracted) to the largest element encountered so far. If this range is smaller than the previously found range, we update it.

Advance the Pointer:
We then insert the next element from the same list into the heap and update the largest element if necessary. If we reach the end of a list, we stop the process.
*/

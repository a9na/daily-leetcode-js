/*
1371. Find the Longest Substring Containing Vowels in Even Counts

Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.

 

Example 1:

Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
Example 2:

Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.
Example 3:

Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.
 

Constraints:

1 <= s.length <= 5 x 10^5
s contains only lowercase English letters.
*/

function findLongestSubstring(s) {
    const vowelToBit = { 'a': 1, 'e': 2, 'i': 4, 'o': 8, 'u': 16 };
    const n = s.length;
    let maxLength = 0;
    let bitmask = 0;
    const seen = new Map();
    
    // Initialize the map with the bitmask 0 at index -1
    seen.set(0, -1);
    
    for (let i = 0; i < n; i++) {
        const char = s[i];
        if (vowelToBit[char] !== undefined) {
            bitmask ^= vowelToBit[char]; // Toggle the bit for the vowel
        }
        
        if (seen.has(bitmask)) {
            // Update the maximum length
            maxLength = Math.max(maxLength, i - seen.get(bitmask));
        } else {
            // Store the first occurrence of this bitmask
            seen.set(bitmask, i);
        }
    }
    
    return maxLength;
}

// Example usage
console.log(findLongestSubstring("eleetminicoworoep")); // Output: 13
console.log(findLongestSubstring("leetcodeisgreat"));   // Output: 5
console.log(findLongestSubstring("bcbcbc"));            // Output: 6

/*
Bitmask Calculation: For each vowel, toggle its corresponding bit in the bitmask. For example, if 'a' is encountered, the bitmask is updated with bitmask ^= 1. This allows us to easily track whether the count of each vowel is odd or even.

Tracking First Occurrences: We use a Map to store the first index where each bitmask was encountered. This helps in calculating the length of substrings that have even counts of vowels by checking if the same bitmask has been seen before.

Result Calculation: For each position, if the current bitmask has been seen before, calculate the length of the substring between the previous occurrence and the current position. Update the maximum length accordingly.
*/

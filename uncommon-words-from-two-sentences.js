/*Uncommon Words from Two Sentences
Easy
Topics
Companies
A sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

 

Example 1:

Input: s1 = "this apple is sweet", s2 = "this apple is sour"

Output: ["sweet","sour"]

Explanation:

The word "sweet" appears only in s1, while the word "sour" appears only in s2.

Example 2:

Input: s1 = "apple apple", s2 = "banana"

Output: ["banana"]

 

Constraints:

1 <= s1.length, s2.length <= 200
s1 and s2 consist of lowercase English letters and spaces.
s1 and s2 do not have leading or trailing spaces.
All the words in s1 and s2 are separated by a single space.*/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
    const countWords = (sentence) => {
        const counts = new Map();
        const words = sentence.split(' ');
        for (const word of words) {
            counts.set(word, (counts.get(word) || 0) + 1);
        }
        return counts;
    };

    const count1 = countWords(s1);
    const count2 = countWords(s2);

    const uncommonWords = [];

    // Check words in the first sentence
    for (const [word, count] of count1) {
        if (count === 1 && !count2.has(word)) {
            uncommonWords.push(word);
        }
    }

    // Check words in the second sentence
    for (const [word, count] of count2) {
        if (count === 1 && !count1.has(word)) {
            uncommonWords.push(word);
        }
    }

    return uncommonWords;
}

// Example usage:
const s1 = "this apple is sweet";
const s2 = "this apple is sour";
console.log(uncommonFromSentences(s1, s2)); // Output: ["sweet", "sour"]

const s1_2 = "apple apple";
const s2_2 = "banana";
console.log(uncommonFromSentences(s1_2, s2_2)); // Output: ["banana"]

/*
countWords Function:

This function splits the sentence into words and counts their occurrences using a Map.

Uncommon Words Detection:

Iterate through the words in count1 (from the first sentence) and check if the word occurs exactly once and is not present in count2.
Similarly, iterate through the words in count2 (from the second sentence) and check if the word occurs exactly once and is not present in count1.

Return the List of Uncommon Words:

Collect the uncommon words into an array and return it.
*/

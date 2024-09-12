/*
1684. Count the Number of Consistent Strings

You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

Return the number of consistent strings in the array words.

 

Example 1:

Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
Example 2:

Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
Example 3:

Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
 

Constraints:

1 <= words.length <= 104
1 <= allowed.length <= 26
1 <= words[i].length <= 10
The characters in allowed are distinct.
words[i] and allowed contain only lowercase English letters.

*/

function countConsistentStrings(allowed, words) {
    const allowedSet = new Set(allowed);  
    let count = 0;

    for (const word of words) {
        if ([...word].every(char => allowedSet.has(char))) {
            count++;
        }
    }

    return count;
}

/*
allowedSet: We convert the allowed string into a Set to enable quick O(1) lookup for each character.
every: We use Array.prototype.every() to check if all characters of each word are in the allowedSet.
count: We maintain a counter that is incremented each time a consistent word is found.
*/

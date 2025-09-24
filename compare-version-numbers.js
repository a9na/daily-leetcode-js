/**
165. Compare Version Numbers

Given two version strings, version1 and version2, compare them. A version string consists of revisions separated by dots '.'. The value of the revision is its integer conversion ignoring leading zeros.

To compare version strings, compare their revision values in left-to-right order. If one of the version strings has fewer revisions, treat the missing revision values as 0.

Return the following:

If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.
 

Example 1:

Input: version1 = "1.2", version2 = "1.10"

Output: -1

Explanation:

version1's second revision is "2" and version2's second revision is "10": 2 < 10, so version1 < version2.

Example 2:

Input: version1 = "1.01", version2 = "1.001"

Output: 0

Explanation:

Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

Example 3:

Input: version1 = "1.0", version2 = "1.0.0.0"

Output: 0

Explanation:

version1 has less revisions, which means every missing revision are treated as "0".

 

Constraints:

1 <= version1.length, version2.length <= 500
version1 and version2 only contain digits and '.'.
version1 and version2 are valid version numbers.
All the given revisions in version1 and version2 can be stored in a 32-bit integer.
**/


/**
 * Compare two version numbers version1 and version2.
 * @param {string} version1 - The first version string.
 * @param {string} version2 - The second version string.
 * @return {number} - Returns 1 if version1 > version2, -1 if version1 < version2, else 0.
 */
function compareVersion(version1, version2) {
    // Split each version string by '.' to get individual revision parts
    // For example, "1.0.3" -> ["1", "0", "3"]
    const revisions1 = version1.split('.');
    const revisions2 = version2.split('.');
    
    // Find the max length to iterate through all revisions, including missing ones (which are treated as 0)
    const maxLength = Math.max(revisions1.length, revisions2.length);
    
    for (let i = 0; i < maxLength; i++) {
        // Parse the current revision number for both versions
        // If a version does not have a revision at this index, treat it as 0
        const rev1 = i < revisions1.length ? parseInt(revisions1[i], 10) : 0;
        const rev2 = i < revisions2.length ? parseInt(revisions2[i], 10) : 0;
        
        // Compare the two revision numbers
        if (rev1 > rev2) {
            return 1;  // version1 is greater
        }
        if (rev1 < rev2) {
            return -1; // version2 is greater
        }
        // If they are equal, continue to the next revision
    }
    
    // If all revisions are equal (including trailing zeros), the versions are the same
    return 0;
}

// Example usage:
console.log(compareVersion("1.2", "1.10"));      // Output: -1
console.log(compareVersion("1.01", "1.001"));    // Output: 0
console.log(compareVersion("1.0", "1.0.0.0"));   // Output: 0

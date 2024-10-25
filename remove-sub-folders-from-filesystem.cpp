/*Remove Sub-Folders from the Filesystem
Medium
Topics
Companies
Hint
Given a list of folders folder, return the folders after removing all sub-folders in those folders. You may return the answer in any order.

If a folder[i] is located within another folder[j], it is called a sub-folder of it. A sub-folder of folder[j] must start with folder[j], followed by a "/". For example, "/a/b" is a sub-folder of "/a", but "/b" is not a sub-folder of "/a/b/c".

The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.

For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.
 

Example 1:

Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
Example 2:

Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".
Example 3:

Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]
 

Constraints:

1 <= folder.length <= 4 * 104
2 <= folder[i].length <= 100
folder[i] contains only lowercase letters and '/'.
folder[i] always starts with the character '/'.
Each folder name is unique.*/

function removeSubfolders(folder) {
    folder.sort();
    
    const result = [];
    
    for (let f of folder) {
        if (result.length === 0 || !f.startsWith(result[result.length - 1] + '/')) {
            result.push(f); 
        }
    }
    
    return result; 
}

// Example usage:
console.log(removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"])); // Output: ["/a", "/c/d", "/c/f"]
console.log(removeSubfolders(["/a", "/a/b/c", "/a/b/d"])); // Output: ["/a"]
console.log(removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"])); // Output: ["/a/b/c", "/a/b/ca", "/a/b/d"]

/*
Sorting the folders: Sorting is essential because it allows us to compare each folder with its potential parent in a straightforward way.
Checking for sub-folders: The condition !f.startsWith(result[result.length - 1] + '/') checks if the current folder f starts with the last folder in the result, ensuring we only add non-sub-folders.
Efficiency: The solution runs in 𝑂(𝑛log𝑛)time complexity due to the sorting step, where n is the number of folders. 
The iteration through the sorted list is O(n), making the overall approach efficient for the given constraints.
*/

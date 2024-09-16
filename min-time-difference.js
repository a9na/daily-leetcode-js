/*539. Minimum Time Difference

Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 

Example 1:

Input: timePoints = ["23:59","00:00"]
Output: 1
Example 2:

Input: timePoints = ["00:00","23:59","00:00"]
Output: 0
 

Constraints:

2 <= timePoints.length <= 2 * 104
timePoints[i] is in the format "HH:MM".
*/

function findMinDifference(timePoints) {
    // Convert time to minutes from 00:00
    const convertToMinutes = (time) => {
        let [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Convert all timePoints to minutes and sort them
    let minutesArr = timePoints.map(convertToMinutes).sort((a, b) => a - b);
    
    // Initialize minimum difference as large as possible
    let minDiff = 1440; // max possible difference in minutes (24 * 60)

    // Check differences between consecutive times
    for (let i = 1; i < minutesArr.length; i++) {
        minDiff = Math.min(minDiff, minutesArr[i] - minutesArr[i - 1]);
    }

    // To handle circular difference (e.g., 23:59 and 00:00)
    let circularDiff = 1440 + minutesArr[0] - minutesArr[minutesArr.length - 1];
    minDiff = Math.min(minDiff, circularDiff);

    return minDiff;
}

// Example usage:
console.log(findMinDifference(["23:59", "00:00"])); // Output: 1
console.log(findMinDifference(["00:00", "23:59", "00:00"])); // Output: 0


/*
Convert Time to Minutes: Each time string is converted into minutes since 00:00 to make calculations easier.
Sort the Time Points: Sorting the time points helps easily calculate differences between consecutive times.
Minimum Difference: Loop through the sorted list and find the minimum difference between consecutive time points.
Circular Time Handling: We also account for the circular nature of time by checking the difference between the first and last time points across midnight.
*/

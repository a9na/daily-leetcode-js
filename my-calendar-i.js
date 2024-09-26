/**729. My Calendar I

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendar class:

MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.
 

Example 1:

Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
 

Constraints:

0 <= start < end <= 109
At most 1000 calls will be made to book.**/

class MyCalendar {
  constructor() {
    this.events = [];
  }

  book(start, end) {
    // Loop through each event in the calendar
    for (let [s, e] of this.events) {
      // Check if the new event overlaps with the current event
      if (Math.max(start, s) < Math.min(end, e)) {
        return false; // If there's an overlap, return false
      }
    }
    // If no overlap, add the event to the calendar
    this.events.push([start, end]);
    return true; // Return true since the event can be booked
  }
}

// Example usage
const myCalendar = new MyCalendar();
console.log(myCalendar.book(10, 20)); // true
console.log(myCalendar.book(15, 25)); // false
console.log(myCalendar.book(20, 30)); // true


/**
Explanation:
The MyCalendar class contains an events array where each event is represented by a pair [start, end].
The book method checks for overlaps by iterating over the existing events in this.events.
It compares the start and end times of the new event with each booked event. If the new event overlaps with any, it returns false.
If no overlap is found, the new event is added to the events array, and the method returns true.
**/

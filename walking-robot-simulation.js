/*Walking Robot Simulation
Medium
Topics
Companies
A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:

-2: Turn left 90 degrees.
-1: Turn right 90 degrees.
1 <= k <= 9: Move forward k units, one unit at a time.
Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.

Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).

Note:

North means +Y direction.
East means +X direction.
South means -Y direction.
West means -X direction.
There can be obstacle in [0,0].
 

Example 1:

Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 3 units to (3, 4).
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.
Example 2:

Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
4. Turn left.
5. Move north 4 units to (1, 8).
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.
Example 3:

Input: commands = [6,-1,-1,6], obstacles = []
Output: 36
Explanation: The robot starts at (0, 0):
1. Move north 6 units to (0, 6).
2. Turn right.
3. Turn right.
4. Move south 6 units to (0, 0).
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.
 

Constraints:

1 <= commands.length <= 104
commands[i] is either -2, -1, or an integer in the range [1, 9].
0 <= obstacles.length <= 104
-3 * 104 <= xi, yi <= 3 * 104
The answer is guaranteed to be less than 231.*/

function robotSim(commands, obstacles) {
    // Direction vectors: North, East, South, West
    const directions = [
        [0, 1],  // North
        [1, 0],  // East
        [0, -1], // South
        [-1, 0]  // West
    ];
    
    // Convert obstacles list to a set of strings for quick lookup
    const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));
    
    // Starting position and initial direction (facing North)
    let x = 0, y = 0;
    let direction = 0; // 0: North, 1: East, 2: South, 3: West
    
    let maxDistanceSq = 0;
    
    for (let command of commands) {
        if (command === -2) {
            // Turn left: counterclockwise
            direction = (direction + 3) % 4;
        } else if (command === -1) {
            // Turn right: clockwise
            direction = (direction + 1) % 4;
        } else {
            // Move forward 'command' steps
            for (let i = 0; i < command; i++) {
                const nextX = x + directions[direction][0];
                const nextY = y + directions[direction][1];
                
                // Check if the next position is an obstacle
                if (!obstacleSet.has(`${nextX},${nextY}`)) {
                    x = nextX;
                    y = nextY;
                    // Calculate the distance squared from origin
                    maxDistanceSq = Math.max(maxDistanceSq, x * x + y * y);
                } else {
                    // Stop if there's an obstacle
                    break;
                }
            }
        }
    }
    
    return maxDistanceSq;
}

// Example usage:
console.log(robotSim([4, -1, 3], [])); // Output: 25
console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]])); // Output: 65
console.log(robotSim([6, -1, -1, 6], [])); // Output: 36


/*
Direction Handling:

The robot can face four directions: North, East, South, and West.
directions array contains vectors representing these directions.
We use direction as an index to track which direction the robot is currently facing.

Command Execution:

If the command is -2, the robot turns left, which is equivalent to subtracting 1 from the direction index but wrapped around using modulo to keep within bounds.
If the command is -1, the robot turns right, which is adding 1 to the direction index.
For a positive command, the robot attempts to move forward step by step in the current direction, checking for obstacles.

Obstacle Handling:

Obstacles are stored in a set for quick lookup. Each position is stored as a string "x,y".

Maximum Distance Calculation:

The maximum squared distance from the origin is updated each time the robot moves.
*/

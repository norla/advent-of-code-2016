"use strict";
const fs = require("fs");
const _ = require("lodash");
/*
You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get -
the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North.
Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination.
Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?

For example:

Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.
How many blocks away is Easter Bunny HQ?
*/

const input = fs.readFileSync("./input/d1.txt").toString();

const directionMovements = {
  "N": {xd: 0, yd: 1},
  "E": {xd: 1, yd: 0},
  "S": {xd: 0, yd: -1},
  "W": {xd: -1, yd: 0}
}
const directions = Object.keys(directionMovements); 
let x = 0, y = 0;
let direction = "N";
let visited = [];
let firstVisitedTwice;
input.split(", ").forEach((step) => {
  const turn = step.slice(0, 1);
  const len = Number(step.slice(1));
  const directionIndex = directions.indexOf(direction);
  let nextDirectionIndex = (directionIndex + directions.length + (turn === "L" ? -1 : 1)) % directions.length;
  direction = directions[nextDirectionIndex];
  const xd = directionMovements[direction].xd * len;
  const yd = directionMovements[direction].yd * len;
  const visit = (vX, vY) => {
    const coord = `${vX} ${vY}`;
    if (!firstVisitedTwice && visited[coord]) firstVisitedTwice = {x: vX, y: vY};
    else visited[coord] = true; 
  }
  _.range(x, x + xd).forEach((xStep) => visit(xStep, y));
  _.range(y, y + yd).forEach((yStep) => visit(x, yStep));
  x += xd;
  y += yd;
  //console.log(x, y, visited)
});

console.log("Solution 1:", Math.abs(x) + Math.abs(y));
console.log("Solution 2:", Math.abs(firstVisitedTwice.x) + Math.abs(firstVisitedTwice.y));
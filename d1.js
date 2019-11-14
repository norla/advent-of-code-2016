"use strict";
const fs = require("fs");
const _ = require("lodash");

const input = fs
      .readFileSync("./input/d1.txt", "utf8")
      .split(", ")
      .map((s) => ({ turn: s.slice(0, 1), len: s.slice(1) }));

const directionMovements = {
  "N": {xd: 0, yd: 1},
  "E": {xd: 1, yd: 0},
  "S": {xd: 0, yd: -1},
  "W": {xd: -1, yd: 0}
}
const directions = Object.keys(directionMovements);

function solution1({direction, x, y, trail}, {turn, len}) {
  const directionIndex = directions.indexOf(direction);
  const nextDirectionIndex = (directionIndex + directions.length + (turn === "L" ? -1 : 1)) % directions.length;
  const nextDirection = directions[nextDirectionIndex];
  const xd = directionMovements[nextDirection].xd * len;
  const yd = directionMovements[nextDirection].yd * len;
  return {direction: nextDirection, x: x + xd, y: y + yd, trail: trail.concat({x, y})};
}

function solution2({lastX, lastY, visited, firstVisitedTwice}, {x, y}) {
  const visit = (vX, vY) => {
    const coord = {x: vX, y: vY};
    const coordStr = JSON.stringify(coord);
    if (!firstVisitedTwice && visited[coordStr]) firstVisitedTwice = coord;
    else visited[coordStr] = true;
  }
  _.range(lastX, x).forEach((xStep) => visit(xStep, y));
  _.range(lastY, y).forEach((yStep) => visit(x, yStep));
  return {lastX: x, lastY: y, visited, firstVisitedTwice};
};

const start = {x: 0, y: 0, direction: "N", trail: []};
const s1 = input.reduce(solution1, start);
const s2 = s1.trail.reduce(solution2, {lastX: 0, lastY: 0, visited: new Map(), firstVisitedTwice: null});

console.log("Solution 1:", Math.abs(s1.x) + Math.abs(s1.y));
console.log("Solution 2:", Math.abs(s2.firstVisitedTwice.x) + Math.abs(s2.firstVisitedTwice.y));

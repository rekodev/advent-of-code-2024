import { readInput } from "../utils.js";

const exampleInput = await readInput("./example_input.txt");
const input = await readInput("./input.txt");

const moveInDirection = (pos, dir) => {
  if (dir === "up") {
    pos[1] -= 1;
  } else if (dir === "down") {
    pos[1] += 1;
  } else if (dir === "left") {
    pos[0] -= 1;
  } else if (dir === "right") {
    pos[0] += 1;
  }
};

const calculateVisitedPositions = (input) => {
  const map = input.split("\n");
  // map[firstIndex][secondIndex]
  // where firstIndex represents the y axis of the map
  // and secondIndex represents the x axis of the map

  let visitedPositions = [];

  let direction = "up";
  let currentPosition = [0, 0];
  let nextPosition = [0, 0];

  // Find the starting position
  for (let row of map) {
    const rowCharacters = row.split("");
    const upArrow = rowCharacters.find((char) => char === "^");

    if (upArrow) {
      currentPosition = [row.indexOf(upArrow), map.indexOf(row)];
      break;
    }
  }

  while (true) {
    visitedPositions.push([...currentPosition]);
    nextPosition = [...currentPosition];

    moveInDirection(nextPosition, direction);

    // If next position is out of bounds, exit the while loop
    if (
      nextPosition[0] < 0 ||
      nextPosition[0] >= map[0].length ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= map.length
    ) {
      break;
    }

    const nextPositionCharacter = map[nextPosition[1]][nextPosition[0]];

    if (nextPositionCharacter === "#") {
      if (direction === "up") {
        direction = "right";
      } else if (direction === "right") {
        direction = "down";
      } else if (direction === "down") {
        direction = "left";
      } else if (direction === "left") {
        direction = "up";
      }
    }

    moveInDirection(currentPosition, direction);
  }

  const uniqueVisitedPositions = [
    ...new Set(visitedPositions.map(JSON.stringify)),
  ];

  return uniqueVisitedPositions.length;
};

const calculateLoops = (input) => {
  const map = input.split("\n");
  let blocksThatCauseLoops = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const mapCopy = map.map((row) => row.split(""));

      if (mapCopy[i][j] === "#" || mapCopy[i][j] === "^") {
        continue;
      } else {
        mapCopy[i][j] = "#";

        let direction = "up";
        let currentPosition = [0, 0];

        // Find the starting position
        for (let row of mapCopy) {
          const upArrow = row.find((char) => char === "^");

          if (upArrow) {
            currentPosition = [row.indexOf(upArrow), mapCopy.indexOf(row)];
            break;
          }
        }

        let visitedPositions = new Set();
        let infiniteLoopDetected = false;

        while (true) {
          const posStr = `${currentPosition[0]},${currentPosition[1]},${direction}`;

          let nextPosition = [...currentPosition];
          moveInDirection(nextPosition, direction);

          if (visitedPositions.has(posStr)) {
            infiniteLoopDetected = true;
            break;
          }

          visitedPositions.add(posStr);

          // If next position is out of bounds, exit the while loop
          if (
            nextPosition[0] < 0 ||
            nextPosition[0] >= mapCopy[0].length ||
            nextPosition[1] < 0 ||
            nextPosition[1] >= mapCopy.length
          ) {
            break;
          }

          const nextChar = mapCopy[nextPosition[1]][nextPosition[0]];

          if (nextChar === "#") {
            if (direction === "up") {
              direction = "right";
            } else if (direction === "right") {
              direction = "down";
            } else if (direction === "down") {
              direction = "left";
            } else if (direction === "left") {
              direction = "up";
            }
          } else {
            currentPosition = nextPosition;
          }
        }

        if (infiniteLoopDetected) {
          blocksThatCauseLoops++;
        }
      }
    }
  }
  return blocksThatCauseLoops;
};

// Part 1
console.log(calculateVisitedPositions(exampleInput)); // Expected output: 41
console.log(calculateVisitedPositions(input)); // Expected output: 4903

// Part 2
console.log(calculateLoops(exampleInput)); // Expected output: 6
console.log(calculateLoops(input)); // Expected output: 1911

import { readInput } from "../utils.js";

const exampleInput = await readInput("./example_input.txt");
const input = await readInput("./input.txt");

const xMasFinder = (input) => {
  const splitInput = input.split("\n");
  // Search for word XMAS, it can be horizontal, vertical, diagonal, written backwards, or even overlapping other words.
  let foundWords = 0;

  for (let i = 0; i < splitInput.length; i++) {
    const splitLine = splitInput[i];

    for (let j = 0; j < splitLine.length; j++) {
      // horizontal
      if (
        splitLine[j] === "X" &&
        splitLine[j + 1] === "M" &&
        splitLine[j + 2] === "A" &&
        splitLine[j + 3] === "S"
      ) {
        foundWords++;
      }

      // horizontal backwards
      if (
        splitLine[j] === "S" &&
        splitLine[j + 1] === "A" &&
        splitLine[j + 2] === "M" &&
        splitLine[j + 3] === "X"
      ) {
        foundWords++;
      }

      // skip if i + 3 is out of bounds
      if (i + 3 >= splitInput.length) continue;

      // vertical
      if (
        splitInput[i][j] === "X" &&
        splitInput[i + 1][j] === "M" &&
        splitInput[i + 2][j] === "A" &&
        splitInput[i + 3][j] === "S"
      ) {
        foundWords++;
      }

      // vertical backwards
      if (
        splitInput[i][j] === "S" &&
        splitInput[i + 1][j] === "A" &&
        splitInput[i + 2][j] === "M" &&
        splitInput[i + 3][j] === "X"
      ) {
        foundWords++;
      }

      // diagonal
      if (
        splitInput[i][j] === "X" &&
        splitInput[i + 1][j + 1] === "M" &&
        splitInput[i + 2][j + 2] === "A" &&
        splitInput[i + 3][j + 3] === "S"
      ) {
        foundWords++;
      }

      // diagonal backwards
      if (
        splitInput[i][j] === "S" &&
        splitInput[i + 1][j + 1] === "A" &&
        splitInput[i + 2][j + 2] === "M" &&
        splitInput[i + 3][j + 3] === "X"
      ) {
        foundWords++;
      }

      // diagonal other direction
      if (
        splitInput[i][j + 3] === "X" &&
        splitInput[i + 1][j + 2] === "M" &&
        splitInput[i + 2][j + 1] === "A" &&
        splitInput[i + 3][j] === "S"
      ) {
        foundWords++;
      }

      // diagonal other direction backwards
      if (
        splitInput[i][j + 3] === "S" &&
        splitInput[i + 1][j + 2] === "A" &&
        splitInput[i + 2][j + 1] === "M" &&
        splitInput[i + 3][j] === "X"
      ) {
        foundWords++;
      }
    }
  }

  return foundWords;
};

const xMasFinder2 = (input) => {
  const splitInput = input.split("\n");

  let foundInstances = 0;

  // find all instances of
  // X-MAS, each MAS can be writted forwards or backwards
  // M-S .  S-S
  // -A- or -A-
  // M-S .  M-M
  //
  // S-M .  M-M
  // -A- or -A-
  // M-S .  S-S

  for (let i = 0; i < splitInput.length; i++) {
    console.log(splitInput[i]);

    for (let j = 0; j < splitInput[i].length; j++) {
      if (i + 2 >= splitInput.length) continue;

      if (splitInput[i][j] === "M" && splitInput[i][j + 2] === "S") {
        if (splitInput[i + 1][j + 1] === "A") {
          if (
            splitInput[i + 2][j] === "M" &&
            splitInput[i + 2][j + 2] === "S"
          ) {
            foundInstances++;
          }
        }
      }

      if (splitInput[i][j] === "S" && splitInput[i][j + 2] === "M") {
        if (splitInput[i + 1][j + 1] === "A") {
          if (
            splitInput[i + 2][j] === "S" &&
            splitInput[i + 2][j + 2] === "M"
          ) {
            foundInstances++;
          }
        }
      }

      if (splitInput[i][j] === "S" && splitInput[i][j + 2] === "S") {
        if (splitInput[i + 1][j + 1] === "A") {
          if (
            splitInput[i + 2][j] === "M" &&
            splitInput[i + 2][j + 2] === "M"
          ) {
            foundInstances++;
          }
        }
      }

      if (splitInput[i][j] === "M" && splitInput[i][j + 2] === "M") {
        if (splitInput[i + 1][j + 1] === "A") {
          if (
            splitInput[i + 2][j] === "S" &&
            splitInput[i + 2][j + 2] === "S"
          ) {
            foundInstances++;
          }
        }
      }
    }
  }

  return foundInstances;
};

// Part 1
console.log(xMasFinder(exampleInput)); // Expected output: 18
console.log(xMasFinder(input)); // Expected output: 2493

// Part 2
console.log(xMasFinder2(exampleInput)); // Expected output: 9
console.log(xMasFinder2(input)); // Expected output: 1

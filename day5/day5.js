import { readInput } from "../utils.js";

const exampleInput = await readInput("./example_input.txt");
const input = await readInput("./input.txt");

const parseInput = (input) => {
  const splitInput = input.split("\n");
  const sectionOne = [];
  const sectionTwo = [];

  let midSectionReached = false;

  for (let i = 0; i < splitInput.length; i++) {
    if (splitInput[i] === "") {
      midSectionReached = true;
      continue;
    }

    if (midSectionReached) {
      sectionTwo.push(splitInput[i]);
    } else {
      sectionOne.push(splitInput[i]);
    }
  }

  return { sectionOne, sectionTwo };
};

const checkOrderCorrectness = (number, numbersSeen, ruleSection) => {
  for (const rule of ruleSection) {
    const splitRule = rule.split("|");

    const beforeNumber = parseInt(splitRule[0]);
    const afterNumber = parseInt(splitRule[1]);

    if (number !== beforeNumber) {
      continue;
    }

    if (numbersSeen.includes(afterNumber)) {
      return false;
    }
  }

  return true;
};

const calculateMiddlePageNumbers = (input) => {
  const { sectionOne, sectionTwo } = parseInput(input);

  const correctUpdates = [];

  for (const update of sectionTwo) {
    const splitUpdate = update.split(",");

    const seenNumbers = [];
    let isUpdateCorrect = true;

    for (let number of splitUpdate) {
      number = parseInt(number);
      seenNumbers.push(number);

      const isOrderCorrect = checkOrderCorrectness(
        number,
        seenNumbers,
        sectionOne
      );

      if (!isOrderCorrect) {
        isUpdateCorrect = false;
        break;
      }
    }

    if (isUpdateCorrect) {
      correctUpdates.push(splitUpdate);
    }
  }

  let middlePageNumberSum = 0;

  for (const update of correctUpdates) {
    const middleIndex = Math.floor(update.length / 2);
    const middlePageNumber = update[middleIndex];
    middlePageNumberSum += parseInt(middlePageNumber);
  }

  return middlePageNumberSum;
};

// Part 1
console.log(calculateMiddlePageNumbers(exampleInput));
console.log(calculateMiddlePageNumbers(input));

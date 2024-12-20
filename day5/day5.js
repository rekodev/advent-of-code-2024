import { readInput } from "../utils.js";

const exampleInput = await readInput("./example_input.txt");
const input = await readInput("./input.txt");

const INCORRECT_ONLY = true;

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

const fixIncorrectUpdate = (update, sectionOne) => {
  let isUpdateCorrect = false;
  let seenNumbers = [];

  while (!isUpdateCorrect) {
    isUpdateCorrect = true;

    for (let i = 0; i < update.length; i++) {
      const number = parseInt(update[i]);

      seenNumbers.push(number);
      const isOrderCorrect = checkOrderCorrectness(
        number,
        seenNumbers,
        sectionOne
      );

      if (!isOrderCorrect) {
        isUpdateCorrect = false;

        const prevNumber = update[i - 1];
        update[i - 1] = number.toString();
        update[i] = prevNumber;

        seenNumbers = [];
        break;
      }
    }
  }

  return update;
};

const calculateMiddlePageNumberSum = (updates) => {
  let middlePageNumberSum = 0;

  for (const update of updates) {
    const middleIndex = Math.floor(update.length / 2);
    const middlePageNumber = update[middleIndex];
    middlePageNumberSum += parseInt(middlePageNumber);
  }

  return middlePageNumberSum;
};

const calculateMiddlePageNumbers = (input, incorrectOnly = false) => {
  const { sectionOne, sectionTwo } = parseInput(input);

  const correctUpdates = [];
  const incorrectUpdates = [];

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
    } else {
      incorrectUpdates.push(splitUpdate);
    }
  }

  if (incorrectOnly) {
    const fixedUpdates = [];

    for (const update of incorrectUpdates) {
      const fixedUpdate = fixIncorrectUpdate(update, sectionOne);
      fixedUpdates.push(fixedUpdate);
    }

    return calculateMiddlePageNumberSum(fixedUpdates);
  }

  return calculateMiddlePageNumberSum(correctUpdates);
};

// Part 1
console.log(calculateMiddlePageNumbers(exampleInput)); // Expected output: 143
console.log(calculateMiddlePageNumbers(input)); // Expected output: 4578

// Part 2
console.log(calculateMiddlePageNumbers(exampleInput, INCORRECT_ONLY)); // Expected output: 123
console.log(calculateMiddlePageNumbers(input, INCORRECT_ONLY)); // Expecected output: 6179

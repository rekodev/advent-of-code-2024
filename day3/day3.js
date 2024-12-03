import { readInput } from '../utils.js';

const findAndMultiply = (input) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.matchAll(regex);

  let totalResult = 0;

  for (const match of matches) {
    const num1 = Number(match[1]);
    const num2 = Number(match[2]);

    totalResult += num1 * num2;
  }

  return totalResult;
};

const findAndMultiplyWithInstructions = (input) => {
  let totalSum = 0;

  let isEnabled = true;
  const instructions = input.matchAll(
    /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g
  );

  for (const instruction of instructions) {
    if (instruction[0] === 'do()') {
      isEnabled = true;
    } else if (instruction[0] === "don't()") {
      isEnabled = false;
    } else if (isEnabled) {
      const num1 = Number(instruction[1]);
      const num2 = Number(instruction[2]);

      totalSum += num1 * num2;
    }
  }

  return totalSum;
};

const exampleInput = await readInput('./example_input.txt');
const exampleInput2 = await readInput('./example_input2.txt');
const input = await readInput('./input.txt');

// Part 1
console.log(findAndMultiply(exampleInput)); // Expected output: 161
console.log(findAndMultiply(input)); // Expected output: 173419328

// Part 2
console.log(findAndMultiplyWithInstructions(exampleInput2)); // Expected output: 48
console.log(findAndMultiplyWithInstructions(input)); // Expected output: 90669332

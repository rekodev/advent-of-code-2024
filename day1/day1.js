import { readInput } from '../utils.js';

const parseInput = (input) => {
  const inputSplitIntoPairs = input.split('\n');
  let firstList = [];
  let secondList = [];

  for (const pair of inputSplitIntoPairs) {
    const splitPair = pair.split('   ');

    firstList.push(splitPair[0]);
    secondList.push(splitPair[1]);
  }

  return { list1: firstList, list2: secondList };
};

const exampleInput = await readInput('./example_input.txt');
const input = await readInput('./input.txt');

const parsedExampleInput = parseInput(exampleInput);
const parsedInput = parseInput(input);

const distanceCalculator = (firstList, secondList) => {
  if (firstList.length !== secondList.length) return 0;

  const sortedFirstList = firstList.slice().sort((a, b) => b - a);
  const sortedSecondList = secondList.slice().sort((a, b) => b - a);

  let totalDistance = 0;

  while (sortedFirstList.length > 0) {
    const distance = Math.abs(
      sortedFirstList[sortedFirstList.length - 1] -
        sortedSecondList[sortedSecondList.length - 1]
    );

    totalDistance += distance;

    sortedFirstList.pop();
    sortedSecondList.pop();
  }

  return totalDistance;
};

const similarityCalculator = (firstList, secondList) => {
  if (firstList.length !== secondList.length) return 0;

  let similarityScore = 0;

  for (let firstListNum of firstList) {
    let timesAppeared = 0;

    for (let secondListNum of secondList) {
      if (firstListNum === secondListNum) {
        timesAppeared += 1;
      }
    }

    similarityScore += firstListNum * timesAppeared;
  }

  return similarityScore;
};

// Part 1
console.log(
  distanceCalculator(parsedExampleInput.list1, parsedExampleInput.list2)
); // Expected output: 11
console.log(distanceCalculator(parsedInput.list1, parsedInput.list2)); // Example output: 1666427

// Part 2
console.log(
  similarityCalculator(parsedExampleInput.list1, parsedExampleInput.list2)
); // Expected output: 31
console.log(similarityCalculator(parsedInput.list1, parsedInput.list2)); // Expected output: 24316233

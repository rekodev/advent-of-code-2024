import { readInput } from '../utils';

const parseInput = (input) => {
  return input.split('\n').map((value) => value.split(' '));
};

const analyzeSafety = (report) => {
  let safe = true;

  let increasing = false;
  let decreasing = false;

  for (let i = 0; i < report.length; i++) {
    const lastLevel = Number(i) === report.length - 1;
    if (lastLevel) break;

    const currentLevel = Number(report[i]);
    const nextLevel = Number(report[i + 1]);

    if (currentLevel > nextLevel) {
      decreasing = true;
    } else {
      increasing = true;
    }

    if (currentLevel === nextLevel || Math.abs(currentLevel - nextLevel) > 3) {
      safe = false;
      break;
    }
  }

  if (increasing && decreasing) safe = false;

  return safe;
};

const problemDampener = (rep) => {
  for (let i = 0; i < rep.length; i++) {
    const reportCopy = rep.slice();
    reportCopy.splice(i, 1);

    const safeReport = analyzeSafety(reportCopy);

    if (safeReport) return true;
  }

  return false;
};

const calculateSafeReports = (input, withProblemDampener = false) => {
  let safeReports = 0;

  for (const report of input) {
    const safeReport = analyzeSafety(report);
    if (safeReport) safeReports += 1;

    if (withProblemDampener && !safeReport) {
      const safeDampenedReport = problemDampener(report);
      if (safeDampenedReport) safeReports += 1;
    }
  }

  return safeReports;
};

const exampleInput = await readInput('./example_input.txt');
const parsedExampleInput = parseInput(exampleInput);

const input = await readInput('./input.txt');
const parsedInput = parseInput(input);

// Part 1
console.log(calculateSafeReports(parsedExampleInput)); // Expected output: 2
console.log(calculateSafeReports(parsedInput)); // Expected output: 332

// Part 2
console.log(calculateSafeReports(parsedExampleInput, true)); // Expected output: 4
console.log(calculateSafeReports(parsedInput, true)); // Expected output: 398

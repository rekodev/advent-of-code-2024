import fs from 'node:fs/promises';

export const readInput = async (fileSrc) => {
  const data = await fs.readFile(fileSrc, { encoding: 'utf8' });

  return data;
};

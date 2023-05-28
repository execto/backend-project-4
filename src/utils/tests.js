import { fileURLToPath } from 'url';
import path from 'path';

const getDirname = (importUrl) => {
  const __filename = fileURLToPath(importUrl);
  return path.dirname(__filename);
};

const createGetFixturesPath = (fixturesFolderPath) => (filename) =>
  path.join(fixturesFolderPath, filename);

export { getDirname, createGetFixturesPath };

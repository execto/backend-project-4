import { expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs/promises';

import { createGetFixturesPath, getDirname } from '../../src/utils/tests';
import extractImgLinks from '../../src/htmlParsers/extractImgLinks';

const __dirname = getDirname(import.meta.url);
const getFixturePath = createGetFixturesPath(path.join(__dirname, '..', '..', '__fixtures__'));

test('extractImgLinks main flow', async () => {
  const html = await fs.readFile(getFixturePath('courses.html', 'utf-8'));
  const links = extractImgLinks(html);
  expect(links).toEqual(['/assets/professions/nodejs.png']);
});

test('extractImgLinks without imgs', async () => {
  const html = await fs.readFile(getFixturePath('courses-without-img.html', 'utf-8'));
  const links = extractImgLinks(html);
  expect(links).toHaveLength(0);
});

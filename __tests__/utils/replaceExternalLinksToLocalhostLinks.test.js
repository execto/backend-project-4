import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs/promises';

import { getDirname, createGetFixturesPath } from '../../src/utils/tests';
import replaceExternalLinksToLocalhostLinks from '../../src/utils/replaceExternalLinksToLocalhostLinks';
import UrlConverter from '../../src/utils/urlConverter';

const __dirname = getDirname(import.meta.url);
const getFixturePath = createGetFixturesPath(path.join(__dirname, '..', '..', '__fixtures__'));

test('replaceExternalLinksToLocalhostLinks', async () => {
  const urlConverter = new UrlConverter('https://ru.hexlet.io/courses');
  const html = await fs.readFile(getFixturePath('courses.html'), 'utf-8');
  const actualHtml = replaceExternalLinksToLocalhostLinks(html, urlConverter);
  const expectedHtml = await fs.readFile(getFixturePath('courses-expected.html'), 'utf-8');
  expect(actualHtml).toEqual(expectedHtml);
});

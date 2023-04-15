import { expect, test } from '@jest/globals';
import fs from 'fs/promises';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import nock from 'nock';

import loadPage from '../../src/pageLoader/index.js';

const tmpDir = os.tmpdir();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);

test('loadPage main flow', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .replyWithFile(
      200,
      getFixturePath('courses.html', {
        'Content-Type': 'text/html',
      }),
    );

  const downloadedPagePath = await loadPage('https://ru.hexlet.io/courses', tmpDir);
  console.log('PAGE_PATH!!!', downloadedPagePath);
  return expect(fs.access(downloadedPagePath, fs.constants.F_OK)).resolves.toBeUndefined();
});

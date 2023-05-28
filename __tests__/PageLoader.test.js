import { beforeAll, expect, test } from '@jest/globals';
import fs from 'fs/promises';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import nock from 'nock';

import _ from 'lodash';

import PageLoader from '../src/PageLoader';

const tmpDir = os.tmpdir();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeAll(async () => {
  await fs.rm(tmpDir, { recursive: true }).catch(_.noop);
});

test('loadPage', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .replyWithFile(
      200,
      getFixturePath('courses.html', {
        'Content-Type': 'text/html',
      }),
    );

  nock('https://ru.hexlet.io')
    .get('/courses/assets/professions/nodejs.png')
    .replyWithFile(
      200,
      getFixturePath('nodejs.png', {
        'Content-Type': 'image/png',
      }),
    );

  const pageLoader = new PageLoader('https://ru.hexlet.io/courses', tmpDir);
  const downloadedPagePath = await pageLoader.loadPage();
  await expect(fs.access(downloadedPagePath, fs.constants.F_OK)).resolves.toBeUndefined();

  const assetsFolder = pageLoader.urlConverter.getLocalhostAssetsFolder();
  const assetPath = pageLoader.urlConverter.getLocalHostAssetPath('/assets/professions/nodejs.png');
  const assetsFolderPath = path.join(tmpDir, assetsFolder);
  const downloadedAssetPath = path.join(tmpDir, assetPath);
  await expect(fs.access(assetsFolderPath, fs.constants.F_OK)).resolves.toBeUndefined();
  await expect(fs.access(downloadedAssetPath, fs.constants.F_OK)).resolves.toBeUndefined();
});

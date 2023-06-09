import { expect, test } from '@jest/globals';

import UrlConverter from '../../src/utils/urlConverter';

test('UrlConverter for https://ru.hexlet.io/courses', () => {
  const urlConverter = new UrlConverter('https://ru.hexlet.io/courses');

  expect(urlConverter.getLocalhostBaseUrl()).toBe('ru-hexlet-io');
  expect(urlConverter.getLocalhostHtmlFilename()).toBe('ru-hexlet-io-courses.html');
  expect(urlConverter.getLocalhostAssetsFolder()).toBe('ru-hexlet-io-courses_files');
  expect(urlConverter.getLocalHostAssetPath('/assets/professions/nodejs.png')).toBe(
    'ru-hexlet-io-courses_files/ru-hexlet-io-assets-professions-nodejs.png',
  );
});

test('UrlConverter for https://ru.hexlet.io/courses/node-js', () => {
  const urlConverter = new UrlConverter('https://ru.hexlet.io/courses/node-js');

  expect(urlConverter.getLocalhostBaseUrl()).toBe('ru-hexlet-io');
  expect(urlConverter.getLocalhostHtmlFilename()).toBe('ru-hexlet-io-courses-node-js.html');
  expect(urlConverter.getLocalhostAssetsFolder()).toBe('ru-hexlet-io-courses-node-js_files');
  expect(urlConverter.getLocalHostAssetPath('/assets/professions/nodejs.png')).toBe(
    'ru-hexlet-io-courses-node-js_files/ru-hexlet-io-assets-professions-nodejs.png',
  );
});

test('UrlConverter invalid url', () => {
  expect(() => new UrlConverter('/invalid/url')).toThrow();
});

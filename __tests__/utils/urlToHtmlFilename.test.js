import { expect, test } from '@jest/globals';
import urlToHtmlFilename from '../../src/utils/urlToHtmlFilename';

test('url to html filename', () => {
  const filename = urlToHtmlFilename('https://ru.hexlet.io/courses');
  expect(filename).toBe('ru-hexlet-io-courses.html');
});

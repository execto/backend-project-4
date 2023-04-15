import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

import urlToHtmlFilename from '../utils/urlToHtmlFilename.js';

const loadPage = (url, output) => {
  const htmlFileName = urlToHtmlFilename(url);
  const filePath = path.join(output, htmlFileName);

  return axios
    .get(url)
    .then((response) => response.data)
    .then((data) => fs.writeFile(filePath, data, 'utf-8'))
    .then(() => filePath);
};

export default loadPage;

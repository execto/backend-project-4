import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import debug from 'debug';
import { addLogger } from 'axios-debug-log';

import UrlConverter from './utils/urlConverter.js';
import replaceExternalLinksToLocalhostLinks from './utils/replaceExternalLinksToLocalhostLinks.js';
import getAssetDownloadUrl from './utils/getAssetDownloadUrl.js';
import extractLinksForDownload from './htmlParsers/extractLinksForDownload.js';

addLogger(axios, debug('page-loader-requests'));

class PageLoader {
  constructor(url, output) {
    this.url = url;
    this.urlConverter = new UrlConverter(url);
    this.output = output;
  }

  loadPage() {
    const htmlFileName = this.urlConverter.getLocalhostHtmlFilename();
    const filePath = path.join(this.output, htmlFileName);

    return axios
      .get(this.url)
      .then((response) => response.data)
      .then((html) => this.loadPageAssets(extractLinksForDownload(html, this.url)).then(() => html))
      .then((html) => replaceExternalLinksToLocalhostLinks(html, this.urlConverter))
      .then((data) => fs.writeFile(filePath, data, 'utf-8'))
      .then(() => filePath);
  }

  loadPageAssets(assetsPathsArray) {
    return fs
      .mkdir(path.join(this.output, this.urlConverter.getLocalhostAssetsFolder()), {
        recursive: true
      })
      .then(() => {
        const assetsLoadPromises = assetsPathsArray.map((assetsPath) => {
          const assetUrl = getAssetDownloadUrl(this.url, assetsPath);
          const localAssetPath = path.join(
            this.output,
            this.urlConverter.getLocalHostAssetPath(assetsPath)
          );

          return axios
            .get(assetUrl, {
              responseType: 'arraybuffer'
            })
            .then((response) => fs.writeFile(localAssetPath, response.data, 'utf-8'))
            .catch(console.log);
        });

        return Promise.all(assetsLoadPromises);
      });
  }
}

export default PageLoader;

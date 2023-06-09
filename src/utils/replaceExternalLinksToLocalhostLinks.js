import { load } from 'cheerio';
import isLocalAsset from './isLocalAsset.js';

const replaceExternalLinksToLocalhostLinks = (html, urlConverter) => {
  const $ = load(html);
  $('img').map((i, el) => {
    const imgEl = $(el);
    const src = imgEl.attr('src');
    if (!isLocalAsset(src, urlConverter.getOrigin())) {
      return null;
    }
    const localhostSrc = urlConverter.getLocalHostAssetPath(src);
    imgEl.attr('src', localhostSrc);
    return null;
  });

  return $.html();
};

export default replaceExternalLinksToLocalhostLinks;

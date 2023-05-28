import { load } from 'cheerio';

const replaceExternalLinksToLocalhostLinks = (html, urlConverter) => {
  const $ = load(html);
  $('img').map((i, el) => {
    const imgEl = $(el);
    const src = imgEl.attr('src');
    const localhostSrc = urlConverter.getLocalHostAssetPath(src);
    imgEl.attr('src', localhostSrc);
    return null;
  });

  return $.html();
};

export default replaceExternalLinksToLocalhostLinks;

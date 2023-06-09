import { load } from 'cheerio';
import isLocalAsset from '../utils/isLocalAsset.js';

const extractLinkByParams = (html, tag, prop) => {
  const $ = load(html);
  const linkElements = $(tag);
  const links = linkElements.map((i, el) => $(el).attr(prop)).toArray();

  return links;
};

const extractLinksForDownload = (html, baseUrl) => {
  const imgLinks = extractLinkByParams(html, 'img', 'src');
  const linkLinks = extractLinkByParams(html, 'link', 'href');
  const scriptLinks = extractLinkByParams(html, 'script', 'src');
  const filteredLinks = [...imgLinks, ...linkLinks, ...scriptLinks].filter(
    (link) => isLocalAsset(link, baseUrl) && link.length !== 0
  );
  return filteredLinks;
};

export default extractLinksForDownload;

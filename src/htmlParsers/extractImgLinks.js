import { load } from 'cheerio';

const extractImgLinks = (html) => {
  const $ = load(html);
  const imgElements = $('img');
  const links = imgElements.map((i, el) => $(el).attr('src')).toArray();

  return links;
};

export default extractImgLinks;

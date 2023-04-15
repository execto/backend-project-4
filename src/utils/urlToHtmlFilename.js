const urlToHtmlFilename = (url) => {
  const parsedUrl = new URL(url);
  const urlWithoutProtocol = url.replace(`${parsedUrl.protocol}//`, '');
  const urlWithHyphen = urlWithoutProtocol.replace(/(\.|\/)/g, '-');

  return `${urlWithHyphen}.html`;
};

export default urlToHtmlFilename;

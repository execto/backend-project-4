const getAssetDownloadUrl = (baseUrl, assetUrl) => {
  const absoluteUrlRegexp = /^(?:[a-z+]+:)?\/\//;
  if (absoluteUrlRegexp.test(assetUrl)) {
    return assetUrl;
  }

  return `${baseUrl}${assetUrl}`;
};

export default getAssetDownloadUrl;

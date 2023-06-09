const isLocalAsset = (assetUrl, baseUrl) => {
  const absoluteUrlRegexp = /^(?:[a-z+]+:)?\/\//;
  if (absoluteUrlRegexp.test(assetUrl)) {
    return new URL(baseUrl).origin === new URL(assetUrl).origin;
  }
  return true;
};

export default isLocalAsset;

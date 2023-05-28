const getAssetDownloadUrl = (baseUrl, assetUrl) => {
  let assetUrlProcessed = assetUrl;
  if (!/^(http:\/\/|https:\/\/)/.test(assetUrl)) {
    assetUrlProcessed = `${baseUrl}${assetUrl}`;
  }

  return assetUrlProcessed;
};

export default getAssetDownloadUrl;

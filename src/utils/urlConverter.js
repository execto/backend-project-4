class UrlConverter {
  constructor(externalUrl) {
    this.rawUrl = new URL(externalUrl);
  }

  convertUrlToLocalhostUrl(url, isAsset = false) {
    if (isAsset) {
      return url.replace(/\//g, '-');
    }

    return url.replace(/(\.|\/)/g, '-');
  }

  getLocalhostBaseUrl() {
    const { hostname } = this.rawUrl;

    return this.convertUrlToLocalhostUrl(hostname);
  }

  getLocalhostUrl() {
    const { hostname, pathname } = this.rawUrl;

    return this.convertUrlToLocalhostUrl(hostname + pathname);
  }

  getLocalhostHtmlFilename() {
    const { hostname, pathname } = this.rawUrl;
    const localhostHtmlFilePath = this.convertUrlToLocalhostUrl(hostname + pathname);

    return `${localhostHtmlFilePath}.html`;
  }

  getLocalhostAssetsFolder() {
    const localhostUrl = this.getLocalhostUrl();

    return `${localhostUrl}_files`;
  }

  getLocalHostAssetPath(assetUrl) {
    let assetUrlProcessed = assetUrl;
    if (/^(http:\/\/|https:\/\/)/.test(assetUrl)) {
      assetUrlProcessed = new URL(assetUrl).pathname;
    }
    const localhostAssetUrl = this.convertUrlToLocalhostUrl(assetUrlProcessed, true);
    const localhostAssetsFolder = this.getLocalhostAssetsFolder();
    const localhostBaseUrl = this.getLocalhostBaseUrl();
    return `${localhostAssetsFolder}/${localhostBaseUrl}${localhostAssetUrl}`;
  }
}

export default UrlConverter;

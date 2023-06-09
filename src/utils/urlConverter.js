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

  getOrigin() {
    return this.rawUrl.origin;
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
    const localhostAssetUrl = this.convertUrlToLocalhostUrl(assetUrl, true);
    const localhostAssetsFolder = this.getLocalhostAssetsFolder();
    const localhostBaseUrl = this.getLocalhostBaseUrl();
    return `${localhostAssetsFolder}/${localhostBaseUrl}${localhostAssetUrl}`;
  }
}

export default UrlConverter;

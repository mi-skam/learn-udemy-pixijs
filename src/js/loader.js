import * as LoaderConfig from './loader.config'

export class Loader {
  constructor(loader) {
    this.loader = loader;
    this.resources = LoaderConfig;

  }
  preload() {
    return new Promise((resolve) => {
      // load all resoures defined in LoaderConfig
      for (const k in this.resources) {
        this.loader.add(k, this.resources[k])
      }

      this.loader.load((loader, res) => {
        resolve();
      })
    })
  }
}
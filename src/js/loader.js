import * as LoaderConfig from './loader.config';
import { globals } from './globals';

export class Loader {
  constructor(loader) {
    this.loader = loader;
    this.resources = LoaderConfig;
  }
  preload() {
    return new Promise((resolve) => {
      // load all resoures defined in LoaderConfig
      for (const k in this.resources) {
        this.loader.add(k, this.resources[k]);
      }

      this.loader.load((loader, res) => {
        // store the loaded resources in the globals object
        globals.resources = res;
        resolve();
      });
    });
  }
}

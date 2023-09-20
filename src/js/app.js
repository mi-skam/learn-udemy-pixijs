import * as PIXI from 'pixi.js';
import { Loader } from './loader';

export class App {
  async run() {
    this.app = new PIXI.Application({ resizeTo: window });
    // adds a canvas element to the DOM
    document.body.appendChild(this.app.view);

    // load the ressources
    this.loader = new Loader(this.app.loader)
    await this.loader.preload();
    this.start()
  }

  start() {
    console.log('GAME starts.');
  }
}
import * as PIXI from 'pixi.js';
import { Loader } from './loader';
import { MainScene } from './main-scene';

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
    this.scene = new MainScene();
    // The container app.stage is created by default
    this.app.stage.addChild(this.scene.container);
  }
}
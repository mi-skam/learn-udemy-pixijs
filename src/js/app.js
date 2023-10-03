import * as PIXI from 'pixi.js';
import { Loader } from './loader';
import { MainScene } from './main-scene';
import { HandController } from './hand-controller';

export class App {
  async run() {
    this.app = new PIXI.Application({ resizeTo: window, transparent: true });
    // adds a canvas element to the DOM
    this.app.view.id = 'pixi-canvas';
    document.body.appendChild(this.app.view);

    // load the ressources
    this.loader = new Loader(this.app.loader);
    await this.loader.preload();
    this.start();
  }

  start() {
    this.scene = new MainScene();
    // The container app.stage is created by default
    this.app.stage.addChild(this.scene.container);
  }
}

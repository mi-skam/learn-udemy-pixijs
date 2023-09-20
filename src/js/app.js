import * as PIXI from 'pixi.js';

export class App {
  run() {
    this.app = new PIXI.Application({ resizeTo: window });
    // adds a canvas element to the DOM
    document.body.appendChild(this.app.view);
  }
}
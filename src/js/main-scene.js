import * as PIXI from 'pixi.js';
import { globals } from './globals';

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
  }

  createBackground() {
    this.bg = new PIXI.Sprite(globals.resources['bg'].texture);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;

    this.container.addChild(this.bg);

  }
}
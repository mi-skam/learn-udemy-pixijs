import * as PIXI from 'pixi.js';
import { globals } from './globals';
import { PuzzleGrid } from './puzzle-grid';
import { HandController } from './hand-controller';

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createPuzzleGrid();
    this.createHandGesture();
    // globals.resources.music.sound.play({ loop: true, volume: 0.1 });
  }

  createBackground() {
    this.bg = new PIXI.Sprite(globals.resources['bg'].texture);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }

  createPuzzleGrid() {
    const grid = new PuzzleGrid();
    this.container.addChild(grid.container);
  }

  createHandGesture() {
    const handController = new HandController();
    this.container.addChild(handController.sprite);
    handController.run();
  }
}

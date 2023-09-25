import * as PIXI from 'pixi.js';
import { globals } from './globals';
import { PuzzleGrid } from './puzzle-grid';

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createPuzzleGrid();
    globals.resources.music.sound.play({ loop: true, volume: 0.1 });
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
}

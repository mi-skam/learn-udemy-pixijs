import * as PIXI from 'pixi.js';
import { globals } from './globals';

export class PuzzlePiece {
  constructor(id, x, y) {
    this.sprite = new PIXI.Sprite(globals.resources[`p0${id}`].texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.99);
  }
}
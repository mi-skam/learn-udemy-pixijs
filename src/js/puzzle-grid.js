import * as PIXI from 'pixi.js';
import { PuzzleGridConfig } from './puzzle-grid.config';
import { PuzzlePiece } from './puzzle-piece';

export class PuzzleGrid {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.createPuzzlePieces();
  }

  createPuzzlePieces() {
    this.pieces = [];

    PuzzleGridConfig.forEach(({ id, x, y }) => {
      const piece = new PuzzlePiece(id, x, y);
      this.container.addChild(piece.sprite);
      this.pieces.push(piece);
    })
  }
}
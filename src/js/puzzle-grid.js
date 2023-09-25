import * as PIXI from 'pixi.js';
import { PuzzleGridConfig } from './puzzle-grid.config';
import { PuzzlePiece } from './puzzle-piece';

export class PuzzleGrid {
  constructor(toShuffle = true) {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    // enable sortableChildren to be able to sort the children by zIndex
    this.container.sortableChildren = true;
    this.toShuffle = toShuffle;
    this.createPuzzlePieces();
  }

  _shuffle(grid) {
    return grid.reduce((acc, curr, idx, grid) => {
      const randomIdx = Math.floor(Math.random() * grid.length);
      // swap the id's but not the rest of the object
      [grid[idx].id, grid[randomIdx].id] = [grid[randomIdx].id, grid[idx].id];
      return grid;
    }, [...grid])

  }

  createPuzzlePieces() {
    this.pieces = [];

    // randomize the puzzle pieces, if needed (default is true)
    const puzzleGrid = this.toShuffle ? this._shuffle(PuzzleGridConfig) : PuzzleGridConfig;

    puzzleGrid.forEach(({ id, x, y }) => {
      const piece = new PuzzlePiece(id, x, y);
      this.container.addChild(piece.sprite);
      this.pieces.push(piece);
    })
  }
}
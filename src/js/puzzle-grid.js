import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./puzzle-grid.config";
import { PuzzlePiece } from "./puzzle-piece";

export class PuzzleGrid {
  constructor(isRandom = true) {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    // enable sortableChildren to be able to sort the children by zIndex
    this.container.sortableChildren = true;
    this.createPuzzlePieces(isRandom);
  }

  _shuffle(grid) {
    return grid.reduce(
      (acc, curr, idx, grid) => {
        const randomIdx = Math.floor(Math.random() * grid.length);
        // swap the id's but not the rest of the object
        [grid[idx].id, grid[randomIdx].id] = [grid[randomIdx].id, grid[idx].id];
        return grid;
      },
      [...grid]
    );
  }

  createPuzzlePieces(isRandom) {
    this.pieces = [];

    // randomize the puzzle pieces, if needed (default is true)
    const puzzleGrid = isRandom
      ? this._shuffle(PuzzleGridConfig)
      : PuzzleGridConfig;

    puzzleGrid.forEach(({ id, x, y }) => {
      const piece = new PuzzlePiece(id, x, y);
      this.container.addChild(piece.sprite);
      this.pieces.push(piece);

      piece.on("dragend", () => this.onPieceDragend(piece));
    });
  }
  onPieceDragend(piece) {
    const pieceToReplace = this.pieces.find(
      (item) =>
        item !== piece &&
        piece.sprite.x >= item.left &&
        piece.sprite.x <= item.right &&
        piece.sprite.y >= item.top &&
        piece.sprite.y <= item.bottom
    );
    if (pieceToReplace) {
      const replaceField = pieceToReplace.field;
      pieceToReplace.setField(piece.field);
      piece.setField(replaceField);
      
    } else {
      piece.resetPosition();
    }
  }
}

import * as PIXI from 'pixi.js';
import { globals } from './globals';

export class PuzzlePiece {
  constructor(id, x, y) {
    this.sprite = new PIXI.Sprite(globals.resources[`p0${id}`].texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.99);

    // save the field position for later use
    this.field = { id, x, y }

    // by default elements are not interactive for performance reasons.
    this.setInteractive();
  }
  setInteractive() {
    this.sprite.interactive = true;
    this.sprite
      .on('pointerdown', this.onDragStart, this)
      .on('pointerup', this.onDragEnd, this)
      .on('pointerupoutside', this.onDragEnd, this)
      .on('pointermove', this.onDragMove, this);
  }
  onDragStart(e) {
    this.dragging = true;

    // saves the position of the touch/mouse on tap/click x
    this.touchPosition = {
      x: e.data.global.x,
      y: e.data.global.y
    }

    // raise the z-index of the element, otherwise it would be hidden by other elements
    this.sprite.zIndex = 1;
  }
  onDragEnd() {
    this.dragging = false;
    this.sprite.x = this.field.x;
    this.sprite.y = this.field.y;
    // reset the z-index
    this.sprite.zIndex = 0;
  }
  onDragMove(e) {
    if (!this.dragging) {
      return
    } else {

      const currentPosition = {
        x: e.data.global.x,
        y: e.data.global.y
      }

      const offset = {
        x: currentPosition.x - this.touchPosition.x,
        y: currentPosition.y - this.touchPosition.y
      }

      this.sprite.x = this.field.x + offset.x;
      this.sprite.y = this.field.y + offset.y;

    }

  }
}
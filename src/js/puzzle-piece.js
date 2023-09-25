import * as PIXI from "pixi.js";
import { globals } from "./globals";

export class PuzzlePiece extends PIXI.utils.EventEmitter {
  constructor(id, x, y) {
    super();
    this.sprite = new PIXI.Sprite(globals.resources[`p0${id}`].texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.99);

    // save the field position for later use
    this.field = { id, x, y };

    // by default elements are not interactive for performance reasons.
    this.setInteractive();
  }
  setInteractive() {
    this.sprite.interactive = true;
    this.sprite
      .on("pointerdown", this.onDragStart, this)
      .on("pointerup", this.onDragEnd, this)
      .on("pointerupoutside", this.onDragEnd, this)
      .on("pointermove", this.onDragMove, this);
  }
  onDragStart(e) {
    this.dragging = true;

    // saves the position of the touch/mouse on tap/click x
    this.touchPosition = {
      x: e.data.global.x,
      y: e.data.global.y,
    };
    // raise the z-index of the element, otherwise it would be hidden by other elements
    this.sprite.zIndex = 1;
  }
  onDragEnd() {
    this.dragging = false;
    // reset the z-index
    this.sprite.zIndex = 0;
    // emit a custom event, so the parent container can listen for it
    this.emit("dragend");
  }
  resetPosition() {
    this.sprite.x = this.field.x;
    this.sprite.y = this.field.y;
  }
  onDragMove(e) {
    if (!this.dragging) {
      return;
    } else {
      const currentPosition = {
        x: e.data.global.x,
        y: e.data.global.y,
      };

      const offset = {
        x: currentPosition.x - this.touchPosition.x,
        y: currentPosition.y - this.touchPosition.y,
      };

      this.sprite.x = this.field.x + offset.x;
      this.sprite.y = this.field.y + offset.y;
    }
  }
  get left() {
    return this.sprite.x - this.sprite.width / 2;
  }
  get right() {
    return this.sprite.x + this.sprite.width / 2;
  }
  get top() {
    return this.sprite.y - this.sprite.height / 2;
  }
  get bottom() {
    return this.sprite.y + this.sprite.height / 2;
  }
  setField(field) {
    this.field = field;
    this.resetPosition();
  }
}

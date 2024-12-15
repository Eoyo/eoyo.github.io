import { Subject } from "rxjs";

/* eslint-disable @typescript-eslint/ban-ts-comment */
export abstract class Drawable {
  abstract draw(ctx: CanvasRenderingContext2D): void;
  destroy() {}
}
export interface Position {
  x: number;
  y: number;
}

export abstract class PositionDrawable extends Drawable {
  private _x: number;
  private _y: number;
  readonly sub: Subject<Readonly<Position>> = new Subject();
  constructor(x: number, y: number) {
    super();
    this._x = x;
    this._y = y;
    this.sub.next(this.getPosition());
    this.sub.subscribe((position) => {
      this._x = position.x;
      this._y = position.y;
    });
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  destroy() {
    this.sub.unsubscribe();
  }
  setByPosition(position: Position) {
    this.setPosition(position.x, position.y);
  }
  setPosition(x: number, y: number) {
    this.sub.next({ x, y });
  }
  getPosition(): Position {
    return { x: this._x, y: this._y };
  }
}

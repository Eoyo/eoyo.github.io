import { DEFAULT_STYLE } from "../config/default-style";
import { GeoPoint } from "./geoPoint";
import { Drawable } from "./interfaces";

export class GeoLinear extends Drawable {
  private _middlePoint: GeoPoint | null = null;
  constructor(private start: GeoPoint, private end: GeoPoint) {
    super();
  }
  get middlePoint() {
    if (!this._middlePoint) {
      this._middlePoint = GeoPoint.fromMiddleOfTwoPoints(this.start, this.end);
    }
    return this._middlePoint;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.start.draw(ctx);
    this.end.draw(ctx);

    ctx.strokeStyle = DEFAULT_STYLE.line.color;
    ctx.lineWidth = DEFAULT_STYLE.line.width;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
  destroy() {
    this.start.destroy();
    this.end.destroy();
  }
}

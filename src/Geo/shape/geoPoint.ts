import { DEFAULT_STYLE } from "../config/default-style";
import { PositionDrawable } from "./interfaces";
import { GeoText } from "./geoText";
import * as Rx from "rxjs";

export class GeoPoint extends PositionDrawable {
  private lable: GeoText | null = null;

  static fromMiddleOfTwoPoints(start: GeoPoint, end: GeoPoint) {
    const p = new GeoPoint((start.x + end.x) / 2, (start.y + end.y) / 2);
    Rx.combineLatest([start.sub, end.sub])
      .pipe(
        Rx.map(([start, end]) => ({
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2,
        }))
      )
      .subscribe(p.sub);
    return p;
  }

  constructor(
    x: number,
    y: number,
    label?: string,
    private radius: number = DEFAULT_STYLE.point.radius
  ) {
    super(x, y);
    if (label) {
      this.lable = new GeoText(
        label,
        x + DEFAULT_STYLE.point.labelOffset,
        y + DEFAULT_STYLE.point.labelOffset
      );
    }
  }
  destroy() {
    super.destroy();
    this.lable?.destroy();
  }
  setPosition(x: number, y: number) {
    super.setPosition(x, y);
    if (this.lable) {
      this.lable.setPosition(
        x + DEFAULT_STYLE.point.labelOffset,
        y + DEFAULT_STYLE.point.labelOffset
      );
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = DEFAULT_STYLE.point.bgColor;
    ctx.strokeStyle = DEFAULT_STYLE.point.borderColor;
    ctx.lineWidth = DEFAULT_STYLE.point.borderWidth;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (this.lable) {
      this.lable.draw(ctx);
    }
  }
}

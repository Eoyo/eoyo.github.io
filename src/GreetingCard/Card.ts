import { Drawable } from "./type";
import { ValueKeyframe } from "./value-keyframe";

export class Card implements Drawable {
  private x: number = 0;
  private y: number = 0;
  private offsetX: number = 0;
  private offsetY: number = -50;
  private width: number = 350;
  private height: number = 900;
  private bgColor: string = "rgb(200, 120, 0)";
  private light: boolean = false;
  private skew: number = 0.5;
  private skewWidth: number = 1.5;
  private skewHeight: number = 0.6;
  private widthChange = new ValueKeyframe(
    (this.width / 2) * this.skewWidth,
    (this.width / 2) * 1.1,
    3000
  );
  private heightChange = new ValueKeyframe(
    (this.height / 2) * this.skew,
    (-this.height / 2) * 0.8,
    3000
  );
  toggleLight(light: boolean) {
    this.light = light;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  private t = 0;
  addT(dt: number) {
    this.t += dt;
    if (this.t > 3000) {
      this.t = 0;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x + this.offsetX, this.y + this.offsetY);

    ctx.moveTo(-this.width / 2, 0);
    ctx.lineTo(this.width / 2, 0);
    ctx.lineTo(
      (this.width / 2) * this.skewWidth,
      (this.height / 2) * this.skew
    );
    ctx.lineTo(
      (-this.width / 2) * this.skewWidth,
      (this.height / 2) * this.skew
    );
    ctx.closePath();
    ctx.fillStyle = this.bgColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-this.width / 2, 0);
    ctx.lineTo(this.width / 2, 0);
    ctx.lineTo(this.widthChange.get(this.t), this.heightChange.get(this.t));
    ctx.lineTo(-this.widthChange.get(this.t), this.heightChange.get(this.t));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

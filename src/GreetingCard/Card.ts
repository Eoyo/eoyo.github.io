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
  private duration: number = 3000;
  private widthChange = new ValueKeyframe(
    (this.width / 2) * this.skewWidth,
    (this.width / 2) * 1.1,
    this.duration
  );
  private heightChange = new ValueKeyframe(
    (this.height / 2) * this.skew,
    (-this.height / 2) * 0.8,
    this.duration
  );
  toggleLight(light: boolean) {
    this.light = light;
    if (light) {
      this.selectedIndex += 1;
      this.selectedIndex %= this.textPool.length;
    }
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  private t = 0;
  setT(t: number) {
    this.t = t;
  }
  addT(dt: number) {
    this.t += dt;
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
    if (this.heightChange.get(this.t) < 0) {
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, 0);
      ctx.lineTo(this.width / 2, 0);
      ctx.lineTo(this.widthChange.get(this.t), this.heightChange.get(this.t));
      ctx.lineTo(-this.widthChange.get(this.t), this.heightChange.get(this.t));
      ctx.closePath();
      ctx.fill();
    }
    if (this.t > this.duration) {
      this.drawText(ctx);
    }

    ctx.restore();
  }
  private textDuration = 300;
  private textAlpha = new ValueKeyframe(0.2, 1, this.textDuration);
  private pickTime(t: number) {
    const k = t % (this.textDuration * 2);
    if (k > this.textDuration) {
      return this.textDuration * 2 - k;
    } else {
      return k;
    }
  }
  textPool = [
    "祝你开开心心每一天",
    "黄金蛋糕祝你走狗屎运",
    "本蛋糕已经开光请放心许愿",
    undefined,
    "有bug是正常的",
    null,
  ];
  selectedIndex = -1;
  get selectedText() {
    return this.textPool[this.selectedIndex];
  }
  drawText(ctx: CanvasRenderingContext2D) {
    if (!this.light) return;
    ctx.save();
    const text = this.selectedText + "";
    ctx.font = "48px serif";
    ctx.fillStyle = `rgba(255, 215, 85, ${this.textAlpha.get(
      this.pickTime(this.t)
    )}`;
    ctx.shadowColor = "rgb(255, 215, 85)";
    ctx.shadowBlur = 10;
    const size = ctx.measureText(text);
    ctx.fillText(text, -size.width / 2, (this.height / 2) * this.skew - 20);
    ctx.restore();
  }
  drawAfter(ctx: CanvasRenderingContext2D): void {
    if (this.heightChange.get(this.t) >= 0) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x + this.offsetX, this.y + this.offsetY);
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, 0);
      ctx.lineTo(this.width / 2, 0);
      ctx.lineTo(this.widthChange.get(this.t), this.heightChange.get(this.t));
      ctx.lineTo(-this.widthChange.get(this.t), this.heightChange.get(this.t));
      ctx.closePath();
      ctx.fillStyle = this.bgColor;
      ctx.fill();
      ctx.fillStyle = "rgb(219, 143, 0)";
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, 1);
      ctx.lineTo(this.width / 2, 1);
      ctx.lineTo(this.width / 2, -100);
      ctx.lineTo(-this.width / 2, -100);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
}

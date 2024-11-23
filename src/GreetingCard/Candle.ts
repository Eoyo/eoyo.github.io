import { ColorKeyframe } from "./color-keyframe";
import { Drawable } from "./type";
import { ValueKeyframe } from "./value-keyframe";

class CandleFire implements Drawable {
  private x: number = 0;
  private y: number = 0;
  private width: number = 5;
  private height: number = 20;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private duration: number = 3000;
  private fireColor = new ColorKeyframe(
    [254, 248, 97, 0.5],
    [255, 50, 0, 0.1],
    this.duration
  );
  private translateY = new ValueKeyframe(0, -20, this.duration);
  private sizeScale = new ValueKeyframe(1, 0, this.duration);
  private shadowSize = new ValueKeyframe(20, 10, this.duration);
  getDuration() {
    return this.duration;
  }
  getT() {
    return this.t;
  }
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  setOffset(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
  private t: number = 0;
  setT(t: number) {
    this.t = t;
  }
  addT(t: number) {
    this.t += t;
    if (this.t > this.duration) {
      this.t = 0;
    }
  }
  private light: boolean = false;
  toggleLight(light: boolean) {
    this.light = light;
  }
  private showShadow: boolean = true;
  setShowShadow(showShadow: boolean) {
    this.showShadow = showShadow;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const x = this.x + this.offsetX;
    const y = this.y + this.offsetY;
    ctx.save();
    ctx.fillStyle = this.fireColor.get(this.t);

    if (this.light && this.showShadow) {
      ctx.save();
      ctx.shadowColor = "rgba(248, 233, 209)";
      ctx.shadowBlur = this.shadowSize.get(this.t);
      ctx.beginPath();
      ctx.ellipse(
        x,
        y + this.translateY.get(this.t),
        this.width * this.sizeScale.get(this.t),
        this.height * this.sizeScale.get(this.t),
        0,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fillStyle = `rgba(248, 233, 209, 0.2)`;
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.ellipse(
      x,
      y + this.translateY.get(this.t),
      this.width * this.sizeScale.get(this.t),
      this.height * this.sizeScale.get(this.t),
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export class Candle implements Drawable {
  private fires: CandleFire[] = [];
  private x: number = 0;
  private y: number = 0;
  private offsetY: number = -200;
  private light: boolean = false;
  constructor() {
    const count = 5;
    for (let i = 0; i < count; i++) {
      const fire = new CandleFire();
      fire.setT((i * fire.getDuration()) / count);
      fire.setOffset(0, this.offsetY);
      this.fires.push(fire);
    }
  }
  toggleLight(light: boolean) {
    this.light = light;
    this.fires.forEach((fire) => {
      fire.toggleLight(light);
    });
  }
  addT(t: number) {
    this.fires.forEach((fire) => {
      fire.addT(t);
    });
    this.fires.sort((a, b) => a.getT() - b.getT());
    this.fires[0].setShowShadow(true);
    this.fires.slice(1).forEach((fire) => {
      fire.setShowShadow(false);
    });
  }
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.fires.forEach((fire) => {
      fire.setPosition(this.x, this.y);
    });
  }
  private width: number = 15;
  private height: number = 35;
  private radiusY: number = this.width / 4;
  private color: string = "rgb(255, 232, 207)";
  private topColor: string = "rgb(255, 226, 195)";
  draw(ctx: CanvasRenderingContext2D): void {
    // 绘制蜡烛主体
    ctx.save();
    ctx.translate(this.x, this.y + this.offsetY + this.height / 2 + 40);
    ctx.shadowColor = "rgba(248, 233, 209)";
    // 底部椭圆
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // 蜡烛柱体矩形
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();

    // 顶部椭圆
    ctx.beginPath();
    ctx.ellipse(
      0,
      -this.height,
      this.width / 2,
      this.radiusY,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.topColor;
    ctx.fill();

    // 顶部灯芯
    ctx.beginPath();
    ctx.rect(-1, -this.height - 8, 2, 8);
    ctx.fillStyle = "rgb(44,33,22)";
    ctx.fill();

    ctx.restore();

    if (this.light) {
      this.fires.forEach((fire) => {
        fire.draw(ctx);
      });
    }
  }
}

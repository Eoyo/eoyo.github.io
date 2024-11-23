import { Drawable } from "./type";
import { randomRange } from "./utils";

class Start {
  x: number;
  y: number;
  r: number;
  movingRate: number;
  angle: number;
  static createRandomStart(
    startX: number,
    endX: number,
    startY: number,
    endY: number
  ) {
    return new Start(
      randomRange(startX, endX),
      randomRange(startY, endY),
      randomRange(1, 3),
      randomRange(0, 0),
      Math.random() * Math.PI * 2
    );
  }
  constructor(
    x: number,
    y: number,
    r: number,
    movingRate: number,
    angle: number
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.movingRate = movingRate;
    this.angle = angle;
  }
  scaling(x: number, y: number, k: number) {
    const dx = this.x - x;
    const dy = this.y - y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length > 0) {
      this.x += (dx / length) * k;
      this.y += (dy / length) * k;
    }
  }
  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
  update() {
    this.angle = this.angle + randomRange(-0.1, 0.1);
    this.x += Math.cos(this.angle) * this.movingRate;
    this.y += Math.sin(this.angle) * this.movingRate;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class StartBg implements Drawable {
  starts: Start[] = [];
  count: number;
  ctx: CanvasRenderingContext2D;
  x: number = 0;
  y: number = 0;
  private bgColor = "rgb(219, 143, 0)";
  private startColor = "#ffd700";
  private light: boolean = false;
  toggleLight(light: boolean) {
    this.light = light;
  }
  constructor(ctx: CanvasRenderingContext2D, count: number) {
    this.ctx = ctx;
    this.count = count;
  }
  setPosition(x: number, y: number): void {
    this.starts.forEach((start) => {
      start.move(x - this.x, y - this.y);
    });
    this.x = x;
    this.y = y;
    this.createStarts(this.count);
  }
  createStarts(count: number) {
    this.count = count;
    for (let i = this.starts.length; i < count; i++) {
      this.starts.push(
        Start.createRandomStart(
          0,
          this.ctx.canvas.width,
          0,
          this.ctx.canvas.height
        )
      );
    }
    if (this.starts.length > count) {
      this.starts.slice(0, count);
    }
  }
  scaling: boolean = false;
  scalingX: number = 0;
  scalingY: number = 0;
  scalingAt(x: number, y: number) {
    this.scaling = true;
    this.scalingX = x;
    this.scalingY = y;
  }
  cancelScaling() {
    this.scaling = false;
  }
  clearNotInRectStart(width: number, height: number) {
    this.starts = this.starts.filter((start) => {
      return start.x > 0 && start.x < width && start.y > 0 && start.y < height;
    });
  }
  fullfillTo(sx: number, ex: number, sy: number, ey: number) {
    while (this.starts.length < this.count) {
      this.starts.push(Start.createRandomStart(sx, ex, sy, ey));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = this.startColor;

    if (this.scaling) {
      this.clearNotInRectStart(ctx.canvas.width, ctx.canvas.height);
      this.starts.forEach((start) => {
        start.scaling(this.scalingX, this.scalingY, 0.9);
      });
      this.fullfillTo(
        this.scalingX - 100,
        this.scalingX + 100,
        this.scalingY - 100,
        this.scalingY + 100
      );
    }
    if (this.light) {
      this.starts.forEach((start) => {
        start.update();
        start.draw(ctx);
      });
    }
  }
}

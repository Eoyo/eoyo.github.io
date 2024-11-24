import { Drawable } from "./type";

export class SectorLine implements Drawable {
  private x: number;
  private y: number;
  private startAngle: number;
  private endAngle: number;
  private r1: number;
  private r2: number;
  color: string | CanvasGradient | CanvasPattern = "";
  light: boolean = false;
  toggleLight(light: boolean) {
    this.light = light;
  }
  constructor(
    x: number,
    y: number,
    startAngle: number,
    endAngle: number,
    r1: number,
    r2: number
  ) {
    this.x = x;
    this.y = y;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.r1 = r1;
    this.r2 = r2;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  setAngle(startAngle: number, endAngle: number) {
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowColor = "rgb(255, 215, 85)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    let x1 = this.x + this.r1 * Math.cos(this.startAngle);
    let y1 = this.y + this.r1 * Math.sin(this.startAngle);
    ctx.moveTo(x1, y1);
    let x2 = this.x + this.r1 * Math.cos(this.endAngle);
    let y2 = this.y + this.r1 * Math.sin(this.endAngle);
    ctx.lineTo(x2, y2);
    // ctx.arcTo(x1, y1, x2, y2, this.r1);
    x1 = x2;
    y1 = y2;
    x2 = this.x + this.r2 * Math.cos(this.endAngle);
    y2 = this.y + this.r2 * Math.sin(this.endAngle);
    ctx.lineTo(x2, y2);
    x1 = x2;
    y1 = y2;
    x2 = this.x + this.r2 * Math.cos(this.startAngle);
    y2 = this.y + this.r2 * Math.sin(this.startAngle);
    ctx.lineTo(x2, y2);
    // ctx.arcTo(x1, y1, x2, y2, this.r2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

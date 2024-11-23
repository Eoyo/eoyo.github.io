import { SectorLine } from "./SectorLine";
import { Drawable } from "./type";

export class GoldenBg implements Drawable {
  private x: number = 0;
  private y: number = 0;
  private count: number = 7;
  private length: number = 1000;
  private size: number = 50;
  private sectorLines: SectorLine[] = [];
  private offsetAngle: number = 0;
  private light: boolean = false;
  toggleLight(light: boolean) {
    this.light = light;
  }
  constructor() {
    this.generateSectorLines();
  }

  setCount(count: number) {
    this.count = count;
    this.generateSectorLines();
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    for (const sectorLine of this.sectorLines) {
      sectorLine.setPosition(x, y);
    }
  }

  rotate(angle: number) {
    this.offsetAngle += angle;
    this.generateSectorLines();
  }

  private generateSectorLines() {
    this.sectorLines = [];
    const dcount = 2 * this.count;
    const deltaAngle = Math.PI / dcount;
    const deltaAngle2 = deltaAngle * 2;
    const offsetCount = (this.offsetAngle / deltaAngle2) | 0;
    let offsetAngle = this.offsetAngle - offsetCount * deltaAngle2;
    if (offsetAngle < 0) offsetAngle += deltaAngle2;

    let hasDash = offsetAngle < deltaAngle;
    let angle = -Math.PI - offsetAngle;
    if (!hasDash) angle += deltaAngle;
    while (angle < 0) {
      if (hasDash) {
        this.sectorLines.push(
          new SectorLine(
            this.x,
            this.y,
            Math.max(-Math.PI, angle),
            Math.min(0, angle + deltaAngle),
            this.size,
            this.size + this.length
          )
        );
      }
      angle += deltaAngle;
      hasDash = !hasDash;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size + this.length
      );
      gradient.addColorStop(0, "rgba(255, 215, 85, 0.5)"); // 中心亮金色
      gradient.addColorStop(1, "rgba(255, 215, 0, 0.5)"); // 边缘暗金色
      for (const sectorLine of this.sectorLines) {
        sectorLine.color = gradient;
      }
    }

    // draw circle
    // 绘制shadow
    ctx.save();
    ctx.shadowColor = "rgb(255, 215, 85)";
    ctx.shadowBlur = 100;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();

    if (this.light) {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size + this.length
      );
      gradient.addColorStop(0, "rgb(255, 215, 85)"); // 中心亮金色
      gradient.addColorStop(1, "rgba(255, 215, 0)"); // 边缘暗金色
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = "rgba(255, 215, 0)";
    }
    ctx.fill();
    ctx.restore();

    if (this.light) {
      for (const sectorLine of this.sectorLines) {
        sectorLine.draw(ctx);
      }
    }
  }
}

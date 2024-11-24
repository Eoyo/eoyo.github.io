import { Drawable } from "./type";
import { randomRange } from "./utils";
import { ValueKeyframe } from "./value-keyframe";

export class CakeFoot implements Drawable {
  private x: number = 0;
  private y: number = 0;
  static width: number = 10;
  static height: number = 46;
  static color: string = "rgb(185,125,9)";
  static colorLight: string = "rgb(205, 160, 10)";
  private light: boolean = false;
  private k = 0;
  setK(k: number) {
    this.k = k;
  }
  toggleLight(light: boolean) {
    this.light = light;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getY() {
    return this.y;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.light) {
      ctx.shadowColor = "rgb(255, 215, 85)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = CakeFoot.color;
    } else {
      ctx.fillStyle = "#666";
    }
    ctx.beginPath();
    ctx.moveTo(-CakeFoot.width / 2, 0);
    ctx.lineTo(CakeFoot.width / 2, 0);
    ctx.lineTo(CakeFoot.width / 2, CakeFoot.height * this.k);
    ctx.lineTo(-CakeFoot.width / 2, CakeFoot.height * this.k);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export class CakeBee implements Drawable {
  private x: number = 0;
  private y: number = 0;
  private skew: number = 0.5;
  private radius: number = 3;
  private color: string;
  light: boolean = false;
  toggleLight(light: boolean) {
    this.light = light;
  }
  static beeColor: string[] = [
    //
    // "blue",
    "red",
    // "yellow",
    "green",
    "white",
  ];
  static createBee(x: number, y: number) {
    return new CakeBee(x, y, CakeBee.beeColor[(Math.random() * 5) | 0]);
  }
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y * this.skew);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.radius, this.radius * this.skew, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

export class CakeLayer implements Drawable {
  private x: number = 0;
  private y: number = 0;
  private radius: number = 100;
  private skew: number = 0.5;
  private color: string = "rgb(255, 215, 85)";
  private colorDark: string = "rgb(245, 195, 45)";
  private feet: CakeFoot[] = [];
  private bees: CakeBee[] = [];
  private offsetX: number = 0;
  private offsetY: number = 0;
  static baseOffsetY: number = -2 * CakeFoot.height;
  static toOffsetY: number = 0;
  private light: boolean = false;
  private t = 0;
  private k = new ValueKeyframe(0, 1, 3000);
  setT(t: number) {
    this.t = t;
  }
  addT(dt: number) {
    this.t += dt;
  }
  toggleLight(light: boolean) {
    this.light = light;
    this.bees.forEach((bee) => {
      bee.toggleLight(light);
    });
    this.feet.forEach((foot) => {
      foot.toggleLight(light);
    });
  }
  setOffset(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
  setRadius(radius: number) {
    this.radius = radius;
  }
  setSkew(skew: number) {
    this.skew = skew;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    const count = (2.5 * this.radius) / CakeFoot.width;
    const per = Math.PI / count;

    this.feet = [];
    for (let i = 0; i <= count; i++) {
      const foot = new CakeFoot();
      const x = Math.cos(per * i) * this.radius;
      const y = Math.sin(per * i) * this.radius * this.skew;
      foot.setPosition(x, y);
      this.feet.push(foot);
    }
    this.feet.sort((a, b) => a.getY() - b.getY());

    this.bees = [];
    const bcount = count * 3;
    for (let i = 0; i < bcount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = randomRange(this.radius / 2, this.radius);
      const bee = CakeBee.createBee(r * Math.cos(angle), r * Math.sin(angle));
      this.bees.push(bee);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const ck = this.k.get(this.t);
    ctx.translate(this.x + this.offsetX * ck, this.y + this.offsetY * ck);

    const r = this.radius + CakeFoot.width / 2;
    ctx.beginPath();
    ctx.ellipse(0, CakeFoot.height * ck, r, r * this.skew, 0, 0, 2 * Math.PI);

    if (this.light) {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);

      gradient.addColorStop(0, this.color); // 中心亮金色
      gradient.addColorStop(0.9, this.colorDark); // 边缘暗金色
      gradient.addColorStop(1, this.colorDark); // 边缘暗金色

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = "#bbb";
    }
    ctx.fill();

    this.feet.forEach((foot) => {
      foot.setK(ck);
      foot.draw(ctx);
    });

    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * this.skew, 0, 0, 2 * Math.PI);

    if (this.light) {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);

      gradient.addColorStop(0, this.color); // 中心亮金色
      gradient.addColorStop(0.9, this.colorDark); // 边缘暗金色
      gradient.addColorStop(1, this.colorDark); // 边缘暗金色

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = "#999";
    }
    ctx.fill();
    ctx.strokeStyle = CakeFoot.color;
    ctx.stroke();

    this.bees.forEach((bee) => {
      bee.draw(ctx);
    });

    ctx.restore();
  }
}

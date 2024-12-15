import { Drawable } from "./shape/interfaces";
import { GeoPoint } from "./shape/geoPoint";
import { GeoLinear } from "./shape/geoLinear";
import { AnimationOptions, animate } from "popmotion";
export class GeoBoard {
  items: Drawable[] = [];
  constructor(private ctx: CanvasRenderingContext2D) {}
  animations: AnimationOptions<number>[] = [];
  private animationsStop: (() => void)[] = [];
  init() {
    const p1 = new GeoPoint(100, 100, "A");
    const p2 = new GeoPoint(200, 200, "B");
    const line1 = new GeoLinear(p1, p2);
    this.items.push(line1, line1.middlePoint);
    this.animations.push(
      {
        from: 0.3,
        to: 1,
        duration: 1000,
        repeat: Infinity,
        repeatType: "mirror",
        onUpdate: (v) => {
          p2.setPosition(200 * v, 200 * v * v);
          this.draw();
        },
      },
      {
        from: 0.3,
        to: 1,
        duration: 1000,
        repeat: Infinity,
        repeatType: "mirror",
        onUpdate: (v) => {
          p1.setPosition(100 * v * v, 100 * Math.sin(v * Math.PI));
          this.draw();
        },
      }
    );
  }
  start() {
    this.animationsStop = this.animations.map(
      (animation) => animate(animation).stop
    );
  }
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  destory() {
    this.items.forEach((item) => {
      item.destroy();
    });
    this.animationsStop.forEach((stop) => {
      stop();
    });
  }
  draw() {
    this.ctx.save();
    this.clear();
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.items.forEach((item) => {
      item.draw(this.ctx);
    });
    this.ctx.restore();
  }
}

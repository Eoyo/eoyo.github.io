import { keyframes, Animation } from "popmotion";

export class ColorKeyframe {
  private r: Animation<number | string>;
  private g: Animation<number | string>;
  private b: Animation<number | string>;
  private a: Animation<number | string>;
  constructor(
    start: [number, number, number, number],
    end: [number, number, number, number],
    duration: number
  ) {
    this.r = keyframes({
      from: start[0],
      to: end[0],
      duration,
    });
    this.g = keyframes({
      from: start[1],
      to: end[1],
      duration,
    });
    this.b = keyframes({
      from: start[2],
      to: end[2],
      duration,
    });
    this.a = keyframes({
      from: start[3],
      to: end[3],
      duration,
    });
  }

  get(t: number) {
    return `rgba(${this.r.next(t).value}, ${this.g.next(t).value}, ${
      this.b.next(t).value
    }, ${this.a.next(t).value})`;
  }
}

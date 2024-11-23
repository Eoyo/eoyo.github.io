import { keyframes, Animation } from "popmotion";

export class ValueKeyframe {
  private value: Animation<number | string>;
  constructor(start: number, end: number, duration: number) {
    this.value = keyframes({
      from: start,
      to: end,
      duration,
    });
  }

  get(t: number) {
    return this.value.next(t).value as number;
  }
}

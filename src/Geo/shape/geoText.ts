import { PositionDrawable } from "./interfaces";

export class GeoText extends PositionDrawable {
  constructor(private text: string, x: number, y: number) {
    super(x, y);
  }
  setText(text: string) {
    this.text = text;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = "16px Arial";
    ctx.fillText(this.text, this.x, this.y);
  }
}

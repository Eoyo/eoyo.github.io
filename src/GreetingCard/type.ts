export interface Drawable {
  toggleLight(light: boolean): void;
  draw(ctx: CanvasRenderingContext2D): void;
  drawAfter?(ctx: CanvasRenderingContext2D): void;
  setPosition(x: number, y: number): void;
}

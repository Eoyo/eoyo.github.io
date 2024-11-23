import { Card } from "./Card";
import { GoldenBg } from "./GoldenBg";
import { StartBg } from "./StartBg";
import "./index.less";
import { useEffect, useRef, useState } from "react";
import { Drawable } from "./type";
import { Candle } from "./Candle";
import { CakeFoot, CakeLayer } from "./Cake";

export function GreetingCard() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawable = useRef<Drawable[]>([]);

  useEffect(() => {
    const ctx = ref.current!.getContext("2d")!;
    const startsNet = new StartBg(ctx, 100);
    const card = new Card();
    const goldenBg = new GoldenBg();
    const candle = new Candle();

    CakeLayer.toOffsetY = CakeLayer.baseOffsetY + 2 * CakeFoot.height;
    const cakeLaye1 = new CakeLayer();
    cakeLaye1.setOffset(0, CakeLayer.baseOffsetY - CakeFoot.height);
    cakeLaye1.setRadius(30);
    const cakeLaye2 = new CakeLayer();
    cakeLaye2.setOffset(0, CakeLayer.baseOffsetY);
    cakeLaye2.setRadius(60);
    const cakeLaye3 = new CakeLayer();
    cakeLaye3.setOffset(0, CakeLayer.baseOffsetY + CakeFoot.height);
    cakeLaye3.setRadius(90);
    const cakeLaye4 = new CakeLayer();
    cakeLaye4.setOffset(0, CakeLayer.baseOffsetY + 2 * CakeFoot.height);
    cakeLaye4.setRadius(120);

    drawable.current = [
      //
      startsNet,
      card,
      goldenBg,
      cakeLaye4,
      cakeLaye3,
      cakeLaye2,
      cakeLaye1,
      candle,
    ];
    let animationId = requestAnimationFrame(function doAnimation() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      startsNet.scalingAt(ctx.canvas.width / 2, ctx.canvas.height / 2);
      goldenBg.rotate(0.001);
      candle.addT(16);
      card.addT(16);
      cakeLaye1.addT(16);
      cakeLaye2.addT(16);
      cakeLaye3.addT(16);
      cakeLaye4.addT(16);
      drawable.current.forEach((drawable) => {
        drawable.draw(ctx);
      });
      animationId = requestAnimationFrame(doAnimation);
    });
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      ref.current.width = ref.current.clientWidth;
      ref.current.height = ref.current.clientHeight;
      drawable.current.forEach((drawable) => {
        drawable.setPosition(ref.current!.width / 2, ref.current!.height / 2);
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    drawable.current.forEach((drawable) => {
      drawable.toggleLight(selected);
    });
  }, [selected]);
  return (
    <canvas
      className={`greeting-card ${selected ? "selected" : ""}`}
      onClick={() => setSelected(!selected)}
      ref={ref}
    ></canvas>
  );
}

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
    let lastTime = Date.now();
    let animationId = requestAnimationFrame(function doAnimation() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      startsNet.scalingAt(ctx.canvas.width / 2, ctx.canvas.height / 2);
      goldenBg.rotate(0.001);
      const nowTime = Date.now();
      const diffTime = nowTime - lastTime;
      lastTime = nowTime;
      if (stateRef.current?.open) {
        candle.addT(diffTime);
        card.addT(diffTime);
        cakeLaye1.addT(diffTime);
        cakeLaye2.addT(diffTime);
        cakeLaye3.addT(diffTime);
        cakeLaye4.addT(diffTime);
      } else {
        candle.setT(0);
        card.setT(0);
        cakeLaye1.setT(0);
        cakeLaye2.setT(0);
        cakeLaye3.setT(0);
        cakeLaye4.setT(0);
      }
      drawable.current.forEach((drawable) => {
        drawable.draw(ctx);
      });
      drawable.current.forEach((drawable) => {
        if (drawable.drawAfter) {
          drawable.drawAfter(ctx);
        }
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
  const [open, setOpen] = useState(false);
  const [lighting, setLighting] = useState(false);
  const stateRef = useRef<{
    open: boolean;
    lighting: boolean;
    hasOpened: boolean;
  }>({ open, lighting, hasOpened: false });
  stateRef.current.open = open;
  stateRef.current.lighting = lighting;
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        setLighting(true);
        stateRef.current.hasOpened = true;
      }, 3000);
      return () => {
        clearTimeout(id);
      };
    } else {
      setLighting(false);
    }
  }, [open]);
  useEffect(() => {
    drawable.current.forEach((d) => {
      d.toggleLight(lighting);
    });
  }, [lighting]);
  return (
    <canvas
      className={`greeting-card`}
      onClick={() => {
        if (!open && !lighting) {
          setOpen(true);
        }
        if (open && stateRef.current.hasOpened) {
          setLighting(!lighting);
        }
      }}
      ref={ref}
    ></canvas>
  );
}

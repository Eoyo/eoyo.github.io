import { GeoBoard } from "./GeoBoard";
import "./index.less";
import { useEffect, useRef } from "react";

export function Geo() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      ref.current.width = ref.current.clientWidth * window.devicePixelRatio;
      ref.current.height = ref.current.clientHeight * window.devicePixelRatio;
      geoBoard.draw();
    };
    const geoBoard = new GeoBoard(ref.current!.getContext("2d")!);
    geoBoard.init();
    handleResize();
    geoBoard.start();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      geoBoard.destory();
    };
  }, []);
  return <canvas className={`geo-board`} ref={ref}></canvas>;
}

import { ChessBoard } from "./ChessBoard";
import { useEffect, useState } from "react";
import style from "./index.module.less";

export function FiveGame() {
  const [table, setTable] = useState(
    Array(16)
      .fill(0)
      .map(() => Array(16).fill(0))
  );

  const [isWhite, setIsWhite] = useState(true);
  const [lastSelected, setLastSelected] = useState<[number, number]>([-1, -1]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const boardSize = Math.min(windowSize.width, windowSize.height) - 40;

  return (
    <div className={style.container}>
      <ChessBoard
        size={boardSize}
        selectedTable={table}
        lastSelected={lastSelected}
        onSelect={(i, j) => {
          if (table[i][j] !== 0) return;
          const newTable = table.map((row) => [...row]);
          newTable[i][j] = isWhite ? 1 : 2;
          setTable(newTable);
          setIsWhite(!isWhite);
          setLastSelected([i, j]);
        }}
      />
    </div>
  );
}

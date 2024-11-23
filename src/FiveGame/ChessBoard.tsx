import style from "./ChessBoard.module.less";

export function ChessBoard(props: {
  size: number; // px
  selectedTable: number[][];
  lastSelected: [number, number];
  onSelect(i: number, j: number): void;
}) {
  const pieceSize = (props.size / (props.selectedTable.length || 1)) * 0.8;
  const chessCellSize = props.size / (props.selectedTable.length || 1);

  return (
    <div className={style.chessBoard}>
      <table className={style.bigtable} border={1} cellSpacing={0}>
        {props.selectedTable.slice(0, -1).map((row, i) => (
          <tr key={i} style={{ height: chessCellSize }}>
            {row.slice(0, -1).map((_, j) => (
              <td key={j} style={{ width: chessCellSize }}></td>
            ))}
          </tr>
        ))}
      </table>
      <>
        {props.selectedTable
          .map((row, i) =>
            row.map((cell, j) => {
              const lastOne =
                i === props.lastSelected[0] && j === props.lastSelected[1];
              return (
                <div
                  key={`${i}-${j}`}
                  className={`${style.piece} ${
                    [style.empty, style.white, style.black][cell]
                  } ${lastOne ? style.pieceLastOne : ""}`}
                  onClick={() => props.onSelect(i, j)}
                  style={{
                    left: j * chessCellSize - pieceSize / 2 + 1,
                    top: i * chessCellSize - pieceSize / 2 + 1,
                    width: pieceSize,
                    height: pieceSize,
                  }}
                >
                  {lastOne && <div className={style.pieceLastOneInner} />}
                </div>
              );
            })
          )
          .reduce((all, one: JSX.Element[]) => {
            return all.concat(one);
          }, [])}
      </>
      <div className={style.glass}></div>
    </div>
  );
}

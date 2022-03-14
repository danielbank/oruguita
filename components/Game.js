import { Pixel, PixelRow } from "./Pixels";
import { CELL } from "../utils/constants";

const Board = ({ state }) => {
  return Array.from({ length: state.dimensions }, (_, i) => {
    const ys = Array.from({ length: state.dimensions }, (_, j) => {
      const coord = `x${i}-y${j}`;
      const oruguitaIndex = state.oruguita.findIndex(
        (coord) => coord[0] === i && coord[1] == j
      );
      if (oruguitaIndex === 0)
        return <Pixel key={coord} id={coord} cell={CELL.ORUGUITA_HEAD} />;
      if (oruguitaIndex > 0) {
        return <Pixel key={coord} id={coord} cell={CELL.ORUGUITA} />;
      }
      if (state.cherry[0] === i && state.cherry[1] === j)
        return <Pixel key={coord} id={coord} cell={CELL.CHERRY} />;
      return <Pixel key={coord} id={coord} cell={CELL.EMPTY} />;
    });
    return <PixelRow key={i}>{ys}</PixelRow>;
  });
};

export default Board;

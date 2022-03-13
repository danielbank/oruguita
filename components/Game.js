import { Pixel, PixelRow } from "./Pixels";

const Board = ({ state }) => {
  return state.map((x, i) => {
    const ys = x.map((y, j) => {
      const coord = `x${i}-y${j}`;
      return <Pixel key={coord} id={coord} cell={y} />;
    });
    return <PixelRow key={i}>{ys}</PixelRow>;
  });
};

export default Board;

import { useReducer } from "react";

const isOutOfBounds = (coord, dimensions) => {
  return (
    coord[0] < 0 ||
    coord[0] >= dimensions ||
    coord[1] < 0 ||
    coord[1] >= dimensions
  );
};

const isCherry = (coord, cherry) => {
  return coord[0] === cherry[0] && coord[1] === cherry[1];
};

const isInOruguita = (coord, oruguita) => {
  const oruguitaIndex = oruguita.findIndex(
    (oruguitaSegment) =>
      oruguitaSegment[0] === coord[0] && oruguitaSegment[1] == coord[1]
  );
  return oruguitaIndex > -1;
};

const isDirectionLeftOrRight = (direction) =>
  direction == "left" || direction == "right";

const isDirectionUpOrDown = (direction) =>
  direction == "up" || direction == "down";

const isGameOver = (coord, oruguita, dimensions) => {
  if (isOutOfBounds(coord, dimensions)) return true;
  if (isInOruguita(coord, oruguita)) return true;
  return false;
};

const getNextCoord = (oruguitaHead, direction) => {
  if (direction === "up") return [oruguitaHead[0] - 1, oruguitaHead[1]];
  if (direction === "down") return [oruguitaHead[0] + 1, oruguitaHead[1]];
  if (direction === "left") return [oruguitaHead[0], oruguitaHead[1] - 1];
  return [oruguitaHead[0], oruguitaHead[1] + 1];
};

const placeCherry = (oruguita, dimensions) => {
  let cherry = oruguita[0];
  while (isInOruguita(cherry, oruguita)) {
    cherry = [
      Math.floor(Math.random() * dimensions),
      Math.floor(Math.random() * dimensions),
    ];
  }
  return cherry;
};

const moveOruguita = ({ oruguita, cherry, direction, size, dimensions }) => {
  const nextCoord = getNextCoord(oruguita[0], direction);
  return {
    oruguita: [
      nextCoord,
      ...oruguita.slice(
        0,
        oruguita.length >= size ? oruguita.length - 1 : oruguita.length
      ),
    ],
    gameOver: isGameOver(nextCoord, oruguita, dimensions),
    size: isCherry(nextCoord, cherry) ? size + 1 : size,
    cherry: isCherry(nextCoord, cherry)
      ? placeCherry(oruguita, dimensions)
      : cherry,
  };
};

const useGameState = (dimensions) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "TICK": {
          return Object.assign({}, state, {
            ...moveOruguita(state),
          });
        }
        case "TURN": {
          if (isDirectionLeftOrRight(action.direction)) {
            if (isDirectionUpOrDown(state.direction)) {
              return Object.assign({}, state, { direction: action.direction });
            }
          }
          if (isDirectionUpOrDown(action.direction)) {
            if (isDirectionLeftOrRight(state.direction)) {
              return Object.assign({}, state, { direction: action.direction });
            }
          }
          return state;
        }
        default:
          return state;
      }
    },
    {
      gameOver: false,
      dimensions,
      oruguita: [[0, 0]],
      direction: "right",
      size: 2,
      cherry: [Math.floor(dimensions / 2), Math.floor(dimensions / 2)],
    }
  );

  const onTick = () => dispatch({ type: "TICK" });

  const onTurn = (direction) => dispatch({ type: "TURN", direction });

  return [state, onTick, onTurn];
};

export default useGameState;

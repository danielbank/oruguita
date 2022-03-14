import { useReducer } from "react";

const useGameState = (dimensions) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "TURN": {
          if (action.direction == "left" || action.direction == "right") {
            if (state.direction == "up" || state.direction == "down") {
              return Object.assign({}, state, { direction: action.direction });
            }
          }
          if (action.direction == "up" || action.direction == "down") {
            if (state.direction == "left" || state.direction == "right") {
              return Object.assign({}, state, { direction: action.direction });
            }
          }
          return state;
        }
      }
    },
    {
      gameOver: false,
      dimensions,
      oruguita: [[0, 0]],
      direction: "right",
      length: 2,
      cherry: [Math.floor(dimensions / 2), Math.floor(dimensions / 2)],
    }
  );

  const onTick = () => {};

  const onTurn = (direction) => dispatch({ type: "TURN", direction });

  const onGrow = () => {};

  return [state, onTick, onTurn, onGrow];
};

export default useGameState;

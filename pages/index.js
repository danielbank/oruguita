import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { CELL } from "../utils/constants";
import Game from "../components/Game";

const BOARD_SIZE = 10;

const initialGameState = (x = BOARD_SIZE, y = BOARD_SIZE) => {
  const emptyState = Array.from({ length: x }, () =>
    Array.from({ length: y }, () => CELL.EMPTY)
  );
  const rx = Math.floor(Math.random() * BOARD_SIZE);
  const ry = Math.floor(Math.random() * BOARD_SIZE);
  return getNewState(emptyState, rx, ry, CELL.ORUGUITA_HEAD);
};

const getNewState = (ogState, x, y, newCell) => {
  const state = JSON.parse(JSON.stringify(ogState));
  state[x][y] = newCell;
  return state;
};

export default function Home() {
  const [state, setState] = useState(initialGameState);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Game state={state} />
        <div className="h-1 w-1 hidden bg-white bg-red-400 bg-pink-400 bg-green-400" />
      </main>
    </div>
  );
}

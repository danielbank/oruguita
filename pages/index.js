import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Game from "../components/Game";
import { useKeyPress, useGameState } from "../hooks";

const BOARD_SIZE = 10;

export default function Home() {
  const [state, onTick, onTurn] = useGameState(BOARD_SIZE);
  const upPress = useKeyPress("w");
  const downPress = useKeyPress("s");
  const leftPress = useKeyPress("a");
  const rightPress = useKeyPress("d");

  useEffect(() => {
    if (upPress) {
      onTurn("up");
    }
    if (downPress) {
      onTurn("down");
    }
    if (leftPress) {
      onTurn("left");
    }
    if (rightPress) {
      onTurn("right");
    }
  }, [upPress, downPress, leftPress, rightPress]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <p>Current direction is {state.direction}</p>
        </div>
        <Game state={state} />
        <div className="h-1 w-1 hidden bg-white bg-red-400 bg-pink-400 bg-green-400" />
      </main>
    </div>
  );
}

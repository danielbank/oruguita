import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Game from "../components/Game";
import { useKeyPress, useGameState } from "../hooks";

const BOARD_SIZE = 10;
const TICK = 100;

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
  }, [onTurn, upPress, downPress, leftPress, rightPress]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!state.gameOver) {
        onTick();
      }
    }, TICK);
    return () => clearInterval(timer);
  }, [onTick, state.gameOver]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h1 className="text-4xl">
            <span className="text-pink-400">Or</span>
            <span className="text-green-400">uguita</span>
          </h1>
        </div>
        {state.gameOver && <p className="text-xl text-amber-300">Good Game</p>}
        <Game state={state} />
      </main>
    </div>
  );
}

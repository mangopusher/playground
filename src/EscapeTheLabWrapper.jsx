import { useRef, useState } from "react";
import { initGame } from "./escape-the-lab-game/initGame.js";

export default function EscapeTheLabWrapper() {
    const gameContainerRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = async () => {
        if (gameStarted) return;
        setGameStarted(true);
        await initGame(gameContainerRef.current);
    };

    return (
        <main style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
            <h1>Escape The Lab</h1>
            <section>
                <p>
                    Hier entsteht ein kleines Spiel, in dem du aus einem Labor entkommen musst.
                    Bisher ist hier allerdings nur ein Klon des Spiels "runner" von <a href="https://phaser.io/">Phaser</a> implementiert.
                </p>
            </section>
            {!gameStarted && (
                <button onClick={startGame} style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
                    Start Game
                </button>
            )}
            <div ref={gameContainerRef} style={{ minHeight: 400 }} />
        </main>
    );
}
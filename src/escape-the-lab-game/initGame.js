export async function initGame(container) {
    const Phaser = (await import("phaser")).default;
    const Game = (await import("./scenes/game")).default;
    const GameOver = (await import("./scenes/gameover")).default;

    const config = {
        width: 600,
        height: 300,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        autoRound: false,
        parent: container,
        physics: {
            default: "arcade",
            arcade: {
                debug: true,
                gravity: { y: 350 }
            }
        },
        scene: [Game, GameOver],
    }

    const game = new Phaser.Game(config);
}
export default function Game_over({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h1>Game Over!</h1>

      {winner && <p>{winner} won!</p>}
      {!winner && <p>it &apos;s a draw! </p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

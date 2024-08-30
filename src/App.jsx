import Player from "./components/playerinfo";
import Board from "./components/board";
import { useState } from "react";
import Log from "./components/log";
import Game_over from "./components/gameover";
import { WINNING_COMBINATIONS } from "./winnng combinations";
import Image from "./components/image";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurn) {
  let curentPlayer = "x";
  if (gameTurn.length > 0 && gameTurn[0].player === "x") {
    curentPlayer = "o";
  }
  return curentPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurn) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setplayers] = useState({
    x: "player1",
    o: "player2",
  });
  // const [activePlayer, setactivePlayer] = useState("x");
  const [gameTurn, setgameTurn] = useState([]);

  const activePlayer = driveActivePlayer(gameTurn);

  const gameBoard = deriveGameBoard(gameTurn);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectPlayer(rowindex, colIndex) {
    // setactivePlayer((curActivePlayer) => (curActivePlayer === "x" ? "o" : "x"));
    setgameTurn((prevTurns) => {
      const curentPlayer = driveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowindex, col: colIndex }, player: curentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleResart() {
    setgameTurn([]);
  }
  function handlePlayerNamechange(symbol, newName) {
    setplayers((prevplayer) => {
      return {
        ...prevplayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialname="player 1"
            symbol="x"
            isActive={activePlayer === "x"}
            onChangeName={handlePlayerNamechange}
          />
          <Player
            intialname="player 2"
            symbol="o"
            isActive={activePlayer === "o"}
            onChangeName={handlePlayerNamechange}
          />
        </ol>
        {(winner || hasDraw) && (
          <Game_over winner={winner} onRestart={handleResart} />
        )}
        <Board onSelectSquare={handleSelectPlayer} board={gameBoard} />
      </div>

      <Log turns={gameTurn} />

      <Image />
    </main>
  );
}

export default App;

import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

const SURROUNDING_COORDS = [
  [0, 0],
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.6 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit
   * returns initial board
   */
  function createBoard() {
    const initialBoard = [];

    for (let row = 0; row < nrows; row++) {
      const newRow = [];

      for (let col = 0; col < ncols; col++) {
        newRow.push(Math.random() <= chanceLightStartsOn);
      }

      initialBoard.push(newRow);
    }

    return initialBoard;
  }

  /**
   * Checks the board in state and determines whether the player has won
   */

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    //TODO: utilize .every
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Accepts the coord ("y-x") of a cell, and flips it and the surrounding cells
   */
  function flipCellsAround(coord) {
    console.log("flipping!");

    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      //TODO: update the name of global constant
      const coordsToFlip = SURROUNDING_COORDS.map(([relY, relX]) => [
        y + relY,
        x + relX,
      ]);

      for (const [flipY, flipX] of coordsToFlip) {
        flipCell(flipY, flipX, boardCopy);
      }

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <p>You Won!</p>;
  }

  // TODO

  // make table board
  //TODO: can make `${rowNum}-${colNum}` as variable
  const rows = board.map((row, rowNum) =>
    row.map((cellIsLit, colNum) => (
      <Cell
        key={`${rowNum}-${colNum}`}
        isLit={cellIsLit}
        flipCellsAroundMe={() => flipCellsAround(`${rowNum}-${colNum}`)}
      />
    ))
  );

  return (
    <table>
      <tbody>
        {rows.map((row, rowNum) => (
          <tr key={`row-${rowNum}`}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;

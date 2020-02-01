import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5, //number of rows of board
    ncols: 5, //number of columns of board
    chanceLightStartsOn: 0.25 //chance any cell is lit at start of game
  };

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x <= this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    console.log("FLIPPING");
    let { ncols, nrows } = this.props,
      board = this.state.board,
      [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x); // Flip selected cell
    flipCell(y, x - 1); // Flip left cell
    flipCell(y, x + 1); // Flip right cell
    flipCell(y - 1, x); // Flip cell below
    flipCell(y + 1, x); // Flip cell above
    // TODO: Determine is the game has been won
    //       Win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon });
  }
  /** Render game board or winning message. */
  render() {
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        {this.state.hasWon ? (
          <div className="Board-title">
            <div className="winner">
              <span className="neon-orange">YOU</span>
              <span className="neon-blue">WIN!</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            <table className="Board">
              <tbody>{tblBoard}</tbody>
            </table>
          </div>
        )}
        ;
      </div>
    );
  }
}

export default Board;

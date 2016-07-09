//set the board in order one tile at a time
//using numbers [1..length] in random order
//try number, if valid move, set and move to next tile with new set of numbers
//if invalid move, remove number from array and try next number
//if used up all numbers and wasn't able to set on tile, back out prior tile
//reset prior tile but first remove that popped number from its valid moves
//so first set tile [0,0], then tile [0,1], etc

$(document).ready(function() {
  var possibleNums = [];
  //var boardLength = 4;
  var boardLength;
  var gameBoard = [];

  $('#submit-btn').click(function() {
    console.log( "Sumbit button was clicked!");
    var $userBoardSelection = parseInt($("select").val());
    boardLength = $userBoardSelection;
    console.log('$userBoardSelection: ', $userBoardSelection);

    gameStart();

    function gameStart() {
      designGameBoard($userBoardSelection);
      setBoard();
      drawBoard();
      while (!boardCheck()) {
        gameStart();
      }
    }

    function designGameBoard(boardLength) {
      gameBoard = [];
      for (var i = 0; i < boardLength; i += 1){
        gameBoard.push([]);
      }
      //gameBoard => [[], [], []]
    }

    function validNumbers() {
      possibleNums = [];
      for (var i = 1; i <= boardLength; i += 1){
        possibleNums.push(i);
      }
    }

    function resetPriorTile(priorVal, priorRow, priorCol) {
      validNumbers();
      possibleNums.splice(possibleNums.indexOf(priorVal), 1);
      var tileVal = setTile(priorRow, priorCol);
      if (tileVal) {
        return tileVal;
      } else {
        return false;
      }
    }

    function setBoard() {
      var priorTileRow = 0, priorTileCol = 0, currentVal, priorVal;
      validNumbers();
      for (var row = 0; row < boardLength; row += 1) {
        for (var col = 0; col < boardLength; col += 1) {
          currentVal = setTile(row, col);
          if (!currentVal) {
            priorVal = resetPriorTile(priorVal, priorTileRow, priorTileCol);
            if (priorVal) {
              validNumbers();
              currentVal = setTile(row, col);
            } else {
              return gameStart();
            }
          } else {
            priorTileRow = row;
            priorTileCol = col;
            priorVal = currentVal;
            validNumbers();
          }
        }
      }
    }

    //returns false or set tile value:
    function setTile(row, col)  {
      var tileSet = false;
      var num = possibleNums[randomNumIndex()];
      while (possibleNums.length > 0) {
        if (validPlacement(num, row, col)) {
          gameBoard[row][col] = num;
          tileSet = num;
          return tileSet;
        } else {
          possibleNums.splice(possibleNums.indexOf(num), 1);
          num = possibleNums[randomNumIndex()];
        }
      }
      return tileSet;
    }

    function randomNumIndex(){
      var numIndex;
      numIndex = Math.floor(Math.random() * possibleNums.length);
      return numIndex;
    }

    function validPlacement(num, row, col) {
      for (var i = 0; i < boardLength; i += 1) {
        if (gameBoard[row][i] === num || gameBoard[i][col] === num) {
          return false;
        }
      }
      return true;
    }

    function drawBoard(){
      var $boardContainer = $('.board-flex-container');
      $boardContainer.html('');
      for (var i = 0; i < boardLength; i += 1){
        drawRow(i, gameBoard);
      }
    }

    function drawRow(rowNum, gameBoard) {
      var $boardContainer = $('.board-flex-container');
      for (var i = 0; i < boardLength; i += 1) {
        var $row = $("<div></div>");
        $row.addClass('row' + i);
        $row.appendTo($boardContainer);
      }

      for (var j = 0; j < boardLength; j += 1) {
        var $tile = $('<span></span>');
        $tile.html(gameBoard[rowNum][j]);
        $tile.addClass('tile');
        $tile.appendTo($row);
      }
    }

    function boardCheck() {
      for (var i = 0; i < gameBoard.length; i += 1) {
        if (gameBoard[i].includes(undefined)) {
          return false;
        }
      }
      return true;
    }
  });
  // gameStart();
});

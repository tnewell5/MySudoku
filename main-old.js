window.onload = function(){
var possibleNums = [];
  var rowLength = 4;
  var colLength = rowLength;
  var gameBoard = [];

  function gameStart() {
    populateGameBoard();
    drawBoard();
  }

  function populatePossibleNums() {
    possibleNums = [];
    for (var i = 1; i <= rowLength; i += 1){
      possibleNums.push(i);
    }
  }

  function designGameBoard() {
    for (var i = 1; i <= rowLength; i += 1){
      gameBoard.push([]);
    }
  }

  function randomNumIndex(){
    var numIndex;
    numIndex = Math.floor(Math.random() * possibleNums.length);
    return numIndex;
  }

  function populateGameBoard() {
    gameBoard = [];
    designGameBoard();
    for (var i = 0; i < colLength; i += 1) {
      var rowSet = false;
      rowSet = populateGameRow(i);
      var counter = 0;
      while (!rowSet) {
        if (counter > 100) {
          console.log('counter: ', counter);
          break;
        }
        console.log('resetting row i:', i);
        console.log('gameBoard[0]: ', gameBoard[0]);
        console.log('gameBoard[1]: ', gameBoard[1]);
        console.log('gameBoard[2]: ', gameBoard[2]);
        console.log('gameBoard[3]: ', gameBoard[3]);
        rowSet = populateGameRow(i);
        counter += 1;
      }
    }
    console.log('gameBoard: ', gameBoard);
  }

  function populateGameRow(rowNum) {
    populatePossibleNums();
    var numToPlace, numToPlaceIndex, placed = false, placementAttempts = 0, rowSet = false;
    for (var i = 0; i < rowLength; i += 1){
      numToPlaceIndex = randomNumIndex();
      numToPlace = possibleNums[numToPlaceIndex];

      while (!placed) {
        placementAttempts += 1;
        if (validPlacement(numToPlace, rowNum, i)) {
          gameBoard[rowNum][i] = numToPlace;
          //possibleNums.splice(numToPlaceIndex, 1);
          placed = true;
        }
        else {
          if (placementAttempts > 15) {
            return rowSet;
          } else {
            possibleNums.splice(numToPlaceIndex, 1);
            numToPlaceIndex = randomNumIndex();
            numToPlace = possibleNums[numToPlaceIndex];
          }
        }
      }
      populatePossibleNums();
      placed = false;
    }
    if (gameBoard[rowNum][colLength - 1]) {
      rowSet = true;
    }
    return rowSet;
  }

  function validPlacement(num, rowIndex, colIndex) {
    var valid = true;
    for (var i = 0; i < rowLength; i += 1) {
      if (gameBoard[rowIndex][i] === num || gameBoard[i][colIndex] === num) {
        valid = false;
      }
    }
    return valid;
  }

  function drawBoard(){
    for (var i = 0; i < rowLength; i += 1){
      drawRow(i, gameBoard);
    }
  }

  function drawRow(rowNum, gameBoard) {
    var boardContainer = document.querySelector('.board-flex-container');
    for (var i = 0; i < rowLength; i += 1) {
      var row = document.createElement('div');
      row.classList.add('row' + i);
      boardContainer.appendChild(row);
    }

    for (var j = 0; j < colLength; j += 1) {
      var tile = document.createElement('span');
      tile.innerHTML = gameBoard[rowNum][j];
      tile.classList.add('tile');
      row.appendChild(tile);
    }
  }

  gameStart();
}

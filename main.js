window.onload = function(){
var possibleNums = [];
  var rowLength = 3;
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
      populatePossibleNums();
      //if the row does not get set correctly, try setting it again:
      var rowSet = false;
      rowSet = populateGameRow(i);
      while (!rowSet) {
        populatePossibleNums();
        rowSet = populateGameRow(i);
      }
    }
    console.log('gameBoard: ', gameBoard);
  }

  function populateGameRow(rowNum) {
    var numToPlace, numToPlaceIndex, placed = false, placementAttempts = 0, rowSet = false;
    for (var i = 0; i < rowLength; i += 1){
      numToPlaceIndex = randomNumIndex();
      numToPlace = possibleNums[numToPlaceIndex];

      while (!placed) {
        placementAttempts += 1;
        if (validPlacement(numToPlace, rowNum, i)) {
          gameBoard[rowNum][i] = numToPlace;
          possibleNums.splice(numToPlaceIndex, 1);
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
    //var row = document.querySelector('.row' + rowNum);
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

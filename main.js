window.onload = function(){
  // possibleNums = [1..rowlength]
  // populate row 0 with a random number from possibleNums from left to right in order
  // randomNum function will take in possibleNums and derive num based on possibleNums length
  // randomNum function will choose a random position in possibleNums
  // check if num may be placed by checking row and col to see if num already exists (invalid placement)
  // if placement is valid, place num on board and remove it from possibleNums
  // otherwise, find another random num
  // once possibleNums is empty, replenish it and start populating next row

  var possibleNums = [];
  var rowLength = 3;
  var colLength = rowLength;
  var gameBoard = [];

  function gameStart() {
    //designGameBoard();
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
      if (!populateGameRow(i)) {
        populateGameRow(i);
      }
    }
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
          //console.log('num placed');
        }
        else {
          if (placementAttempts > 15) {
            return rowSet;
            console.log('will need to reset row');
          } else {
            //console.log('looking for another placement');
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
      console.log('set rowSet to true');
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
    var row = document.querySelector('.row' + rowNum);
    for (var i = 0; i < 3; i += 1) {
      var tile = document.createElement('span');
      tile.innerHTML = gameBoard[rowNum][i];
      tile.classList.add('tile');
      row.appendChild(tile);
    }
  }

  gameStart();
}

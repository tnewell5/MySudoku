window.onload = function(){
  var possibleNums = [];
  var boardLength = 4;
  var gameBoard = [];

  function gameStart() {
    populateGameBoard();
    drawBoard();
  }

  function validPlacement(num, rowIndex, colIndex) {
    var valid = true;
    for (var i = 0; i < boardLength; i += 1) {
      if (gameBoard[rowIndex][i] === num || gameBoard[i][colIndex] === num) {
        valid = false;
      }
    }
    return valid;
  }

  function designGameBoard() {
    for (var i = 0; i <= boardLength; i += 1){
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
    for (var i = 0; i < boardLength; i += 1) {
      //if the row does not get set correctly, try setting it again:
      var rowSet = false;
      rowSet = populateGameRow(i);
      var counter = 0;
      while (!rowSet) {
        if (counter > 100) {
          // console.log('counter: ', counter);
          break;
        }
        //console.log('resetting row i:', i);
        // console.log('gameBoard[0]: ', gameBoard[0]);
        // console.log('gameBoard[1]: ', gameBoard[1]);
        // console.log('gameBoard[2]: ', gameBoard[2]);
        // console.log('gameBoard[3]: ', gameBoard[3]);
        rowSet = populateGameRow(i);
        counter += 1;
      }
    }
    //console.log('gameBoard: ', gameBoard);
  }

  // //populate numbers that are not already contained in the column:
  function populatePossibleNums(rowIndex, colIndex) {
    possibleNums = [];
    for (var i = 1; i <= boardLength; i += 1){
      possibleNums.push(i);
    }
    //go through every number in column and if it contains in possibleNums, delete it:
    var deleteNumIndex;
    var deletedNum;
    for (var j = 0; j <= boardLength; j += 1){
      if (possibleNums.includes(gameBoard[j][colIndex])) {
        deleteNumIndex = possibleNums.indexOf(gameBoard[j][colIndex]);
        deletedNum = possibleNums.splice(deleteNumIndex, 1);
        console.log('deletedNum: ', deletedNum);
      }
      if (possibleNums.includes(gameBoard[rowIndex][j])) {
        deleteNumIndex = possibleNums.indexOf(gameBoard[rowIndex][j]);
        deletedNum = possibleNums.splice(deleteNumIndex, 1);
        console.log('deletedNum: ', deletedNum);
      }
    }
    console.log('possibleNums: ', possibleNums);
  }

  function populateGameRow(rowIndex) {
    // populatePossibleNums(rowIndex);
    var numToPlace, numToPlaceIndex, placed = false, placementAttempts = 0, rowSet = false;
    for (var colIndex = 0; colIndex < boardLength; colIndex += 1){
      populatePossibleNums(rowIndex, colIndex);
      //console.log('gameBoard: ', gameBoard);
      console.log('setting row: ', rowIndex);
      console.log('setting col: ', colIndex);
      //console.log('setting tile: ', gameBoard[rowIndex][colIndex]);
      //console.log('possibleNums: ', possibleNums);
      numToPlaceIndex = randomNumIndex();
      numToPlace = possibleNums[numToPlaceIndex];

      while (!placed) {
        placementAttempts += 1;
        if (validPlacement(numToPlace, rowIndex, colIndex)) {
          gameBoard[rowIndex][colIndex] = numToPlace;
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
      populatePossibleNums(rowIndex, colIndex);
      placed = false;
    }
    if (gameBoard[rowIndex][boardLength - 1]) {
      rowSet = true;
    }
    return rowSet;
  }

  function drawBoard(){
    for (var i = 0; i < boardLength; i += 1){
      drawRow(i, gameBoard);
    }
  }

  function drawRow(rowNum, gameBoard) {
    //var row = document.querySelector('.row' + rowNum);
    var boardContainer = document.querySelector('.board-flex-container');
    for (var i = 0; i < boardLength; i += 1) {
      var row = document.createElement('div');
      row.classList.add('row' + i);
      boardContainer.appendChild(row);
    }

    for (var j = 0; j < boardLength; j += 1) {
      var tile = document.createElement('span');
      tile.innerHTML = gameBoard[rowNum][j];
      tile.classList.add('tile');
      row.appendChild(tile);
    }
  }

  gameStart();
}

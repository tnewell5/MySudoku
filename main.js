console.log('window has loaded');

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
    populateGameRow(i);
  }
}

function populateGameRow(rowNum) {
  var numToPlace, numToPlaceIndex, placed = false, placementAttempts = 0;
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
        if (placementAttempts > 10) {
          console.log('gameBoard: ', gameBoard);
          console.log('re-building row');
          console.log('gameBoard: ', gameBoard);
          //need to re-build current row
          for (var j = 0; j < rowLength; j += 1){
            gameBoard[rowNum][j] = null;
          }
          placementAttempts = 0;
          populatePossibleNums();
          //populatePossibleNums(rowNum);
          populateGameRow(rowNum);
          //break;
          // return populateGameBoard();
        } else {
          console.log('looking for another placement');
          possibleNums.splice(numToPlaceIndex, 1);
          numToPlaceIndex = randomNumIndex();
          numToPlace = possibleNums[numToPlaceIndex];
        }
      }
    }
    populatePossibleNums();
    placed = false;
  }
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

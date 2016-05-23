console.log('window has loaded');

//var gameArray = [[1,2,3],[2,3,1],[3,2,1]];
var gameArray = [];
var boardLength = 0;
var numsToPlace = [];
var tile = [];

function createGameArray(){
  //if boardLength is 3, it will need to place 3 1's, 3 2's, and 3 3's in numsToPlace
  //if boardLength is 3, gameArray will contain 3 empty arrays

  for (var i = 0; i < boardLength; i += 1) {
    gameArray.push([]);
    for (var j = 0; j < boardLength; j += 1){
      numsToPlace.push(i + 1);
    }
  }
  // console.log('numsToPlace:', numsToPlace);
  // console.log('gameArray:', gameArray);
}

//find a random tile in grid and check if tile is free
//if free, check if placing current number is a valid move
//if valid move, place current number
//else, find another random tile and check if tile is free

//returns random number
function randomNum(){
  return Math.floor(Math.random() * (boardLength));
}

//finds tile based on random coordinates
function findTile(){
  tile = [];
  tile.push(randomNum(), randomNum());
  //console.log('tile:', tile);
  return tile;
}

//checks if found tile is open by checking it against gameArray
function isTileOpen(tile){
  //console.log('gameArray[tile[0]][tile[1]]', gameArray[tile[0]][tile[1]]);
  return !gameArray[tile[0]][tile[1]];
}

//checks if current number may be placed on the board
function mayPlace(num, tile){
  //check if gameArray row and column already contain this num:
  var validPlace = true;
  for (var i = 0; i < boardLength; i +=1 ){
    //check if gameArray row contains num:
    if (gameArray[tile[0]][i] == num) {
      console.log('row already contains num');
      validPlace = false;
    }
    //check if gameArray col contains num:
    else if (gameArray[i][tile[1]] == num) {
      console.log('col already contains num');
      validPlace = false;
    }
  }
  return validPlace;
}

function placeNum(num, tile){
  gameArray[tile[0]][tile[1]] = num;
  console.log(num, ' has been placed at: ', tile);
}


function playGame(){
  boardLength = 3;
  // creates gameArray of nested arrays and numsToPlace array based on boardLength:
  createGameArray();

  //numsToPlace
  for (var i = 0; i < numsToPlace.length; i += 1){
    var currentNum = numsToPlace[i];
    var placedNum = false;
    // keep looping with each number until it's placed on gameArray:
    while (!placedNum) {

      // find open Tile on board:
      tile = findTile();
      // check if tile is open:
      if (isTileOpen(tile)) {
       //check if able to place current number on tile:
       console.log('tile is open!');
        if (mayPlace(numsToPlace[i], tile)) {
         console.log('placement is valid!');
         placeNum(numsToPlace[i], tile);
         placedNum = true;
         console.log('current gameArray is: ', gameArray[0], gameArray[1], gameArray[2]);
        } // close if
        else {
         console.log('placement is invalid');
        } // close else
      } // close if
      else {
       console.log('tile is taken!');
      } // close else
    } // close while loop
  } // close for loop

  // display game board:
  fillinGrid();

} // close playGame function

// call playGame():
playGame();





function fillInRow(rowNum, gameArray) {
  var rowDiv = document.querySelector('.row' + rowNum);
  // console.log('rowDiv:', rowDiv);
  for (var i = 0; i < 3; i += 1) {
    var tileSpan = document.createElement('span');
    tileSpan.innerHTML = gameArray[rowNum][i];
    tileSpan.style.display = 'inline-block';
    tileSpan.style.width = "20px";
    tileSpan.style.height = "20px";
    tileSpan.style.border = '1px solid black';
    tileSpan.style.textAlign = 'center';
    rowDiv.appendChild(tileSpan);
  }
}

//displays game board by filling in each game row:
function fillinGrid(){
  for (var i = 0; i < gameArray.length; i += 1){
    fillInRow(i, gameArray);
  }
}

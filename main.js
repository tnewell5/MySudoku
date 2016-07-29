var possibleNums = [];
var boardLength;
var gameBoard = [];

gameStart();

function gameStart() {
  possibleNums = [];
  boardLength = 0;
  gameBoard = [];

  $('#game').removeClass('hidden');
  $('#submit-btn').click(function() {

    var $userBoardSelection = parseInt($("select").val());
    boardLength = $userBoardSelection;
    console.log('$userBoardSelection: ', $userBoardSelection);
    $('#game-options').hide();
    designGameBoard($userBoardSelection);
    setBoard();
    drawBoard();
    while (!boardCheck()) {
      gameStart();
    }
    revealHalfBoard();
    userMoves();
  });
}

function revealHalfBoard() {
  var tilesToRevealCount = boardLength * boardLength / 2;
  var tileId, randRow, randCol;
  for (var i = 0; i < tilesToRevealCount; i += 1) {
    randRow = randomNum();
    randCol = randomNum();
    tileId = '#row' + randRow + 'col' + randCol;
    $(tileId).addClass('reveal');
    $(tileId).attr("disabled", "true");
  }
}

function randomNum(){
  var num;
  return num = Math.floor(Math.random() * (boardLength));
}

function userMoves() {
  var wrongMoves = 0;

  $('.board-flex-container').change(function(event) {
    var allTilesRevealed = false;
    if (event.target.placeholder === event.target.value) {
      $(event.target).addClass('reveal').attr("disabled", "true");
    }
    else {
      wrongMoves += 1;
      console.log('wrongMoves: ', wrongMoves);
      $(event.target).addClass('animated flash');
      window.setTimeout(function removeFlash() {
        $(event.target).removeClass('animated flash');
        $(event.target).val('');
      }, 1500);
    }

    var $revealedTiles = $('.reveal').length;
    console.log('$revealedTiles: ', $revealedTiles);
    if ($revealedTiles === boardLength * boardLength) {
      return playerWon();
    } else if (wrongMoves >= 3) {
      return gameOver();
    }
  });
}

function gameOver() {
  $('#game').addClass('hidden');
  $('#game-over').removeClass('hidden');

  // $('#restart-game').click(function() {
  //   $('#game-over').addClass('hidden');
  //   gameStart();
  // });
}

function playerWon() {
  $('#game').html("<div id='game-over' class='animated tada infinite'>You Win!!!</div>");
}

function designGameBoard(boardLength) {
  gameBoard = [];
  for (var i = 0; i < boardLength; i += 1){
    gameBoard.push([]);
  }
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
    $row.appendTo($boardContainer);
  }

  for (var j = 0; j < boardLength; j += 1) {
    var $tile = $('<input></input>');
    $tile.attr("placeholder", gameBoard[rowNum][j]);
    $tile.addClass('gray');
    $tile.addClass('tile');
    $tile.attr('id', 'row' + rowNum + 'col' + j);
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

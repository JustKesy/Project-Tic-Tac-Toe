const gameBoard = (() => {
  const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let xTurn = true;
  const board = document.querySelector(".board");

  const resetBtn = document.querySelector(".reset");

  const newGameBtn = document.querySelector(".new-game");

  const cells = document.querySelectorAll(".cell");

  const cellsArr = [...cells];

  const message = document.querySelector(".message-window");

  const winMessage = document.querySelector(".winner");

  let poensX = document.querySelector(".poens-x");

  let poensOx = document.querySelector(".poens-ox");

  let poenX = 0;
  let poenOx = 0;
  poensX.textContent = poenX;
  poensOx.textContent = poenOx;
  let xComb = [];
  let oxComb = [];

  const reset = () => {
    xComb = [];
    oxComb = [];
    message.classList.remove("shown");
    for (let i = 0; i < cellsArr.length; i++) {
      cellsArr[i].removeEventListener("click", setMarker);
      cellsArr[i].setAttribute("class", "cell");
    }
    events();
  };

  const newGame = () => {
    reset();
    poenX = 0;
    poenOx = 0;
    poensX.textContent = poenX;
    poensOx.textContent = poenOx;
  };

  const tied = () => {
    return cellsArr.every((cell) => {
      return cell.classList.contains("ix") || cell.classList.contains("ox");
    });
  };

  const checkWin = () => {
    if (tied()) {
      message.classList.add("shown");
      winMessage.textContent = "TIED! Move your hands  from -->";
    } else if (xTurn == true) {
      if (winComb.some((item) => item.every((num) => xComb.includes(num)))) {
        message.classList.add("shown");
        winMessage.textContent = "'X' has WIN! ";
        poensX.textContent = ++poenX;
      } else {
        return;
      }
    } else if (xTurn == false) {
      if (winComb.some((item) => item.every((num) => oxComb.includes(num)))) {
        message.classList.add("shown");
        winMessage.textContent = "'OX' has WIN! ";
        poensOx.textContent = ++poenOx;
      } else {
        return;
      }
    }
  };

  const start = () => {
    if (xTurn == true) {
      board.classList.add("ix-turn");
    }
  };

  const boardToggle = () => {
    if (xTurn == false) {
      board.classList.remove("ix-turn");
      board.classList.add("ox-turn");
    } else if (xTurn == true) {
      board.classList.remove("ox-turn");
      board.classList.add("ix-turn");
    }
  };

  const setMarker = (e) => {
    if (xTurn == true) {
      e.target.classList.add("ix");
      xComb.push(+e.target.dataset.key);
      checkWin();
      xTurn = !xTurn;
      boardToggle();
    } else if (xTurn == false) {
      e.target.classList.add("ox");
      oxComb.push(+e.target.dataset.key);
      checkWin();
      xTurn = !xTurn;
      boardToggle();
    }
  };

  const events = () => {
    for (let i = 0; i < cellsArr.length; i++) {
      cellsArr[i].addEventListener("click", setMarker, { once: true });
      cellsArr[i].setAttribute("data-key", i);
    }
  };

  resetBtn.addEventListener("click", reset);
  newGameBtn.addEventListener("click", newGame);

  const game = () => {
    start();
    events();
  };
  return { game };
})();

gameBoard.game();

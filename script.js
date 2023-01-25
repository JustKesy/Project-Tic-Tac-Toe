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

  const cells = document.querySelectorAll(".cell");
  const cellsArr = [...cells];
  const message = document.querySelector(".message-window");
  const xComb = [];
  const oxComb = [];
  const checkWin = () => {
    if (xTurn == true) {
      if (winComb.some((item) => item.every((num) => xComb.includes(num)))) {
        message.classList.add("shown");
      } else {
        return;
      }
    } else if (xTurn == false) {
      if (winComb.some((item) => item.every((num) => oxComb.includes(num)))) {
        message.classList.add("shown");
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

  const game = () => {
    start();
    events();
  };
  return { game };
})();

gameBoard.game();

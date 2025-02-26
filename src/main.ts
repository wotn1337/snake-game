import { Direction } from "./direction";
import { Game } from "./game";
import "./style.scss";

const button = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game");
const highScoreElement = document.getElementById("high-score");

const game = new Game();

const highScore = localStorage.getItem("highScore") || "0";
if (highScoreElement) {
  highScoreElement.textContent = highScore;
}

button?.addEventListener("click", () => {
  startScreen?.classList.add("d-none");
  gameScreen?.classList.remove("d-none");
  game.start();
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      game.changeDirection(Direction.UP);
      break;
    case "ArrowDown":
      event.preventDefault();
      game.changeDirection(Direction.DOWN);
      break;
    case "ArrowLeft":
      game.changeDirection(Direction.LEFT);
      break;
    case "ArrowRight":
      game.changeDirection(Direction.RIGHT);
      break;
  }
});

// Add swipe event listeners
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      game.changeDirection(Direction.RIGHT);
    } else {
      game.changeDirection(Direction.LEFT);
    }
  } else {
    if (deltaY > 0) {
      game.changeDirection(Direction.DOWN);
    } else {
      game.changeDirection(Direction.UP);
    }
  }
}

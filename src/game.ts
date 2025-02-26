import { Canvas } from "./canvas";
import { CONFIG } from "./config";
import { Direction } from "./direction";
import { Point } from "./point";
import { Snake } from "./snake";

const { WIDTH, HEIGHT } = CONFIG;
const score = document.getElementById("score");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game");

export class Game {
  private snake!: Snake;
  private food!: Point;
  private canvas: Canvas;
  private timeoutId: NodeJS.Timeout | undefined;
  private score = 0;

  constructor() {
    this.canvas = new Canvas();
    this.initGame();
  }

  start() {
    this.gameLoop();
  }

  stop() {
    clearTimeout(this.timeoutId);
    this.saveHighScore();
    startScreen?.classList.remove("d-none");
    gameScreen?.classList.add("d-none");
    this.initGame();
  }

  changeDirection(direction: Direction) {
    this.snake.changeDirection(direction);
  }

  private initGame() {
    const initSnakePoint = Point.getRandomPoint(WIDTH / 2, HEIGHT);
    this.snake = new Snake(initSnakePoint, Direction.RIGHT);
    this.food = Point.getRandomPoint(WIDTH, HEIGHT, this.snake.BODY);
    this.canvas.redrow(this.snake, this.food);
    this.changeScore(0);
  }

  private gameLoop() {
    this.snake.move();
    if (this.isCollision()) {
      this.stop();
      return;
    }
    if (this.isFoodCollision()) {
      this.snake.growUp();
      this.changeScore(this.score + 1);
      if (!this.placeFood()) {
        this.stop();
        return;
      }
    }
    this.canvas.redrow(this.snake, this.food);
    this.timeoutId = setTimeout(this.gameLoop.bind(this), 400);
  }

  private placeFood() {
    try {
      this.food = Point.getRandomPoint(WIDTH, HEIGHT, this.snake.BODY);
      return true;
    } catch (e) {
      return false;
    }
  }

  private changeScore(value: number) {
    if (!score) {
      throw new Error("Элемент score не найден");
    }

    this.score = value;
    score.textContent = value.toString();
  }

  private isFoodCollision() {
    const snakeHead = this.snake.BODY[0];
    return snakeHead.X === this.food.X && snakeHead.Y === this.food.Y;
  }

  private isCollision() {
    return this.isWallCollision() || this.isSnakeCollision();
  }

  private isWallCollision() {
    const head = this.snake.BODY[0];
    return (
      head.X < 0 || head.X > WIDTH - 1 || head.Y < 0 || head.Y > HEIGHT - 1
    );
  }

  private isSnakeCollision() {
    const head = this.snake.BODY[0];
    const points = this.snake.BODY.filter(
      (point) => point.X === head.X && point.Y === head.Y
    );

    return points.length > 1;
  }

  private saveHighScore() {
    const highScore = localStorage.getItem("highScore");
    if (!highScore || this.score > parseInt(highScore)) {
      localStorage.setItem("highScore", this.score.toString());
      const highScoreElement = document.getElementById("high-score");
      if (highScoreElement) {
        highScoreElement.textContent = this.score.toString();
      }
    }
  }
}

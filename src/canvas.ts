import { CONFIG } from "./config";
import { Point } from "./point";
import { Snake } from "./snake";

const { FIELD_COLOR, CELL_SIZE, WIDTH, HEIGHT, FOOD_COLOR, SNAKE_COLOR } =
  CONFIG;
const canvas = document.getElementById("canvas");

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Элемент не является HTMLCanvasElement");
    }
    this.canvas = canvas;
    canvas.width = WIDTH * CELL_SIZE;
    canvas.height = HEIGHT * CELL_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Не удалось получить 2D контекст");
    }
    this.ctx = ctx;
  }

  redrow(snake: Snake, food: Point) {
    this.clear();
    this.drawSnake(snake);
    this.drawFood(food);
    this.drawGrid();
  }

  private clear() {
    this.ctx.fillStyle = FIELD_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawGrid() {
    for (let x = CELL_SIZE; x < WIDTH * CELL_SIZE; x += CELL_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, HEIGHT * CELL_SIZE);
      this.ctx.stroke();
    }

    for (let y = CELL_SIZE; y < HEIGHT * CELL_SIZE; y += CELL_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(WIDTH * CELL_SIZE, y);
      this.ctx.stroke();
    }
  }

  private drawFood(food: Point) {
    this.ctx.fillStyle = FOOD_COLOR;
    const x = food.X;
    const y = food.Y;
    this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  private drawSnake(snake: Snake) {
    this.ctx.fillStyle = SNAKE_COLOR;
    snake.BODY.forEach((point) => {
      const x = point.X;
      const y = point.Y;
      this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  }
}

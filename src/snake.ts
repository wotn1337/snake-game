import { Direction, DIRECTION_DIFF } from "./direction";
import { Point } from "./point";

export class Snake {
  private body: Point[];
  private direction: Direction;

  constructor(initHeadPoint: Point, direction: Direction) {
    this.body = [initHeadPoint];
    this.direction = direction;
  }

  get BODY() {
    return this.body;
  }

  move() {
    const head = this.body[0].copy();
    head.add(DIRECTION_DIFF[this.direction]);
    this.body = [head, ...this.body.slice(0, -1)];
  }

  growUp() {
    const snakeLength = this.body.length;
    const last = this.body[snakeLength - 1];
    const secondLast = this.body[snakeLength - 2];

    if (secondLast) {
      this.body.push(
        new Point(2 * last.X - secondLast.X, 2 * last.Y - secondLast.Y)
      );
    } else {
      const diff = new Point(
        last.X - DIRECTION_DIFF[this.direction].X,
        last.Y - DIRECTION_DIFF[this.direction].Y
      );
      this.body.push(diff);
    }
  }

  changeDirection(direction: Direction) {
    const dx = DIRECTION_DIFF[this.direction].X + DIRECTION_DIFF[direction].X;
    const dy = DIRECTION_DIFF[this.direction].Y + DIRECTION_DIFF[direction].Y;
    if (dx === 0 && dy === 0) {
      return;
    }

    this.direction = direction;
  }
}

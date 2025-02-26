import { Point } from "./point";

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export const DIRECTION_DIFF: Record<Direction, Point> = {
  [Direction.UP]: new Point(0, -1),
  [Direction.RIGHT]: new Point(1, 0),
  [Direction.DOWN]: new Point(0, 1),
  [Direction.LEFT]: new Point(-1, 0),
};

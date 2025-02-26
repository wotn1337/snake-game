export class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static getRandomPoint(maxX: number, maxY: number, excludedPoints?: Point[]) {
    const allPoints = [];
    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        allPoints.push(new Point(x, y));
      }
    }

    const availablePoints = excludedPoints
      ? allPoints.filter(
          (point) =>
            !excludedPoints.some((p) => p.X === point.X && p.Y === point.Y)
        )
      : allPoints;

    if (availablePoints.length === 0) {
      throw new Error("No available points to place the food.");
    }

    const randomIndex = Math.floor(Math.random() * availablePoints.length);
    return availablePoints[randomIndex];
  }

  add(point: Point) {
    this.x += point.x;
    this.y += point.y;
  }

  copy() {
    return new Point(this.x, this.y);
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }
}

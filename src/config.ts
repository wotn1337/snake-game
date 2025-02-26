const CELL_SIZE = 50;

const width = window.innerWidth - 32;
const height = window.innerHeight - 32;

export const CONFIG = {
  WIDTH: Math.floor(width / CELL_SIZE),
  HEIGHT: Math.floor(height / CELL_SIZE),
  CELL_SIZE,
  FIELD_COLOR: "#fcddbc",
  SNAKE_COLOR: "#b8d8ba",
  FOOD_COLOR: "#ef959d",
};

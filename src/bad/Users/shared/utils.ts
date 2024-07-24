import { randomInt } from "crypto";

export const generateNewId = (min: number = 0, max: number = 1000) =>
  randomInt(min, max);

import { Point } from "../types";

// calculate the normal of a surface given three points
export function calculateNormal(p1: Point, p2: Point, p3: Point): Point {
  const v1 = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z,
  };
  const v2 = {
    x: p3.x - p1.x,
    y: p3.y - p1.y,
    z: p3.z - p1.z,
  };
  const crossProduct = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
  const magnitude = Math.sqrt(
    crossProduct.x * crossProduct.x +
      crossProduct.y * crossProduct.y +
      crossProduct.z * crossProduct.z
  );
  return {
    x: crossProduct.x / magnitude,
    y: crossProduct.y / magnitude,
    z: crossProduct.z / magnitude,
  };
}

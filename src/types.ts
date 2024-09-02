export interface Point {
  x: number;
  y: number;
  z: number;
  color?: string;
}

export interface Segment {
  start: Point;
  end: Point;
  color?: string;
}

export interface Surface {
  point: Point;
  normal: Point;
  color?: string;
  width?: number;
  height?: number;
}

export interface SurfaceWithPoints {
  points: [Point, Point, Point];
  color?: string;
  width?: number;
  height?: number;
}

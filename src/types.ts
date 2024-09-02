export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface Line {
  type: 'segment' | 'ray' | 'line';
  start: Point;
  end: Point;
}

export interface Surface {
  point: Point;
  normal: Point;
}

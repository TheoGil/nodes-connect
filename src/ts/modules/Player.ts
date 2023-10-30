import { settings } from "@/ts/settings";

class Player {
  moveHistory: [number, number][] = [];
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get prevX() {
    return this.moveHistory[this.moveHistory.length - 1]?.[0];
  }

  get prevY() {
    return this.moveHistory[this.moveHistory.length - 1]?.[1];
  }

  public revertLastMove() {
    const previousPosition = this.moveHistory.pop();

    if (previousPosition) {
      this.x = previousPosition[0];
      this.y = previousPosition[1];
    } else {
      throw new Error("Cannot revert player last move, has no move history.");
    }
  }

  public moveTo(x: number, y: number) {
    // Before setting new position, archive current in history
    this.moveHistory.push([this.x, this.y]);

    this.x = x;
    this.y = y;
  }

  public render(ctx: CanvasRenderingContext2D) {
    const NODE_SIZE = 50;
    const NODE_PADDING = 10;

    const x = this.x * (NODE_SIZE + NODE_PADDING);
    const y = this.y * (NODE_SIZE + NODE_PADDING);

    ctx.fillStyle = settings.node.current.fill;
    ctx.fillRect(x, y, NODE_SIZE, NODE_SIZE);
  }
}

export { Player };

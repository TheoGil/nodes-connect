import { settings } from "@/ts/settings";

enum NodeType {
  Empty = 0,
  Disabled = 1,
  PlayerStart = 2,
  Activated = 3,
}

class Node {
  type: NodeType;
  x: number;
  y: number;

  constructor({ type, x, y }: { type: NodeType; x: number; y: number }) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    const NODE_SIZE = 50;
    const NODE_PADDING = 10;

    const x = this.x * (NODE_SIZE + NODE_PADDING);
    const y = this.y * (NODE_SIZE + NODE_PADDING);

    switch (this.type) {
      case NodeType.Disabled:
        ctx.fillStyle = settings.node.disabled.fill;
        break;
      case NodeType.PlayerStart:
        ctx.fillStyle = settings.node.current.fill;
        break;
      case NodeType.Empty:
        ctx.fillStyle = settings.node.empty.fill;
        break;
      case NodeType.Activated:
        ctx.fillStyle = settings.node.activated.fill;
        break;
      default:
        break;
    }

    ctx.fillRect(x, y, NODE_SIZE, NODE_SIZE);
  }

  setType(type: number) {
    this.type = type;
  }
}

export { Node, NodeType };

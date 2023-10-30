import { Node, NodeType, Player } from "@/ts/modules";
import { parseLevelData } from "./parseNodes";

type RawLevelData = NodeType[][];

class Level {
  nodes: Node[][] = [];
  player!: Player;
  ctx: CanvasRenderingContext2D;

  constructor({
    ctx,
    data,
  }: {
    ctx: CanvasRenderingContext2D;
    data: RawLevelData;
  }) {
    this.ctx = ctx;
    this.init(data);
  }

  private init(data: RawLevelData) {
    this.initNodes(data);
    this.initPlayer();
    this.initControls();
  }

  private initNodes(data: RawLevelData) {
    this.nodes = parseLevelData(data);
  }

  private initPlayer() {
    const playerStartNode = this.flattenNodes.find(
      (node) => node.type === NodeType.PlayerStart
    );

    if (!playerStartNode) {
      throw new Error("Level does not have a player starting node");
    }

    playerStartNode.setType(NodeType.Activated);

    this.player = new Player(playerStartNode.x, playerStartNode.y);
  }

  private initControls() {
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener("keydown", this.onKeyDown);
  }

  private get flattenNodes() {
    return this.nodes.flat();
  }

  private getNodeByCoordinates(x: number, y: number): Node | undefined {
    return this.nodes[y]?.[x];
  }

  private onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case "ArrowUp":
        this.performMove(this.player.x, this.player.y - 1);
        break;
      case "ArrowDown":
        this.performMove(this.player.x, this.player.y + 1);
        break;
      case "ArrowLeft":
        this.performMove(this.player.x - 1, this.player.y);
        break;
      case "ArrowRight":
        this.performMove(this.player.x + 1, this.player.y);
        break;
      default:
        break;
    }
  }

  private performMove(x: number, y: number) {
    const targetNode = this.getNodeByCoordinates(x, y);

    if (!targetNode) {
      throw new Error(`Cannot move to node [${x}, ${y}], it does not exists.`);
    }

    const isNodeEmpty = targetNode.type === NodeType.Empty;

    const isGoingBack = x === this.player.prevX && y === this.player.prevY;

    if (isNodeEmpty) {
      this.moveToEmptyNode(targetNode);
    } else if (isGoingBack) {
      this.revertLastMove();
      this.render();
    }
  }

  private revertLastMove() {
    // Retrieve node where player is currently stanfing and set its state to Empty
    const currentNode = this.getNodeByCoordinates(this.player.x, this.player.y);
    currentNode?.setType(NodeType.Empty);

    // Move player to its last known position
    this.player.revertLastMove();
  }

  private moveToEmptyNode(node: Node) {
    node.type = NodeType.Activated;

    this.player.moveTo(node.x, node.y);

    this.render();

    this.checkLevelComplete();
  }

  private checkLevelComplete() {
    console.log(
      this.flattenNodes.filter((node) => node.type === NodeType.Empty)
        .length === 0
    );
  }

  render() {
    this.flattenNodes.forEach((node) => {
      node.render(this.ctx);
    });

    this.player.render(this.ctx);
  }
}

export { Level };
export type { RawLevelData };

import "@/css/style.css";

import { LEVEL_1 } from "@/ts/levels";
import { Level } from "@/ts/modules";

class Rendering {
  canvasEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvasEl = document.querySelector("#canvas")!;
    this.ctx = this.canvasEl.getContext("2d")!;
    this.setCanvasSize();
  }

  setCanvasSize() {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
  }
}

class Game {
  rendering: Rendering;

  constructor() {
    this.rendering = new Rendering();
    const level = new Level({
      ctx: this.rendering.ctx,
      data: LEVEL_1,
    });
    level.render();
  }
}

const game = new Game();

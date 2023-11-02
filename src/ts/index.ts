import "@/css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import levels from "@/ts/levels";
import { Level } from "@/ts/modules";
import App from "@/vue/App.vue";

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
      data: levels[0],
    });
    level.render();
  }
}

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");

// const game = new Game();

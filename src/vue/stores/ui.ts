import { defineStore } from "pinia";

type ScreenType = "start" | "level-selection" | "game";

interface UIStore {
  screen: ScreenType;
}

export const useUIStore = defineStore("ui", {
  state: (): UIStore => ({ screen: "start" }),
});

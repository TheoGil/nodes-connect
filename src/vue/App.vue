<template>
  <div>
    <transition
      :css="false"
      :mode="'out-in'"
      @enter="onScreenTransitionEnter"
      @leave="onScreenTransitionLeave"
    >
      <component :is="screenComponent"></component>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { animate, stagger } from "motion";

import { useUIStore } from "@/vue/stores";
import Start from "@/vue/screens/Start.vue";
import LevelSelection from "@/vue/screens/LevelSelection.vue";

const uiStore = useUIStore();

const screenComponent = computed(() => {
  switch (uiStore.screen) {
    case "level-selection":
      return LevelSelection;
      break;
    case "start":
    default:
      return Start;
      break;
  }
});

const transitionYDistance = 20;

async function onScreenTransitionEnter(el: Element, done: () => void) {
  await animate(
    el.querySelectorAll("[data-animate]"),
    { y: [transitionYDistance, 0], opacity: [0, 1] },
    { delay: stagger(0.05), duration: 0.1, easing: "ease-out" }
  ).finished;

  done();
}

async function onScreenTransitionLeave(el: Element, done: () => void) {
  await animate(
    el.querySelectorAll("[data-animate]"),
    { y: [0, -transitionYDistance], opacity: [1, 0] },
    { delay: stagger(0.05), duration: 0.1, easing: "ease-in" }
  ).finished;

  done();
}
</script>

<style scoped></style>

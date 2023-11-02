<template>
  <div>
    <h1 data-animate>Nodes Connect</h1>
    <ol>
      <li data-animate>
        <button @click="onClickStart">New game</button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/vue/stores";

const uiStore = useUIStore();

function onClickStart() {
  uiStore.screen = "level-selection";
}
</script>

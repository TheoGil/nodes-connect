<template>
  <div>
    <h1 data-animate>Level Selection</h1>
    <ol>
      <li v-for="(_level, i) in levels" :key="i" data-animate>
        <button @click="onClickLevel">{{ i }}</button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/vue/stores";
import levels from "@/ts/levels";

const uiStore = useUIStore();

function onClickLevel() {
  uiStore.screen = "start";
}
</script>

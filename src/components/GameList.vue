<template>
  <div class="game-list">
    <GamePreview :game="game" v-for="game in games" :key="game"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  props: ["games"],
  components: {
    GamePreview,
  },
};
</script>

<style></style>

<template>
  <div class="game-details-container">
    <GamePreview />
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview";
export default {
  components: {
    GamePreview,
  },

  data() {
    return {
      gameId: null,
    };
  },
  created() {},
};
</script>

<style></style>

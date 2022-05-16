<template>
  <div @click="toDetailsPage" class="game-card">
    <div class="card-thumbnail image-container">
      <img :src="game.thumbnail" :alt="game.title" />
    </div>
    <div class="card-content">
      <h1 class="title">{{ game.title }}</h1>
      <p>
        {{ game.short_description }}
      </p>
    </div>
    <div class="card-footer">{{ game.genre }}</div>
  </div>
</template>

<script>
export default {
  props: ["game"],
  methods: {
    toDetailsPage() {
      this.$router.push("/details" + "/" + this.game.id);
    },
  },
};
</script>

<style></style>

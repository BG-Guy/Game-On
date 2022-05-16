<template>
  <GameFilter />
  <div class="game-list-container max-width-container" v-if="games">
    <GameList :games="games" />
  </div>
</template>

<script>
import GameList from "../components/GameList.vue";
import GameFilter from "../components/GameFilter.vue";
import { storageService } from "../services/storage-service";
export default {
  components: {
    GameList,
    GameFilter,
  },

  data() {
    return {
      games: null,
      filterBy: "",
    };
  },
  mounted() {
    this.getGames(this.filterBy);
  },

  methods: {
    getGames(filterBy) {
      this.games = storageService.load();
    },
  },
};
</script>

<style></style>

<template>
  <main class="main-content max-width-container">
    MAIN CONTENT HERE
    <p>Helloo {{ loggedUser }}</p>
    <button @click="getGamesTest">TEST</button>
  </main>
</template>

<script>
import { gameService } from "../services/game-service";
import { userService } from "../services/user-service";
export default {
  data() {
    return {
      loggedUser: this.getLoggedUser(),
      games: null,
    };
  },

  mounted() {
    this.loggedUser = userService.getLoggedinUser();
    console.log(this.loggedUser, "hi");
  },
  methods: {
    getLoggedUser() {
      this.loggedUser = userService.getLoggedinUser();
    },
  },
};
</script>

<style></style>

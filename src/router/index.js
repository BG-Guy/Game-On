import Homepage from "../components/home.vue";
import GamesPage from "../pages/GamesPage.vue";
import GameDetails from "../pages/GameDetails.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/games",
      name: "Games",
      component: GamesPage,
    },
    {
      path: "/link 3",
      name: "link 3",
    },
    {
      path: "/link 4",
      name: "link 4",
    },
    {
      path: "/details/:id",
      name: "game-details",
      component: GameDetails,
    },
  ],
});

export default router;

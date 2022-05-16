// const axios = require("axios");
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? API_KEY : "//localhost:3030/api/";

const API_KEY = "https://free-to-play-games-database.p.rapidapi.com/api/games";

export const httpService = {
  async get() {
    return await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log("hi");
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

const options = {
  method: "GET",
  url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
  params: {
    platform: "browser",
    category: "mmorpg",
    "sort-by": "release-date",
  },
  headers: {
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    "X-RapidAPI-Key": "d8669bc5a3mshc48422cc18942f3p1b36c8jsn14cd8c81f080",
  },
};

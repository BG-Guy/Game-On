function load(key) {
  var val = localStorage.getItem("gamesDB");
  return val ? JSON.parse(val) : null;
}

function store(key, val) {
  localStorage["gamesDB"] = JSON.stringify(val);
}

export const storageService = {
  load,
  store,
};

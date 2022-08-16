const R = require("ramda");
const axios = require("axios");

const ALLOWED_FIELDS = [
  "id",
  "num",
  "name",
  "img",
  "type",
  "height",
  "weight",
  "weaknesses",
  "prev_evolution",
  "next_evolution",
];

module.exports = () => {
  return axios
    .get(process.env.POKEDEX_URL)
    .then(R.pathOr([], ["data", "pokemon"]))
    .then(R.map(R.pick(ALLOWED_FIELDS)));
};

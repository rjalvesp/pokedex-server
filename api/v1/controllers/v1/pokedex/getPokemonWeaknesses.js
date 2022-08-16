const R = require("ramda");
const pokedex = require("../../../../../services/pokedex");

module.exports = () => {
  return pokedex()
    .then(R.pluck("weaknesses"))
    .then(R.flatten)
    .then(R.uniq)
    .then(R.sort((a, b) => (a < b ? -1 : 1)));
};

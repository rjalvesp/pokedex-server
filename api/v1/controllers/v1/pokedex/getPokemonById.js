const R = require("ramda");
const pokedex = require("../../../../../services/pokedex");

const truer = R.pipe(R.length, R.range(0), R.map(R.always(true)));

const matchArrayValues = (queryArray, storedArray) => {
  const storedArrayAsObj = R.zipObj(storedArray, truer(storedArray));
  return Object.keys(R.pick(queryArray, storedArrayAsObj)).length;
};

module.exports = ({ id }) => {
  return pokedex()
    .then(R.indexBy(R.prop("id")))
    .then(R.prop(id));
};

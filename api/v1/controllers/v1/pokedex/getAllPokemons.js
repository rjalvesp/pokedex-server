const R = require("ramda");
const pokedex = require("../../../../../services/pokedex");

const truer = R.pipe(R.length, R.range(0), R.map(R.always(true)));

const matchArrayAllValues = (queryArray, storedArray) => {
  const storedArrayAsObj = R.zipObj(storedArray, truer(storedArray));
  return (
    Object.keys(R.pick(queryArray, storedArrayAsObj) || {}).length ===
    queryArray.length
  );
};

const matchArrayValues = (queryArray, storedArray) => {
  const storedArrayAsObj = R.zipObj(storedArray, truer(storedArray));
  return Object.keys(R.pick(queryArray, storedArrayAsObj) || {}).length;
};

module.exports = ({ name, types, weaknesses }) => {
  return pokedex().then(
    R.reject(
      ({ name: pokeName, type: pokeTypes, weaknesses: pokeWeaknesses }) => {
        if (!pokeName.toLowerCase().includes((name || "").toLowerCase())) {
          return true;
        }
        if (types && !matchArrayAllValues(types, pokeTypes)) {
          return true;
        }
        if (weaknesses && !matchArrayValues(weaknesses, pokeWeaknesses)) {
          return true;
        }
      }
    )
  );
};

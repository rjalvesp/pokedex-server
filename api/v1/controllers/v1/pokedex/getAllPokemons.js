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
  console.log(
    queryArray,
    storedArrayAsObj,
    R.pick(queryArray, storedArrayAsObj)
  );
  return Object.keys(R.pick(queryArray, storedArrayAsObj) || {}).length;
};

module.exports = ({ name, types, weaknesses }) => {
  return pokedex().then(
    R.reject(
      ({ name: pokeName, type: pokeTypes, weaknesses: pokeWeaknesses }) => {
        if (!pokeName.toLowerCase().includes((name || "").toLowerCase())) {
          return true;
        }
        console.log("paso nombre", name);
        if (types && !matchArrayAllValues(types, pokeTypes)) {
          return true;
        }
        console.log("paso tipos", types);
        if (weaknesses && !matchArrayValues(weaknesses, pokeWeaknesses)) {
          return true;
        }
        console.log("paso debilidades", weaknesses);
      }
    )
  );
};

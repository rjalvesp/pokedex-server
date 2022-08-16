const Joi = require("joi");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const getAllPokemons = require("../controllers/v1/pokedex/getAllPokemons");
const getPokemonById = require("../controllers/v1/pokedex/getPokemonById");
const getPokemonTypes = require("../controllers/v1/pokedex/getPokemonTypes");
const getPokemonWeaknesses = require("../controllers/v1/pokedex/getPokemonWeaknesses");

const BodySchema = Joi.object({
  name: Joi.string().optional(),
  types: Joi.array().items(Joi.string()).optional(),
  weaknesses: Joi.array().items(Joi.string()).optional(),
});

router.post("/", ExpressJoi.body(BodySchema), (req, res) => {
  getAllPokemons(req.body).then((value) => {
    res.status(200).json(value);
  });
});

router.get("/types", (req, res) => {
  getPokemonTypes().then((value) => {
    res.status(200).json(value);
  });
});

router.get("/weaknesses", (req, res) => {
  getPokemonWeaknesses().then((value) => {
    res.status(200).json(value);
  });
});

router.get("/:id", (req, res) => {
  getPokemonById(req.params).then((value) => {
    res.status(200).json(value);
  });
});

module.exports = router;

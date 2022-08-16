const router = require("express").Router();

router.use("/pokedex", require("./routes/pokedex"));

module.exports = router;

const { Router } = require("express");
const { getCities } = require("../controllers/getCities");
const { postCity } = require("../controllers/postCity");
const { getCityById } = require("../controllers/getCityById");
const { deleteCityById } = require("../controllers/deleteCityById");

const cityRouter = Router();

cityRouter.route("/").get(getCities).post(postCity);

cityRouter.route("/:id").get(getCityById).delete(deleteCityById);

module.exports = { cityRouter };

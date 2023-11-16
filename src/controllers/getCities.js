const { City } = require("../model/City.model");
const nodeCache = require("node-cache");

const getCities = async (req, res) => {
	try {
		const cities = await City.find();
		res.send(cities);
	} catch (error) {
		console.log("Error in getting cities", error);
	}
};

module.exports = { getCities };

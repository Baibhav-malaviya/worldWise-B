const { City } = require("../model/City.model");

const getCityById = async (req, res) => {
	const id = req.params.id;
	try {
		const city = await City.findOne({ _id: id });
		res.send(city);
	} catch (error) {
		console.log("Error in getting the city by Id", error);
	}
};

module.exports = { getCityById };

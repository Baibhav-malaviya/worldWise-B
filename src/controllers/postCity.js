const { City } = require("../model/City.model");

const postCity = async (req, res) => {
	try {
		const newCity = new City(req.body);
		await newCity.save();
		const cities = await City.find();
		res.send(cities);
	} catch (error) {
		console.log("Error in saving the city", error);
	}
};

module.exports = { postCity };

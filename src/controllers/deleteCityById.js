const { City } = require("../model/City.model");

const deleteCityById = async (req, res) => {
	const id = req.params.id;
	try {
		const deleteCity = await City.findByIdAndDelete(id);
		if (!deleteCity) {
			return res.status(404).json({ message: "City not found" });
		}
		const cities = await City.find();
		res.send(cities);
	} catch (error) {
		console.log("Something went wrong in deleting the city", error);
	}
};

module.exports = { deleteCityById };

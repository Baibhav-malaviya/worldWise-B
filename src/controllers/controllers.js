const { City } = require("../model/City.model");

//! IN THIS FILE WE ARE DEFINING ALL THE CONTROLLERS IN A SINGLE FILE. NOW WE ARE NOT USING THIS.

const getCities = async (req, res) => {
	try {
		const cities = await City.find();
		res.send(cities);
	} catch (error) {
		console.log("Error in getting cities", error);
	}
};

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

const getCityById = async (req, res) => {
	const id = req.params.id;
	try {
		const city = await City.findOne({ _id: id });
		res.send(city);
	} catch (error) {
		console.log("Error in getting the city by Id", error);
	}
};

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

module.exports = { getCities, postCity, getCityById, deleteCityById };

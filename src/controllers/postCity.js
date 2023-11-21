const { City } = require("../model/City.model");
const { User } = require("../model/User.model");
const { getUser } = require("../authentication/login.authentication");

const postCity = async (req, res) => {
	const token = await req.cookies.uid;

	try {
		const newCity = new City(req.body);
		const savedCity = await newCity.save();

		const currentCity_id = savedCity._id;
		const currentUser = getUser(token);

		const updatedUser = await User.findByIdAndUpdate(
			currentUser._id,
			{
				$push: { cities: currentCity_id },
			},
			{ new: true }
		);

		const userCities = await City.find({
			_id: { $in: updatedUser.cities },
		});
		res.send(userCities);
	} catch (error) {
		console.log("Error in saving the city", error);
	}
};

module.exports = { postCity };

const { getUser } = require("../authentication/login.authentication");
const { City } = require("../model/City.model");
const { User } = require("../model/User.model");

const getCities = async (req, res) => {
	const token = await req.cookies.uid;
	try {
		const currentUserId = getUser(token)._id;
		const currentUser = await User.findById(currentUserId);
		const userCities = await City.find({
			_id: { $in: currentUser.cities },
		});
		res.send(userCities);
	} catch (error) {
		console.log("Error in getting cities", error);
	}
};

module.exports = { getCities };

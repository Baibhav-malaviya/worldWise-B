const bcrypt = require("bcrypt");

const { User } = require("../model/User.model");
const { setUser } = require("../authentication/login.authentication");

const logInUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	try {
		if (!user) {
			//If there is no user with this email, it means that user is not registered
			return res
				.status(204)
				.json({ error: `User with ${email} is not registered.` });
		} else {
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (passwordMatch) {
				const token = setUser(user);
				res.cookie("uid", token);

				return res.status(200).json({ success: "Logged in successfully" });
			} else {
				return res.status(403).json({ error: "Incorrect password" });
			}
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { logInUser };

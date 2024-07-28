const { User } = require("../model/User.model");

const doExist = async (req, res, next) => {
	const { email } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				error: `User with email ${email} already exists! Just go to logIn page.`,
			});
		}
		next();
	} catch (error) {
		console.error("Error checking user existence:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const registeredUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	if (
		[name, email, password].some(
			(field) => field === undefined || field.trim() === ""
		)
	) {
		res.status(403).json({ message: "Each field is required." });
	}

	const newUser = { name, email, password };
	try {
		const user = new User(newUser);
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: "Error in saving user." });
	}
};

module.exports = { doExist, registeredUser };

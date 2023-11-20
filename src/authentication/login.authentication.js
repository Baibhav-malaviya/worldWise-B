const jwt = require("jsonwebtoken");
const JWT_KEY = "jsonwebtokenSECRET_KEY";

const setUser = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
		},
		JWT_KEY
	);
};

const getUser = (token) => {
	return jwt.verify(token, JWT_KEY);
};

module.exports = { setUser, getUser };

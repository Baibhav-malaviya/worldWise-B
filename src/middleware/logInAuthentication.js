const { getUser } = require("../authentication/login.authentication");
const logInAuthentication = (req, res, next) => {
	const token = req.cookies.uid;
	if (!token) {
		res.status(403).json({ error: "This user is not authorized." });
	}
	const user = getUser(token);
	if (!user) {
		return res.status(403).json({ error: "This user is not authorized." });
	}
	req.user = user;
	next();
};

module.exports = { logInAuthentication };

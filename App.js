const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDb } = require("./src/db/ConnectDb");

const { getCities } = require("./src/controllers/getCities");
const { postCity } = require("./src/controllers/postCity");
const { getCityById } = require("./src/controllers/getCityById");
const { deleteCityById } = require("./src/controllers/deleteCityById");
const { doExist, registeredUser } = require("./src/controllers/register");
const { logInUser } = require("./src/controllers/logInUser");
const { logInAuthentication } = require("./src/middleware/logInAuthentication");
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

(async () => {
	try {
		await connectDb();
	} catch (error) {
		console.log("Can't call the connectDb function");
	}
})();

app.post("/signUp", doExist, registeredUser);

app.post("/logIn", logInUser);

app.route("/cities").get(logInAuthentication, getCities).post(postCity);

app
	.route("/cities/:id")
	.get(logInAuthentication, getCityById)
	.delete(deleteCityById);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

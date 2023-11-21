const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDb } = require("./src/db/ConnectDb");

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

//!router import
const { userRouter } = require("./src/routes/user.route");
const { cityRouter } = require("./src/routes/city.route");

app.use("/users", userRouter);
app.use("/cities", logInAuthentication, cityRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

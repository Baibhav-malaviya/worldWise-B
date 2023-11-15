const mongoose = require("mongoose");
const username = encodeURIComponent("baibhav");
const password = encodeURIComponent("Thapar@98");
const databaseName = encodeURIComponent("worldWise");
const URL = `mongodb+srv://${username}:${password}@cluster0.o020bxn.mongodb.net/${databaseName}?appName=mongosh+1.6.2`;

// const url = `mongosh "mongodb+srv://cluster0.o020bxn.mongodb.net/" --apiVersion 1 --username baibhav`;

async function connectDb() {
	// return mongoose.connect(URL);
	try {
		const db = await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected successfully: ", db.connection.host);
	} catch (error) {
		console.log("Failed to connect in ConnectDb DIRECTORY");
	}
}

module.exports = { connectDb };

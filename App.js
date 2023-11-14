const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//!    ################### Code to connect the node with local MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/worldWise");

//TODO ################ Code for connecting the node with MongoDB atlas

const username = encodeURIComponent("baibhav");
const password = encodeURIComponent("Thapar@98");
const databaseName = encodeURIComponent("worldWise");
const URL = `mongodb+srv://${username}:${password}@cluster0.o020bxn.mongodb.net/${databaseName}?appName=mongosh+1.6.2`;

// const url = `mongosh "mongodb+srv://cluster0.o020bxn.mongodb.net/" --apiVersion 1 --username baibhav`;

mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB Atlas!");
});

//? ################ Connection end

const cities = [
	{
		cityName: "Lisbon",
		country: "Portugal",
		emoji: "🇵🇹",
		date: "2027-10-31T15:59:59.138Z",
		notes: "My favorite city so far!",
		position: {
			lat: 38.727881642324164,
			lng: -9.140900099907554,
		},
		id: 73930385,
	},
	{
		cityName: "Madrid",
		country: "Spain",
		emoji: "🇪🇸",
		date: "2027-07-15T08:22:53.976Z",
		notes: "",
		position: {
			lat: 40.46635901755316,
			lng: -3.7133789062500004,
		},
		id: 17806751,
	},
	{
		cityName: "Berlin",
		country: "Germany",
		emoji: "🇩🇪",
		date: "2027-02-12T09:24:11.863Z",
		notes: "Amazing 😃",
		position: {
			lat: 52.53586782505711,
			lng: 13.376933665713324,
		},
		id: 98443197,
	},
];

const positionSchema = new Schema({ lat: Number, lng: Number });

const citySchema = new Schema({
	cityName: String,
	country: String,
	emoji: String,
	date: String,
	notes: String,
	position: positionSchema,
	id: Number,
});

const City = model("City", citySchema);

// City.insertMany(cities).then((city) => console.log("Inserted successfully"));

app.get("/cities", (req, res) => {
	City.find().then((cities) => res.send(cities));
});

app.get("/cities/:id", (req, res) => {
	const id = req.params.id;
	City.findOne({ _id: id }).then((city) => res.send(city));
});

app.delete("/cities/:id", async (req, res) => {
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
});

// app.post("/cities", (req, res) => {
// 	const newCity = new City(req.body);
// 	newCity.save();
// 	City.findOne({ _id: id }).then((city) => res.send(city));
// });

app.post("/cities", async (req, res) => {
	try {
		const newCity = new City(req.body);
		await newCity.save();
		const cities = await City.find();
		res.send(cities);
	} catch (error) {
		console.log("Error in saving the city", error);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

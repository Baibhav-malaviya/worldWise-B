const mongoose = require("mongoose");
const { Schema, model } = mongoose;
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

module.exports = { City };

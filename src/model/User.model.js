const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: "string",
			required: true,
		},
		email: {
			type: "string",
			required: true,
			unique: true,
		},
		password: {
			type: "string",
			required: true,
		},
		cities: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "City",
			},
		],
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = { User };

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		next(error);
	}
});

const User = model("User", userSchema);

module.exports = { User };

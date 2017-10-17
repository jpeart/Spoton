const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReadingsSchema = new Schema({
	username: {
			type: String,
			trim: true,
			required: "Username is Required"
	},
	password: {
			type: String,
			trim: true,
			required: "Password is Required"
	},
	time: {
		type: Date,
		default: Date.now
	},
	category: {
			type: String,
			trim: true,
	}
	// time: Date,
	// // wake, breakfast, 1 hr after breakfast, lunch, 1 hr after lunch, dinner, 1 hr after dinner
	// // bed, prior to workout, post workout, snack, 1 hr after snack, felt low, felt high,
	// // Miscellaneous
	// category: String,
	// usertime: Date,
	// reading: Number,
	// note: String,
	// carbs: Number,
	// bolus: Number
});

const Readings = mongoose.model("Readings", ReadingsSchema);

module.exports = Readings;

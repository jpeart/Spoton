const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReadingsSchema = new Schema({
	username: {
			type: String,
			trim: true,
			required: "Username is Required"
	},
	time: {
		type: Number,
		//default: Date.now
	},
	category: {
			type: String,
			trim: true
	},
	reading: {
		type: Number,
		trim: true,
		required: "Need a blood sugar reading to insert a reading"
	},
	note: {
		type: String,
		trim: true
	},
	carbs: {
		type: Number,
		trim: true
	},
	bolus:{
		type: Number,
		trim: true
	}
});

const Readings = mongoose.model("Readings", ReadingsSchema);

module.exports = Readings;

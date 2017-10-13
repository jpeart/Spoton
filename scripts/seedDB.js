// const mongoose = require("mongoose");
// const db = require("../models");
// mongoose.Promise = global.Promise;
//
// // This file empties the Books collection and inserts the books below
//
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/mern",
//   {
//     useMongoClient: true
//   }
// );
//
// const userSeed = [
//   {
//     username: "joe",
//     password: "123"
//   }
// ];
//
// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });


const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern1",
  {
    useMongoClient: true
  }
);

var SugarSeed = [];

const UserSeed = [{username: "Wilfred Brimley", password: "wb"},
			{username: "Danny Dorito", password: "dd"},
			{username: "Don Frito", password: "df"}];


//Wilfred Brimley  perfect
var	min = 80;
var	max = 180;
var days = 7
var tests = 8;
var temp = {username: "", time: "", category: "", usertime: "", usertime: "", reading: 0, note:"", carbs:0, bolus: 0};
for(i=0; i<days; i++){
	for(j=0; j<tests; j++)
	{

		temp.username = "Wilfred Brimley";
	    temp.time = Date.now();

		if(j==0)
			temp.category = "wake";
		if(j==1)
			temp.category = "breakfast"
		if(j==2)
			temp.category = "afterbreakfast"
		if(j==3)
			temp.category = "lunch"
		if(j==4)
			temp.category = "afterlunch"
		if(j==5)
			temp.category = "dinner"
		if(j==6)
			temp.category = "afterdinner"
		if(j==7)
			temp.category = "bedtime"

		temp.usertime = Date.now();

		min = Math.ceil(min);
		max = Math.floor(max);

		temp.reading = Math.floor(Math.random() * (max - min)) + min;

		temp.note = "Test "+j+" of Day "+i;

		if(temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner"){
			temp.carbs = 60;
			temp.bolus = 10;
			}
		else{
			temp.carbs = 0;
			temp.bolus = 0;
		}
		SugarSeed.push(temp);
	}
}
//Danny Dorito	Tendencies to go high after eating
min = 40;
max = 280;
var temp = {username: "", time: "", category: "", usertime: "", usertime: "", reading: 0, note:"", carbs:0, bolus: 0};
for(i=0; i<days; i++){
	for(j=0; j<tests; j++)
	{

		temp.username = "Danny Dorito";
	    temp.time = Date.now();

		if(j==0)
			temp.category = "wake";
		if(j==1)
			temp.category = "breakfast"
		if(j==2)
			temp.category = "afterbreakfast"
		if(j==3)
			temp.category = "lunch"
		if(j==4)
			temp.category = "afterlunch"
		if(j==5)
			temp.category = "dinner"
		if(j==6)
			temp.category = "afterdinner"
		if(j==7)
			temp.category = "bedtime"

		temp.usertime = Date.now();

		min = Math.ceil(min);
		max = Math.floor(max);

		temp.reading = Math.floor(Math.random() * (max - min)) + min;

		temp.note = "Test "+j+" of Day "+i;

		if(temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner"){
			temp.carbs = 60;
			temp.bolus = 10;
			}
		else{
			temp.carbs = 0;
			temp.bolus = 0;
		}
		SugarSeed.push(temp);
	}
}
//Don Cheeto 		Tendencies to go high near bedtime
min = 20;
max = 370;
var temp = {username: "", time: "", category: "", usertime: "", usertime: "", reading: 0, note:"", carbs:0, bolus: 0};
for(i=0; i<days; i++){
	for(j=0; j<tests; j++)
	{
		temp.username = "Don Cheeto";
	    temp.time = Date.now();

		if(j==0)
			temp.category = "wake";
		if(j==1)
			temp.category = "breakfast"
		if(j==2)
			temp.category = "afterbreakfast"
		if(j==3)
			temp.category = "lunch"
		if(j==4)
			temp.category = "afterlunch"
		if(j==5)
			temp.category = "dinner"
		if(j==6)
			temp.category = "afterdinner"
		if(j==7)
			temp.category = "bedtime"

		temp.usertime = Date.now();

		min = Math.ceil(min);
		max = Math.floor(max);

		temp.reading = Math.floor(Math.random() * (max - min)) + min;

		temp.note = "Test "+j+" of Day "+i;

		if(temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner"){
			temp.carbs = 60;
			temp.bolus = 10;
			}
		else{
			temp.carbs = 0;
			temp.bolus = 0;
		}
		SugarSeed.push(temp);
	}
}

db.Readings
  .remove({})
  .then(() => db.Readings.collection.insertMany(SugarSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
 db.User
  .remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

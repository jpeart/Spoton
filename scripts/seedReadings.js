const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://heroku_plj4bc0k:r5fifdea9tm6og50k3iajreio7@ds119598.mlab.com:19598/heroku_plj4bc0k", {
        useMongoClient: true
    }
);
var SugarSeed = [];

//Wilfred Brimley  perfect
var min = 80;
var max = 180;
var days = 7;
var tests = 8;
for (i = 0; i < days; i++) {
    for (j = 0; j < tests; j++) {
        var temp = { username: "", time: "", category: "", reading: 0, note: "", carbs: 0, bolus: 0 };
        temp.username = "Wilfred Brimley";

        if (j == 0) {
            minhour = 5;
            maxhour = 8;
           // temp.time = new Date(2017, 9, 0, (Math.floor(Math.random() * (8 - 5) + 5)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            console.log("hours: "+hours);
            console.log("date: "+ Date.parse(temp.time));
            temp.time = Date.parse(temp.time);
            console.log("unix time: "+temp.time);
            temp.category = "wake";
        }
        if (j == 1) {
            minhour =5;
            maxhour =8;
           // temp.time = new Date(2017, 9, 0, (Math.floor(Math.random() * (9 - 7) + 7)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "breakfast"
        }
        if (j == 2) {
            minhour=8;
            maxhour=10;
           // temp.time = new Date(2017, 9, i, (Math.floor(Math.random() * (10 - 8) + 8)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "afterbreakfast"
        }
        if (j == 3) {
            minhour=12;
            maxhour=15;
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "lunch"
        }
        if (j == 4) {
            minhour=13;
            maxhour=16;
            //temp.time = new Date(2017, 9, i, (Math.floor(Math.random() * (16 - 13) + 13)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "afterlunch"
        }
        if (j == 5) {
            minhour=17;
            maxhour=20;
            //temp.time = new Date(2017, 9, i, (Math.floor(Math.random() * (17 - 20) + 17)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "dinner"
        }
        if (j == 6) {
            minhour=18;
            maxhour=21;
            //temp.time = new Date(2017, 9, i, (Math.floor(Math.random() * (21 - 18) + 18)), 0);
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "afterdinner"
        }
        if (j == 7) {
            minhour=20;
            maxhour=25;
            temp.time = new Date(2017, 9, (11+i));
            var hours=(Math.floor(Math.random() * (maxhour - minhour) + minhour));
            temp.time.setHours(hours);
            temp.time = Date.parse(temp.time);
            temp.category = "bedtime"
        }

        min = Math.ceil(min);
        max = Math.floor(max);

        temp.reading = Math.floor(Math.random() * (max - min)) + min;

        temp.note = "Test " + (j + 1) + " of Day " + (i + 1);

        if (temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner") {
            temp.carbs = 60;
            temp.bolus = 10;
        } else {
            temp.carbs = 0;
            temp.bolus = 0;
        }
        SugarSeed.push(temp);
    }
}
//Danny Dorito	Tendencies to go high after eating
min = 40;
max = 280;
for (i = 0; i < days; i++) {
    for (j = 0; j < tests; j++) {
        var temp = { username: "", time: "", category: "", reading: 0, note: "", carbs: 0, bolus: 0 };
        temp.username = "Danny Dorito";
        //temp.time = new Date(2017, 10, 17,(randomized hour));

        if (j == 0) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (8 - 5)) + 5));
            temp.time = Date.parse(temp.time);
            temp.category = "wake";
        }
        if (j == 1) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (9 - 7)) + 7));
            temp.time = Date.parse(temp.time);
            temp.category = "breakfast"
        }
        if (j == 2) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (10 - 8)) + 8));
            temp.time = Date.parse(temp.time);
            temp.category = "afterbreakfast"
        }
        if (j == 3) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (15 - 12)) + 12));
            temp.time = Date.parse(temp.time);
            temp.category = "lunch"
        }
        if (j == 4) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (16 - 13)) + 13));
            temp.time = Date.parse(temp.time);
            temp.category = "afterlunch"
        }
        if (j == 5) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (17 - 20)) + 17));
            temp.time = Date.parse(temp.time);
            temp.category = "dinner"
        }
        if (j == 6) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (21 - 18)) + 18));
            temp.time = Date.parse(temp.time);
            temp.category = "afterdinner"
        }
        if (j == 7) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (25 - 20)) + 20));
            temp.time = Date.parse(temp.time);
            temp.category = "bedtime"
        }

        min = Math.ceil(min);
        max = Math.floor(max);

        temp.reading = Math.floor(Math.random() * (max - min)) + min;

        temp.note = "Test " + (j + 1) + " of Day " + (i + 1);

        if (temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner") {
            temp.carbs = 60;
            temp.bolus = 10;
            temp.reading = Math.floor(Math.random() * (330 - 190)) + 190;
        } else {
            temp.carbs = 0;
            temp.bolus = 0;
        }
        SugarSeed.push(temp);
    }
}
//Don Cheeto 		Tendencies to go high near bedtime
min = 20;
max = 370;
for (i = 0; i < days; i++) {
    for (j = 0; j < tests; j++) {
        var temp = { username: "", time: "", category: "", reading: 0, note: "", carbs: 0, bolus: 0 };
        temp.username = "Don Cheeto";
        temp.time = Date.now();

        if (j == 0) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (8 - 5)) + 5));
            temp.time = Date.parse(temp.time);
            temp.category = "wake";
        }
        if (j == 1) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (9 - 7)) + 7));
            temp.time = Date.parse(temp.time);
            temp.category = "breakfast"
        }
        if (j == 2) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (10 - 8)) + 8));
            temp.time = Date.parse(temp.time);
            temp.category = "afterbreakfast"
        }
        if (j == 3) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (15 - 12)) + 12));
            temp.time = Date.parse(temp.time);
            temp.category = "lunch"
        }
        if (j == 4) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (16 - 13)) + 13));
            temp.time = Date.parse(temp.time);
            temp.category = "afterlunch"
        }
        if (j == 5) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (20 - 17)) + 17));
            temp.time = Date.parse(temp.time);
            temp.category = "dinner"
        }
        if (j == 6) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (21 - 18)) + 18));
            temp.time = Date.parse(temp.time);
            temp.category = "afterdinner"
        }
        if (j == 7) {
            temp.time = new Date(2017, 10, 17, (Math.floor(Math.random() * (25 - 20)) + 20));
            temp.time = Date.parse(temp.time);
            temp.category = "bedtime"
        }

        min = Math.ceil(min);
        max = Math.floor(max);

        temp.reading = Math.floor(Math.random() * (max - min)) + min;

        temp.note = "Test " + (j + 1) + " of Day " + (i + 1);

        if (temp.category == "breakfast" || temp.category == "lunch" || temp.category == "dinner") {
            temp.carbs = 60;
            temp.bolus = 10;
        } else {
            temp.carbs = 0;
            temp.bolus = 0;
        }
        if (temp.category == "bedtime")
            temp.reading = Math.floor(Math.random() * (300 - 150)) + 150;


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
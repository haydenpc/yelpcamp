const mongoose = require('mongoose');
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '669027808f6733cf271b4012',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, soluta eveniet explicabo nihil sed dolorum non sunt adipisci repellendus, aspernatur tenetur atque labore ab voluptatibus impedit possimus! Ipsam, eum pariatur.',
            price,
            geometry: {
                type: "Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dcqgzilto/image/upload/v1723654000/YelpCamp/hcwmmcbhevlyi7pyb0ns.png',
                  filename: 'YelpCamp/hcwmmcbhevlyi7pyb0ns'
                },
                {
                  url: 'https://res.cloudinary.com/dcqgzilto/image/upload/v1721931404/YelpCamp/iqvadgvuonydwuaqwtci.jpg',
                  filename: 'YelpCamp/iqvadgvuonydwuaqwtci'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Category", "categories");
    await cleanDB("Product", "products");

    const categories = await Category.insertMany([
      { name: "Donation" },
      { name: "Membership" },
      { name: "Course" },
    ]);
    console.log("Categories Seeded!");

    const products = await Product.insertMany([
      {
        name: "Basketball",
        description:
          "Improve your basketball skills with our basketball class. Whether you're a beginner or an experienced player, this class will help you enhance your game.",
        price: "15",
        schedule: "March 15th to June 15th. Weekdays 11:00 AM - 1:00 PM",
        category: categories[2]._id,
      },
      {
        name: "Swimming",
        description:
          "Dive into our swimming class and learn essential swimming techniques in a fun and safe environment. Perfect for all skill levels, from beginners to advanced swimmers.",
        price: "15",
        schedule: "June 12th to August 23rd. Weekends 12:00 PM to 2:00 PM",
        category: categories[2]._id,
      },
      {
        name: "Yoga",
        description:
          "Join our yoga class to find inner peace and improve your flexibility and strength. Experience a blend of relaxation and physical exercise in a welcoming atmosphere.",
        price: "15",
        schedule:
          "January 3rd to March 8th. Monday, Wednesday, Friday 10:00 AM to 12:00 PM",
        category: categories[2]._id,
      },
      {
        name: "Soccer",
        description:
          "Kick off in our soccer class and enjoy the thrill of playing the world's most popular sport. Develop your teamwork and soccer skills while having fun on the field.",
        price: "10",
        schedule: "July 10th to September 19th. Weekdays 2 PM - 4 PM",
        category: categories[2]._id,
      },
      {
        name: "Tennis",
        description:
          "Swing into action with our tennis class. Learn proper techniques, footwork, and strategies to elevate your tennis game and enjoy friendly matches with fellow players.",
        price: "20",
        schedule:
          "April 5th to June 28th. Tuesdays and Thursdays 4:00 PM - 6:00 PM",
        category: categories[2]._id,
      },
      {
        name: "Pilates",
        description:
          "Strengthen your core and improve your posture with our Pilates class. Focus on controlled movements and breathing to enhance your overall fitness and well-being.",
        price: "25",
        schedule:
          "February 10th to April 20th. Mondays and Wednesdays 6:30 PM - 8:30 PM",
        category: categories[2]._id,
      },
      {
        name: "Zumba",
        description:
          "Dance your way to fitness with our Zumba class. Move to the rhythm of energetic music and burn calories while having a blast in this high-energy dance workout.",
        price: "15",
        schedule: "May 3rd to July 15th. Fridays 5:00 PM - 7:00 PM",
        category: categories[2]._id,
      },
      {
        name: "Cycling",
        description:
          "Pedal your way to better health with our Cycling class. Experience an intense cardio workout while enjoying the thrill of indoor cycling in a motivating group setting.",
        price: "20",
        schedule:
          "August 2nd to October 10th. Tuesdays and Thursdays 6:00 PM - 7:30 PM",
        category: categories[2]._id,
      },
      {
        name: "Fitness Fusion Club",
        price: "150",
        description:
          "You now have access to all of our equipment and are able to sign up for classes!",
        category: categories[1]._id,
      },
      {
        name: "$10 Donation",
        price: "10",
        category: categories[0]._id,
      },
      {
        name: "$25 Donation",
        price: "25",
        category: categories[0]._id,
      },
      {
        name: "$50 Donation",
        price: "50",
        category: categories[0]._id,
      },
      {
        name: "$100 Donation",
        price: "50",
        category: categories[0]._id,
      },
    ]);
    console.log("Products Seeded!");

    const users = await User.insertMany([
      {
        username: "John",
        email: "John@test.com",
        password: "JohnPass",
        age: "37",
      },
      {
        username: "Will",
        email: "Will@test.com",
        password: "WillPass",
        age: "64",
      },
      {
        username: "Ashley",
        email: "Ashley@test.com",
        password: "AshleyPass",
        age: "21",
      },
      {
        username: "Nick",
        email: "Nick@test.com",
        password: "NickPass",
        age: "29",
      },
      {
        username: "Sam",
        email: "Sam@test.com",
        password: "SamPass",
        age: "19",
      },
      {
        username: "Robert",
        email: "Robert@test.com",
        password: "RobertPass",
        age: "71",
      },
      {
        username: "Alex",
        email: "Alex@test.com",
        password: "AlexPass",
        age: "45",
      },
      {
        username: "Gabe",
        email: "Gabe@test.com",
        password: "GabePass",
        age: "53",
      },
    ]);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Users Seeded!");
  process.exit();
});

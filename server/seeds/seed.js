const db = require("../config/connection");
const { Product, User, Class, Membership } = require("../models");
const userSeeds = require("./userSeeds.json");
const classSeeds = require("./classSeeds.json");
const productSeeds = require("./productSeeds.json");
const membershipSeed = require("./membership.json");
const cleanDB = require("./cleanDB.js");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Class", "classes");
    await cleanDB("Product", "products");
    // Seed Users
    await User.create(userSeeds);

    // Seed Classes
    for (let i = 0; i < classSeeds.length; i++) {
      const { _id, name } = await Class.create(classSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: name },
        {
          $addToSet: {
            classes: _id,
          },
        }
      );
    }
    // Seed Membership
    await Membership.create(membershipSeed);
    // Seed Product
    await Product.create(productSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});

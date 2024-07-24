const db = require("../config/connection");
const { User, Class, Membership } = require("../models");
const userSeeds = require("./userSeeds.json");
const classSeeds = require("./classSeeds.json");
const membershipSeed = require('./membership.json')
const cleanDB = require("./cleanDB.js");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Class", "classes");

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

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});

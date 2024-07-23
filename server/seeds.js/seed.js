const db = require("../config/connection");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");
const classSeeds = require("./classSeeds.json");
const cleanDB = require("./cleanDB.js");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Class", "classes");

    await User.create(userSeeds);

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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
